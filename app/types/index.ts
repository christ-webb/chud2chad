// Style Options
export type StyleOption = 'Comfort' | 'Streetwear' | 'Grunge' | 'Minimalist';

// Accessories
export type Accessory = 'Watch' | 'Glasses' | 'Jewelry' | 'Headwear' | 'Bags' | 'Belts';

// Hygiene Checklist Items
export type HygieneItem = 'shower' | 'teeth' | 'deodorant' | 'hair';

// Analysis Response from analyze.py
export interface AnalysisResponse {
  summary: string;
  visible_items: string[];
  color_palette: string[];
  strengths: string[];
  improvements: string[];
  accessory_suggestions: string[];
  layering_suggestions: string[];
  confidence_notes: string;
}

// Grade Result
export interface GradeResult {
  score: number; // 0-100
  label: 'Full Chud' | 'Chud' | 'Chadding Up' | 'Chad' | 'Gigachad';
  hygieneScore: number; // 0-4
  styleScore: number; // derived from AI confidence
}

// Navigation Types
export type RootStackParamList = {
  Index: undefined;
  Prologue: undefined;
  SelectStyle: undefined;
  AddFlair: { style: StyleOption };
  Camera: { style: StyleOption; accessories: Accessory[] };
  HygieneChecklist: {
    style: StyleOption;
    accessories: Accessory[];
    imageUri: string;
  };
  Results: {
    style: StyleOption;
    accessories: Accessory[];
    imageUri: string;
    hygieneChecked: HygieneItem[];
    analysis: AnalysisResponse;
    grade: GradeResult;
  };
};

// Style Card Data
export interface StyleCardData {
  id: StyleOption;
  title: string;
  description: string;
}

// Hygiene Checklist Item
export interface HygieneChecklistItemData {
  id: HygieneItem;
  question: string;
}
