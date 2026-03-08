# CHUD2CHAD Quick Start Guide

## ⚡ Get Running in 5 Minutes

### Step 1: Install Dependencies

```bash
# Install app dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Set Up Environment

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_key_here
   ```

3. Find your local IP address:
   - **Mac/Linux**: `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - **Windows**: `ipconfig` and look for IPv4 Address

4. Update the API URL in `.env`:
   ```
   EXPO_PUBLIC_API_URL=http://YOUR_IP_HERE:3000/api
   ```
   Example: `EXPO_PUBLIC_API_URL=http://192.168.1.100:3000/api`

### Step 3: Start the Backend Server

In one terminal:
```bash
cd backend
node server.js
```

You should see:
```
CHUD2CHAD backend server running on port 3000
```

### Step 4: Start the React Native App

In another terminal:
```bash
npm start
```

Then:
- Press `i` for iOS Simulator (Mac only)
- Press `a` for Android Emulator
- Scan QR code with Expo Go app for physical device

## 🎯 Testing the App

1. **Index Screen**: Tap "Start"
2. **Prologue**: Read instructions, tap "Continue"
3. **Select Style**: Choose a style (e.g., "Streetwear")
4. **Add Flair**: Select accessories (optional)
5. **Camera**: Take or upload an outfit photo
6. **Hygiene Checklist**: Check applicable items
7. **Results**: View your grade and AI feedback!

## 🐛 Common Issues

### "Cannot connect to server"
- Make sure backend is running (`node backend/server.js`)
- Verify you're using your local IP, not `localhost`
- Check that phone/simulator is on same network

### "Analysis failed"
- Verify `GEMINI_API_KEY` is set in `.env`
- Check that `analyze.py` is in the root directory
- Ensure Python is installed with required packages:
  ```bash
  pip install google-generativeai pillow python-dotenv
  ```

### "Module not found"
- Clear cache: `expo start -c`
- Reinstall: `rm -rf node_modules && npm install`

## 📱 Running on Physical Device

1. Install Expo Go from App Store/Play Store
2. Ensure phone is on same WiFi as your computer
3. Scan QR code from terminal
4. Grant camera permissions when prompted

## 🎨 Customization

- **Styles**: Edit options in [app/screens/SelectStyleScreen.tsx](app/screens/SelectStyleScreen.tsx)
- **Accessories**: Modify list in [app/screens/AddFlairScreen.tsx](app/screens/AddFlairScreen.tsx)
- **Grading**: Adjust calculation in [app/utils/grading.ts](app/utils/grading.ts)
- **Colors**: Update styles in individual screen files

## 📚 Next Steps

- Read [plan.md](plan.md) for full architecture
- Review [README.md](README.md) for detailed docs
- Customize the UI to match your vision
- Deploy backend to cloud service for production

## 🆘 Need Help?

Check the files:
- [plan.md](plan.md) - Complete implementation plan
- [README.md](README.md) - Full documentation
- Backend logs in terminal for API errors
- Expo console for React Native errors
