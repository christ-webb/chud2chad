import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Final Style Check</Text>
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
              <ActivityIndicator size="large" color="#1E3A5F" />
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
            {isLoading ? 'Analyzing...' : 'Get My Grade'}
          </Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    backgroundColor: '#6B9FD8',
    borderColor: '#1E3A5F',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checklistText: {
    flex: 1,
    fontSize: 18,
    color: '#1E3A5F',
    fontWeight: '600',
  },
  loadingContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#1E3A5F',
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  gradeButton: {
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
  gradeButtonDisabled: {
    opacity: 0.6,
  },
  gradeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A5F',
    textAlign: 'center',
  },
});
