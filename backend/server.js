const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware - CRITICAL for React Native to connect
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Configure multer for file uploads
const upload = multer({
  dest: path.join(__dirname, 'uploads'),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory:', uploadsDir);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Analyze outfit endpoint
app.post('/api/analyze', upload.single('image'), (req, res) => {
  console.log('Received analyze request');

  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  const { style, accessories } = req.body;

  if (!style) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'Style parameter is required' });
  }

  const imagePath = req.file.path;
  const accessoriesJson = accessories || '[]';

  console.log(`Analyzing outfit: style=${style}, accessories=${accessoriesJson}`);

  // Spawn Python process to run analyze.py
  const python = spawn('python3', [
    path.join(__dirname, '../analyze.py'),
    imagePath,
    style,
    accessoriesJson,
  ]);

  let result = '';
  let error = '';

  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.stderr.on('data', (data) => {
    error += data.toString();
    console.error('Python Error:', data.toString());
  });

  python.on('close', (code) => {
    // Clean up uploaded file
    try {
      fs.unlinkSync(imagePath);
    } catch (e) {
      console.error('Failed to delete temp file:', e);
    }

    if (code === 0) {
      try {
        const parsedResult = JSON.parse(result);
        console.log('Analysis successful');
        res.json(parsedResult);
      } catch (e) {
        console.error('Failed to parse result:', e);
        res.status(500).json({
          error: 'Failed to parse analysis result',
          details: result,
        });
      }
    } else {
      console.error('Python process exited with code:', code);
      res.status(500).json({
        error: 'Analysis failed',
        code: code,
        details: error,
      });
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: err.message || 'Internal server error',
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`CHUD2CHAD backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Make sure analyze.py is in the parent directory`);
});
