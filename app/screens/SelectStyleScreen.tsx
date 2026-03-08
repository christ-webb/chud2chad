import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, StyleOption, StyleCardData } from '../types';

type SelectStyleScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SelectStyle'
>;

interface Props {
  navigation: SelectStyleScreenNavigationProp;
}

const STYLES: StyleCardData[] = [
  {
    id: 'Comfort',
    title: 'Comfort',
    description: 'Cozy, easy, relaxed, and clean',
  },
  {
    id: 'Streetwear',
    title: 'Streetwear',
    description: 'Bold layers, sneakers, and statement pieces',
  },
  {
    id: 'Grunge',
    title: 'Grunge',
    description: 'Dark tones, textures, layering, and edge',
  },
  {
    id: 'Minimalist',
    title: 'Minimalist',
    description: 'Neutral colors, clean silhouettes, sharp basics',
  },
];

export default function SelectStyleScreen({ navigation }: Props) {
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);

  const handleContinue = () => {
    if (selectedStyle) {
      navigation.navigate('AddFlair', { style: selectedStyle });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Choose Your Style</Text>

          <View style={styles.cardsContainer}>
            {STYLES.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[
                  styles.styleCard,
                  selectedStyle === style.id && styles.styleCardSelected,
                ]}
                onPress={() => setSelectedStyle(style.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.styleTitle,
                    selectedStyle === style.id && styles.styleTitleSelected,
                  ]}
                >
                  {style.title}
                </Text>
                <Text
                  style={[
                    styles.styleDescription,
                    selectedStyle === style.id && styles.styleDescriptionSelected,
                  ]}
                >
                  {style.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {selectedStyle && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8CFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1E3A5F',
    textAlign: 'center',
    marginBottom: 32,
  },
  cardsContainer: {
    gap: 16,
  },
  styleCard: {
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
  styleCardSelected: {
    backgroundColor: '#6B9FD8',
    borderColor: '#1E3A5F',
  },
  styleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 8,
  },
  styleTitleSelected: {
    color: '#FFFFFF',
  },
  styleDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
  },
  styleDescriptionSelected: {
    color: '#E5E7EB',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A5F',
    textAlign: 'center',
  },
});
