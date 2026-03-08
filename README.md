# CHUD2CHAD - React Native Implementation

A mobile style assessment app that combines AI-powered outfit analysis with hygiene tracking to determine your "Chud vs Chad" score.

## Features

- **Style Selection**: Choose from Comfort, Streetwear, Grunge, or Minimalist aesthetics
- **Accessory Tracking**: Select worn accessories for better AI recommendations
- **Photo Upload**: Capture or select outfit photos
- **AI Analysis**: Gemini-powered outfit critique and suggestions
- **Hygiene Checklist**: Manual hygiene assessment
- **Comprehensive Results**: Grade, strengths, color palette, and improvement suggestions

## Project Structure

```
chud2chad/
├── analyze.py                  # Python script (Gemini AI integration)
├── create_assets.py            # Asset generation script
├── plan.md                     # Comprehensive implementation plan
├── package.json                # Frontend dependencies
├── tsconfig.json               # TypeScript configuration
├── babel.config.js             # Babel configuration
├── app.json                    # Expo configuration
├── .env.example                # Environment variables template
├── app/
│   ├── App.tsx                 # Root component
│   ├── components/             # Reusable components
│   │   ├── ColorSwatch.tsx     # Color palette display
│   │   └── StyleCard.tsx       # Style selection card
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
├── backend/                    # Backend server
│   ├── server.js               # Express server with file upload
│   ├── setup.sh                # Backend setup script
│   ├── package.json            # Backend dependencies
│   └── uploads/                # Temporary upload directory
├── assets/                     # App assets (icons, images)
└── ios/                        # iOS native project
    └── CHUD2CHAD.xcworkspace   # Xcode workspace
```

## Documentation

This project includes multiple documentation files:
- **README.md** (this file) - Comprehensive project documentation
- **QUICKSTART.md** - Get running in 5 minutes
- **IMPLEMENTATION_SUMMARY.md** - Overview of what was implemented
- **plan.md** - Detailed implementation plan and architecture

## Getting Started

For a quick start, see [QUICKSTART.md](QUICKSTART.md).

### Prerequisites

- Node.js 18+ and npm
- Expo CLI (installed via npx, no global installation needed)
- iOS Simulator (Mac with Xcode) or Android Studio (for Android development)
- Python 3.x with pip
- Google Gemini API key (get from Google AI Studio)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/christ-webb/chud2chad.git
   cd chud2chad
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Python environment**:
   ```bash
   pip install google-generativeai pillow python-dotenv
   ```

3. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure environment variables**:
   Copy the example file and edit it:
   ```bash
   cp .env.example .env
   ```:
   ```bash
   cd backend
   node server.js
   ```
   
   The server will run on `http://localhost:3000` with CORS enabled.

2. **Start Expo** (in a new terminal):
   ```bash
   npm start
   ```

3. **Run on your device**:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## Backend Architecture

The backend is a Node.js/Express server that:
- Accepts image uploads via multipart/form-data
- Spawns a Python process to run `analyze.py` with Gemini AI
- Returns JSON analysis results to the mobile app
- Includes CORS support for React Native connections
- Automatically cleans up temporary uploaded files

### Backend API Endpoints

**GET** `/api/health`
- Health check endpoint
- Returns: `{ status: 'ok', timestamp: '...' }`

**POST** `/api/analyze`
- Analyzes outfit photos
- Body: `multipart/form-data` with fields:
  - `image`: Image file (required)
  - `style`: Style choice (required)
  - `accessories`: JSON array of accessories (optional)
- Returns: AI analysis JSON with strengths, improvements, and suggestions
   ```

3. **Run on your device**:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## Grading System

### Score Calculation
- **Hygiene**: 40% (10 points per checklist item)
- **Style Analysis**: 60% (based on AI feedback)

### Grade Labels
- **81-100**: Gigachad 
- **61-80**: Chad 
- **41-60**: Chadding Up 
- **21-40**: Chud 
- **0-20**: Full Chud 

## Design

The app follows the Figma design with:
- Blue gradient backgrounds (#A8CFFF)
- White card components with rounded corners
- Navy blue text (#1E3A5F)
- Custom fonts: Squada One (headers), Hanuman (body text)
- Clean, modern UI with clear visual hierarchy
- Lucide React Native icons for consistent iconography

### Assets

App icons and splash screens can be generated using:
```bash
python create_assets.py
```

This creates placeholder assets in the `assets/` directory.

## Current Status
### Completed
- [x] Full React Native app with TypeScript
- [x] All 7 screens implemented
- [x] Navigation flow with React Navigation
- [x] Backend Express server with file upload
- [x] Python AI integration with Gemini
- [x] Grading system implementation
- [x] iOS native project setup
- [x] Environment configuration
- [x] CORS and API integration
- [x] Reusable UI components (StyleCard, ColorSwatch)

### Future Enhancements
- [ ] Result sharing feature (social media export)
- [ ] History/past results storage (local persistence)
- [ ] Additional style categories
- [ ] User profile and preferences
- [*Photo Library**: To select existing photos

## Testing

Test the complete flow:
1. Navigate through style selection
2. Select accessories
3. Upload/take a photo
4. Complete hygiene checklist
5. View results with AI feedback

## Next Steps
 (`node backend/server.js`)
- Use your local IP address in `.env`, not `localhost`
- Check firewall settings allow connections on port 3000nt variables with actual API keys
- [ ] Test on physical device
- [ ] Add error handling and loading states
- [ ] Implement result sharing feature
- [ ] Add history/past results storage

## Troubleshooting

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
 in `.env`
- Verify Python environment: `python3 -c "import google.generativeai"`
- Check network connection
- Ensure `analyze.py` has execute permissions

## Technology Stack

### Mobile App
- **React Native** (0.81.5) with **TypeScript**
- **Expo** (SDK ~54.0.0) for rapid development
- **React Navigation** for routing and navigation
- **React Native Reanimated** for animations
- **Expo Image Picker** for camera and photo library access
- **Lucide React Native** for icons
- **Custom Google Fonts** (Squada One, Hanuman)

### Backend
- **Node.js** with **Express.js** for REST API
- **Multer** for multipart file upload handling
- **CORS** middleware for cross-origin requests

### AI & Analysis
- **Python 3.x** for image analysis script
- **Google Gemini AI** (gemini-2.5-flash model)
- **Pillow (PIL)** for image processing
- **python-dotenv** for environment management

### Development Tools
- **Babel** with react-native-reanimated plugin
- **TypeScript** for type safety
- **npm** for package management
- **Xcode** for iOS development
