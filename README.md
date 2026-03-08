# CHUD2CHAD - React Native Implementation

A mobile style assessment app that combines AI-powered outfit analysis with hygiene tracking to determine your "Chud vs Chad" score.

## 📱 Features

- **Style Selection**: Choose from Comfort, Streetwear, Grunge, or Minimalist aesthetics
- **Accessory Tracking**: Select worn accessories for better AI recommendations
- **Photo Upload**: Capture or select outfit photos
- **AI Analysis**: Gemini-powered outfit critique and suggestions
- **Hygiene Checklist**: Manual hygiene assessment
- **Comprehensive Results**: Grade, strengths, color palette, and improvement suggestions

## 🏗️ Project Structure

```
chud2chad/
├── analyze.py                  # Python backend (Gemini integration)
├── plan.md                     # Comprehensive implementation plan
├── package.json
├── tsconfig.json
├── app/
│   ├── App.tsx                 # Root component
│   ├── navigation/
│   │   └── AppNavigator.tsx    # Navigation setup
│   ├── screens/                # All screen components
│   │   ├── IndexScreen.tsx
│   │   ├── PrologueScreen.tsx
│   │   ├── SelectStyleScreen.tsx
│   │   ├── AddFlairScreen.tsx
│   │   ├── CameraScreen.tsx
│   │   ├── HygieneChecklistScreen.tsx
│   │   └── ResultsScreen.tsx
│   ├── services/
│   │   └── api.ts              # Backend API integration
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── utils/
│       └── grading.ts          # Grade calculation logic
└── backend/                    # Backend server (to be created)
    └── server.js               # Express server example
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Studio (for Android development)
- Python 3.x with dependencies for `analyze.py`

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Python environment**:
   ```bash
   pip install google-generativeai pillow python-dotenv
   ```

3. **Configure environment variables**:
   Create a `.env` file:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000/api
   ```
   
   ⚠️ **Important**: Replace `YOUR_LOCAL_IP` with your actual local IP address (not `localhost`), as mobile devices can't access `localhost`.

### Running the App

1. **Start the backend server** (see Backend Setup below)

2. **Start Expo**:
   ```bash
   npm start
   ```

3. **Run on your device**:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## 🔧 Backend Setup

You'll need a backend server to connect the React Native app to the Python `analyze.py` script.

### Option 1: Express.js Server (Recommended for Development)

Create `backend/server.js`:

```javascript
const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/api/analyze', upload.single('image'), (req, res) => {
  const { style, accessories } = req.body;
  const imagePath = req.file.path;

  const python = spawn('python', [
    path.join(__dirname, '../analyze.py'),
    imagePath,
    style,
    accessories
  ]);

  let result = '';
  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.on('close', (code) => {
    fs.unlinkSync(imagePath); // Clean up uploaded file
    if (code === 0) {
      try {
        res.json(JSON.parse(result));
      } catch (e) {
        res.status(500).json({ error: 'Failed to parse analysis' });
      }
    } else {
      res.status(500).json({ error: 'Analysis failed' });
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

Install Express dependencies:
```bash
cd backend
npm init -y
npm install express multer
```

Run the server:
```bash
node server.js
```

### Option 2: Flask/FastAPI (Python)

Create `backend/server.py`:

```python
from flask import Flask, request, jsonify
import subprocess
import json
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    file = request.files['image']
    style = request.form['style']
    accessories = request.form['accessories']
    
    filename = secure_filename(file.filename)
    filepath = os.path.join('uploads', filename)
    file.save(filepath)
    
    result = subprocess.run(
        ['python', 'analyze.py', filepath, style, accessories],
        capture_output=True,
        text=True
    )
    
    os.remove(filepath)
    return jsonify(json.loads(result.stdout))

@app.route('/api/health')
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)
    app.run(host='0.0.0.0', port=3000)
```

Install and run:
```bash
pip install flask
python backend/server.py
```

## 📊 Grading System

### Score Calculation
- **Hygiene**: 40% (10 points per checklist item)
- **Style Analysis**: 60% (based on AI feedback)

### Grade Labels
- **81-100**: Gigachad 💪
- **61-80**: Chad 😎
- **41-60**: Chadding Up 👍
- **21-40**: Chud 😐
- **0-20**: Full Chud 😬

## 🎨 Design

The app follows the Figma design with:
- Blue gradient backgrounds (#A8CFFF)
- White card components with rounded corners
- Navy blue text (#1E3A5F)
- Clean, modern UI with clear visual hierarchy

## 🔐 Permissions

The app requires:
- **Camera**: To take outfit photos
- **Photo Library**: To select existing photos

## 🧪 Testing

Test the complete flow:
1. Navigate through style selection
2. Select accessories
3. Upload/take a photo
4. Complete hygiene checklist
5. View results with AI feedback

## 📝 Next Steps

- [ ] Set up backend server
- [ ] Configure environment variables with actual API keys
- [ ] Test on physical device
- [ ] Add error handling and loading states
- [ ] Implement result sharing feature
- [ ] Add history/past results storage

## 🐛 Troubleshooting

### "Network request failed"
- Ensure backend server is running
- Use your local IP address, not `localhost`
- Check firewall settings

### "Camera permission denied"
- Enable camera permissions in device settings
- Restart the app after granting permissions

### "Analysis takes too long"
- Check Gemini API key is valid
- Verify Python environment is set up correctly
- Check network connection

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

1. Check `plan.md` for implementation details
2. Follow the existing code style
3. Test thoroughly before committing
