import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type PrologueScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Prologue'
>;

interface Props {
  navigation: PrologueScreenNavigationProp;
}

export default function PrologueScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>How it works</Text>
          <Text style={styles.subtitle}>
            Choose the style you want to go for, upload a photo of your outfit,
            and get suggestions to elevate your look!
          </Text>

          <View style={styles.stepsCard}>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>1.</Text>
              <Text style={styles.stepText}>Pick your style goal</Text>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNumber}>2.</Text>
              <Text style={styles.stepText}>Upload your outfit photo</Text>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNumber}>3.</Text>
              <Text style={styles.stepText}>Get strengths and suggestions</Text>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNumber}>4.</Text>
              <Text style={styles.stepText}>Do a final style check!</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('SelectStyle')}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  stepsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginRight: 12,
    width: 30,
  },
  stepText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A5F',
    flex: 1,
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
