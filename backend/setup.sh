#!/bin/bash

echo "🚀 Setting up CHUD2CHAD backend..."
echo ""

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"
echo ""

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip3 install python-dotenv pillow google-generativeai

if [ $? -eq 0 ]; then
    echo "✅ Python dependencies installed successfully"
else
    echo "❌ Failed to install Python dependencies"
    exit 1
fi

echo ""
echo "📝 Checking configuration..."

# Check if .env exists
if [ ! -f "../.env" ]; then
    echo "⚠️  .env file not found in parent directory"
    echo "   Please copy .env.example to .env and add your Gemini API key"
else
    echo "✅ .env file found"
fi

# Check if analyze.py exists
if [ ! -f "../analyze.py" ]; then
    echo "❌ analyze.py not found in parent directory"
    exit 1
else
    echo "✅ analyze.py found"
fi

echo ""
echo "🎉 Backend setup complete!"
echo ""
echo "To start the server, run:"
echo "  node server.js"
