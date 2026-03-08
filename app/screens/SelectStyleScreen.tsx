import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
  const slideAnim = useRef(new Animated.Value(100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleContinue = () => {
    if (selectedStyle) {
      navigation.navigate('AddFlair', { style: selectedStyle });
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#84A6FF', '#D8F0FC']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={[StyleSheet.absoluteFillObject, styles.textureOverlay]} />

      <Animated.View
        style={[
          styles.animatedContent,
          {
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.title}>CHOOSE YOUR STYLE</Text>

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
              <Text style={styles.continueButtonText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textureOverlay: {
    backgroundColor: 'rgba(240, 240, 240, 0.2)',
  },
  animatedContent: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 80,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 48,
    fontFamily: 'SquadaOne_400Regular',
    color: '#041C85',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 1,
  },
  cardsContainer: {
    gap: 16,
  },
  styleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 3,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  styleCardSelected: {
    backgroundColor: '#041C85',
    borderColor: '#041C85',
  },
  styleTitle: {
    fontSize: 24,
    fontFamily: 'Hanuman_700Bold',
    color: '#041C85',
    marginBottom: 8,
  },
  styleTitleSelected: {
    color: '#FFFFFF',
  },
  styleDescription: {
    fontSize: 16,
    fontFamily: 'Hanuman_400Regular',
    color: '#041C85',
    lineHeight: 22,
  },
  styleDescriptionSelected: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  continueButton: {
    backgroundColor: '#041C85',
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  continueButtonText: {
    fontSize: 24,
    fontFamily: 'SquadaOne_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
});
