import axios from 'axios';
import { AnalysisResponse, StyleOption, Accessory } from '../types';
import { validateAnalysis } from '../utils/grading';

// TODO: Replace with your actual backend URL
// For local development, use your machine's IP address (not localhost)
// e.g., 'http://192.168.1.100:3000/api/analyze'
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface AnalyzeOutfitParams {
  imageUri: string;
  style: StyleOption;
  accessories: Accessory[];
}

/**
 * Send outfit photo and parameters to backend for AI analysis
 * 
 * The backend should:
 * 1. Accept multipart/form-data
 * 2. Execute: python analyze.py <image_path> <style> <accessories_json>
 * 3. Return the JSON response from analyze.py
 */
export async function analyzeOutfit(
  params: AnalyzeOutfitParams
): Promise<AnalysisResponse> {
  try {
    const formData = new FormData();

    // Add image file
    const imageFile = {
      uri: params.imageUri,
      type: 'image/jpeg',
      name: 'outfit.jpg',
    } as any;
    formData.append('image', imageFile);

    // Add style and accessories
    formData.append('style', params.style);
    formData.append('accessories', JSON.stringify(params.accessories));

    // Make API request
    const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // 30 second timeout
    });

    // Validate response
    if (!validateAnalysis(response.data)) {
      throw new Error('Invalid response format from server');
    }

    return response.data;
  } catch (error) {
    console.error('Error analyzing outfit:', error);

    // Return a fallback response on error
    return {
      summary: 'Unable to analyze your outfit at this time. Please try again later.',
      visible_items: [],
      color_palette: [],
      strengths: ['Style analysis unavailable'],
      improvements: ['Try uploading a clearer photo', 'Ensure good lighting'],
      accessory_suggestions: [],
      layering_suggestions: [],
      confidence_notes: error instanceof Error ? error.message : 'Analysis failed',
    };
  }
}

/**
 * Check if the API server is reachable
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`, {
      timeout: 5000,
    });
    return response.status === 200;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}
