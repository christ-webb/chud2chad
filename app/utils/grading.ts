import { AnalysisResponse, StyleOption, Accessory, HygieneItem, GradeResult } from '../types';

/**
 * Calculate the final grade based on hygiene score and style analysis
 */
export function calculateGrade(
  hygieneItems: HygieneItem[],
  analysis: AnalysisResponse
): GradeResult {
  // Hygiene score: 40% of total (10 points per item)
  const hygieneScore = hygieneItems.length;
  const hygienePoints = (hygieneScore / 4) * 40;

  // Style score: 60% of total
  // Based on ratio of strengths to improvements
  const strengthCount = analysis.strengths.length;
  const improvementCount = analysis.improvements.length;
  const totalFeedback = strengthCount + improvementCount;

  let styleRatio = 0.5; // Default neutral
  if (totalFeedback > 0) {
    styleRatio = strengthCount / totalFeedback;
  }

  // Boost for positive confidence notes
  const hasPositiveNote =
    analysis.confidence_notes &&
    (analysis.confidence_notes.toLowerCase().includes('good') ||
      analysis.confidence_notes.toLowerCase().includes('well') ||
      analysis.confidence_notes.toLowerCase().includes('great') ||
      analysis.confidence_notes.toLowerCase().includes('strong'));

  const confidenceBonus = hasPositiveNote ? 5 : 0;

  const stylePoints = styleRatio * 60 + confidenceBonus;

  // Total score
  const totalScore = Math.min(100, Math.round(hygienePoints + stylePoints));

  // Determine label
  let label: GradeResult['label'];
  if (totalScore >= 81) {
    label = 'Gigachad';
  } else if (totalScore >= 61) {
    label = 'Chad';
  } else if (totalScore >= 41) {
    label = 'Chadding Up';
  } else if (totalScore >= 21) {
    label = 'Chud';
  } else {
    label = 'Full Chud';
  }

  return {
    score: totalScore,
    label,
    hygieneScore,
    styleScore: stylePoints,
  };
}

/**
 * Validate that the analysis response has all required fields
 */
export function validateAnalysis(data: any): data is AnalysisResponse {
  return (
    typeof data === 'object' &&
    typeof data.summary === 'string' &&
    Array.isArray(data.visible_items) &&
    Array.isArray(data.color_palette) &&
    Array.isArray(data.strengths) &&
    Array.isArray(data.improvements) &&
    Array.isArray(data.accessory_suggestions) &&
    Array.isArray(data.layering_suggestions) &&
    typeof data.confidence_notes === 'string'
  );
}
