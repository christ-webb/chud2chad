import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#84A6FF', '#D8F0FC']}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Paper texture overlay - Add image: assets/light-gray-kraft-paper-textured-background.avif */}
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
            <Text style={styles.title}>HOW IT WORKS</Text>
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
            <Text style={styles.continueButtonText}>CONTINUE</Text>
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
    // If you have the texture image, use ImageBackground component instead:
    // <ImageBackground 
    //   source={require('../../assets/light-gray-kraft-paper-textured-background.avif')}
    //   style={[StyleSheet.absoluteFillObject, { opacity: 0.2 }]}
    // />
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
    marginBottom: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Hanuman_400Regular',
    color: '#041C85',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  stepsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    fontSize: 32,
    fontFamily: 'Hanuman_700Bold',
    color: '#041C85',
    marginRight: 16,
    width: 40,
  },
  stepText: {
    fontSize: 18,
    fontFamily: 'Hanuman_700Bold',
    color: '#041C85',
    flex: 1,
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
    textTransform: 'uppercase',
  },
});
