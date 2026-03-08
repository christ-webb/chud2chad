import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, HygieneItem, HygieneChecklistItemData } from '../types';
import { analyzeOutfit } from '../services/api';
import { calculateGrade } from '../utils/grading';

type HygieneChecklistScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HygieneChecklist'
>;
type HygieneChecklistScreenRouteProp = RouteProp<
  RootStackParamList,
  'HygieneChecklist'
>;

interface Props {
  navigation: HygieneChecklistScreenNavigationProp;
  route: HygieneChecklistScreenRouteProp;
}

const HYGIENE_ITEMS: HygieneChecklistItemData[] = [
  { id: 'shower', question: 'Did you shower?' },
  { id: 'teeth', question: 'Did you brush your teeth?' },
  { id: 'deodorant', question: 'Did you use deodorant?' },
  { id: 'hair', question: 'Is your hair styled?' },
];

export default function HygieneChecklistScreen({ navigation, route }: Props) {
  const { style, accessories, imageUri } = route.params;
  const [checkedItems, setCheckedItems] = useState<HygieneItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const toggleItem = (item: HygieneItem) => {
    setCheckedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleGetGrade = async () => {
    setIsLoading(true);

    try {
      // Call API to analyze outfit
      const analysis = await analyzeOutfit({
        imageUri,
        style,
        accessories,
      });

      // Calculate grade
      const grade = calculateGrade(checkedItems, analysis);

      // Navigate to results
      navigation.navigate('Results', {
        style,
        accessories,
        imageUri,
        hygieneChecked: checkedItems,
        analysis,
        grade,
      });
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to analyze your outfit. Please try again.',
        [{ text: 'OK' }]
      );
      console.error('Analysis error:', error);
    } finally {
      setIsLoading(false);
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
          <Text style={styles.title}>FINAL STYLE CHECK</Text>
          <Text style={styles.subtitle}>
            Answer these hygiene questions honestly to get an accurate grade
          </Text>

          <View style={styles.checklistContainer}>
            {HYGIENE_ITEMS.map((item) => {
              const isChecked = checkedItems.includes(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.checklistItem}
                  onPress={() => toggleItem(item.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.checkbox,
                      isChecked && styles.checkboxChecked,
                    ]}
                  >
                    {isChecked && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checklistText}>{item.question}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#041C85" />
              <Text style={styles.loadingText}>
                Analyzing your outfit with AI...
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.gradeButton, isLoading && styles.gradeButtonDisabled]}
          onPress={handleGetGrade}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Text style={styles.gradeButtonText}>
            {isLoading ? 'ANALYZING...' : 'GET MY GRADE'}
          </Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 12,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Hanuman_400Regular',
    color: '#041C85',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  checklistContainer: {
    gap: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#041C85',
    borderColor: '#041C85',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checklistText: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Hanuman_700Bold',
    color: '#041C85',
  },
  loadingContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Hanuman_700Bold',
    color: '#041C85',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  gradeButton: {
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
  gradeButtonDisabled: {
    opacity: 0.6,
  },
  gradeButtonText: {
    fontSize: 24,
    fontFamily: 'SquadaOne_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
});
