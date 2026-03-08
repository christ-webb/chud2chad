import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StyleCardData } from '../types';

interface StyleCardProps {
  style: StyleCardData;
  isSelected: boolean;
  onPress: () => void;
}

/**
 * Reusable style card component for SelectStyleScreen
 * 
 * Usage:
 * <StyleCard
 *   style={{ id: 'Comfort', title: 'Comfort', description: '...' }}
 *   isSelected={selectedStyle === 'Comfort'}
 *   onPress={() => setSelectedStyle('Comfort')}
 * />
 */
export function StyleCard({ style, isSelected, onPress }: StyleCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.title, isSelected && styles.titleSelected]}>
        {style.title}
      </Text>
      <Text style={[styles.description, isSelected && styles.descriptionSelected]}>
        {style.description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 3,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSelected: {
    backgroundColor: '#6B9FD8',
    borderColor: '#1E3A5F',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 8,
  },
  titleSelected: {
    color: '#FFFFFF',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
  },
  descriptionSelected: {
    color: '#E5E7EB',
  },
});
