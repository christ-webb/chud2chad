# CHUD2CHAD React Native Implementation Plan

## Project Overview
A mobile style and hygiene assessment app that combines AI-powered outfit analysis with a hygiene checklist to determine if a user is a "Chud" or a "Chad."

## Architecture

### Frontend: React Native + Expo
- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack Navigator)
- **Icons**: Lucide-react-native
- **Image Handling**: expo-image-picker
- **Styling**: Blue gradient aesthetic matching Figma design

### Backend: Python
- **Script**: `analyze.py` (Gemini AI integration)
- **Input**: Image file, style preference, accessories array
- **Output**: JSON with outfit analysis

## Screen Flow

### 1. Index Screen
- **Purpose**: Splash/welcome screen
- **Elements**: 
  - "CHUD2CHAD" title
  - "Start" button
- **Navigation**: -> Prologue Screen

### 2. Prologue Screen
- **Purpose**: Explain how the app works
- **Elements**:
  - Title: "How it works"
  - Subtitle explaining the process
  - 4-step list:
    1. Pick your style goal
    2. Upload your outfit photo
    3. Get strengths and suggestions
    4. Do a final style check!
  - "Continue" button
- **Navigation**: -> Select-Style Screen

### 3. Select-Style Screen
- **Purpose**: Choose target style aesthetic
- **Elements**:
  - Title: "Choose Your Style"
  - 4 style cards (selectable):
    - **Comfort**: "Cozy, easy, relaxed, and clean"
    - **Streetwear**: "Bold layers, sneakers, and statement pieces"
    - **Grunge**: "Dark tones, textures, layering, and edge"
    - **Minimalist**: "Neutral colors, clean silhouettes, sharp basics"
- **State**: Selected style
- **Navigation**: -> Add-Flair Screen

### 4. Add-Flair Screen
- **Purpose**: Select accessories being worn
- **Elements**:
  - Title: "Add Flair"
  - Subtitle: "What accessories are you rocking? This helps our AI suggest better color matching"
  - 6 accessory toggle buttons:
    - Watch
    - Glasses
    - Jewelry
    - Headwear
    - Bags
    - Belts
  - "Continue to upload" button
- **State**: Array of selected accessories
- **Navigation**: -> Camera/Upload

### 5. Camera/Upload Screen
- **Purpose**: Capture or select outfit photo
- **Implementation**: expo-image-picker
- **Actions**:
  - Take photo with camera
  - Select from gallery
- **Navigation**: -> Hygiene Checklist (after image selected)

### 6. Hygiene Checklist Screen
- **Purpose**: Manual hygiene assessment
- **Elements**:
  - Title: "Final Style Check"
  - 4 checkboxes:
    - "Did you shower?"
    - "Did you brush your teeth?"
    - "Did you use deodorant?"
    - "Is your hair styled?"
  - "Get My Grade" button
- **State**: Array of checked items (0-4)
- **Action**: Call backend API with style, accessories, and image
- **Navigation**: -> Results Screen

### 7. Results Screen
- **Purpose**: Display final grade and styling feedback
- **Elements**:
  - **Grade Section**:
    - "Chud" vs "Chad" score (calculated)
    - Visual indicator (progress bar, meter, or icon)
  - **Summary**: AI-generated summary
  - **Color Palette**: Visual swatches from detected colors
  - **Strengths**: Bullet points of what works well
  - **Room to Improve**: 
    - Improvements suggestions
    - Accessory recommendations
    - Layering suggestions
  - "Try Again" / "Start Over" button
- **Data Source**: analyze.py JSON response + hygiene score

## Data Models

### Style Options
```typescript
type StyleOption = 'Comfort' | 'Streetwear' | 'Grunge' | 'Minimalist';
```

### Accessories
```typescript
type Accessory = 'Watch' | 'Glasses' | 'Jewelry' | 'Headwear' | 'Bags' | 'Belts';
```

### Hygiene Checklist Items
```typescript
type HygieneItem = 
  | 'shower' 
  | 'teeth' 
  | 'deodorant' 
  | 'hair';
```

### Analysis Response (from analyze.py)
```typescript
interface AnalysisResponse {
  summary: string;
  visible_items: string[];
  color_palette: string[];
  strengths: string[];
  improvements: string[];
  accessory_suggestions: string[];
  layering_suggestions: string[];
  confidence_notes: string;
}
```

