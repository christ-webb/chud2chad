import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ColorSwatchProps {
  color: string;
}

/**
 * Color swatch component for displaying detected colors in ResultsScreen
 * 
 * Usage:
 * <ColorSwatch color="Navy" />
 * <ColorSwatch color="#1E3A5F" />
 */
export function ColorSwatch({ color }: ColorSwatchProps) {
  // Determine text color based on background (simple heuristic)
  const getTextColor = (bgColor: string) => {
    // If it's a named color that's likely dark, use white text
    const darkColors = ['black', 'navy', 'dark', 'brown', 'gray', 'grey'];
    if (darkColors.some(dc => bgColor.toLowerCase().includes(dc))) {
      return '#FFFFFF';
    }
    return '#1E3A5F';
  };

  return (
    <View
      style={[
        styles.swatch,
        { backgroundColor: color.toLowerCase() },
      ]}
    >
      <Text
        style={[
          styles.colorText,
          { color: getTextColor(color) },
        ]}
      >
        {color}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  swatch: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    minWidth: 80,
  },
  colorText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