### Grade Calculation
```typescript
interface GradeResult {
  score: number; // 0-100
  label: 'Full Chud' | 'Chud' | 'Chadding Up' | 'Chad' | 'Gigachad';
  hygieneScore: number; // 0-4
  styleScore: number; // derived from AI confidence
}
```

## Grading Logic

### Component Weights
- **Hygiene**: 40% (10% per checklist item)
- **Style Analysis**: 60% (based on AI feedback)

### Style Score Calculation
- Count of strengths vs improvements ratio
- Presence of confidence_notes indicating success
- Quality of visible_items matching target style

### Final Grade Labels
- 0-20: "Full Chud" 
- 21-40: "Chud"
- 41-60: "Chadding Up"
- 61-80: "Chad"
- 81-100: "Gigachad"

## API Integration

### Endpoint Design
The app needs a backend service that:
1. Accepts multipart/form-data with:
   - `image`: File upload
   - `style`: String
   - `accessories`: JSON array string
2. Executes: `python analyze.py <temp_image_path> <style> <accessories_json>`
3. Returns: JSON response from analyze.py

### Implementation Options
- Express.js/Node.js server
- Flask/FastAPI Python server
- Expo + local Python execution (development only)
- Cloud function (Firebase, AWS Lambda, etc.)

## Design System

### Colors
- **Primary**: Blue gradient (light blue to medium blue)
- **Cards**: White/off-white with rounded corners
- **Buttons**: Dark blue/navy text on light background
- **Accent**: Keep consistent with Figma screenshots

### Typography
- **Headings**: Bold, large, navy/dark blue
- **Body**: Regular weight, medium size, dark gray
- **Buttons**: Bold, uppercase optional

### Component Patterns
- **Card**: Rounded corners, shadow, white background
- **Button**: Rounded, bold text, clear hover/press state
- **Toggle Button**: Border when unselected, filled when selected

## File Structure
```
chud2chad/
├── analyze.py (existing Python backend)
├── plan.md (this file)
├── app/
│   ├── App.tsx (root with Navigation)
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── screens/
│   │   ├── IndexScreen.tsx
│   │   ├── PrologueScreen.tsx
│   │   ├── SelectStyleScreen.tsx
│   │   ├── AddFlairScreen.tsx
│   │   ├── CameraScreen.tsx
│   │   ├── HygieneChecklistScreen.tsx
│   │   └── ResultsScreen.tsx
│   ├── components/
│   │   ├── StyleCard.tsx
│   │   ├── AccessoryButton.tsx
│   │   ├── ChecklistItem.tsx
│   │   ├── ColorSwatch.tsx
│   │   └── GradeDisplay.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       └── grading.ts
├── package.json
└── tsconfig.json
```

## Implementation Phases

### Phase 1: Project Setup ✓
- [x] Initialize Expo project
- [ ] Install dependencies (React Navigation, Lucide, expo-image-picker)
- [ ] Set up TypeScript types
- [ ] Configure navigation structure

### Phase 2: Core Screens
- [ ] IndexScreen
- [ ] PrologueScreen
- [ ] SelectStyleScreen
- [ ] AddFlairScreen ⭐ (requested)
- [ ] CameraScreen
- [ ] HygieneChecklistScreen

### Phase 3: Results & Backend Integration
- [ ] ResultsScreen ⭐ (requested)
- [ ] API service for analyze.py integration
- [ ] Grading calculation logic
- [ ] Error handling

### Phase 4: Polish
- [ ] Styling to match Figma
- [ ] Animations/transitions
- [ ] Loading states
- [ ] Image optimization

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-native": "^0.74.0",
    "expo": "~51.0.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/stack": "^6.3.0",
    "react-native-screens": "~3.31.0",
    "react-native-safe-area-context": "^4.10.0",
    "react-native-gesture-handler": "~2.16.0",
    "expo-image-picker": "~15.0.0",
    "lucide-react-native": "^0.400.0",
    "axios": "^1.7.0"
  },
  "devDependencies": {
    "@types/react": "~18.2.0",
    "typescript": "^5.3.0"
  }
}
```

## Testing Strategy
- Manual testing on iOS and Android simulators
- Test camera permissions
- Test image upload and API integration
- Verify grading calculations
- Test navigation flow end-to-end

## Future Enhancements
- Save history of past grades
- Share results to social media
- Style guide recommendations
- Shopping links for suggested items
- Community features (compare scores)
