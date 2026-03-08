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
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Accessory } from '../types';

type AddFlairScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddFlair'
>;
type AddFlairScreenRouteProp = RouteProp<RootStackParamList, 'AddFlair'>;

interface Props {
  navigation: AddFlairScreenNavigationProp;
  route: AddFlairScreenRouteProp;
}

const ACCESSORIES: { id: Accessory; label: string }[] = [
  { id: 'Watch', label: 'Watch' },
  { id: 'Glasses', label: 'Glasses' },
  { id: 'Jewelry', label: 'Jewelry' },
  { id: 'Headwear', label: 'Headwear' },
  { id: 'Bags', label: 'Bags' },
  { id: 'Belts', label: 'Belts' },
];

export default function AddFlairScreen({ navigation, route }: Props) {
  const { style } = route.params;
  const [selectedAccessories, setSelectedAccessories] = useState<Accessory[]>([]);
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

  const toggleAccessory = (accessory: Accessory) => {
    setSelectedAccessories((prev) =>
      prev.includes(accessory)
        ? prev.filter((item) => item !== accessory)
        : [...prev, accessory]
    );
  };

  const handleContinue = () => {
    navigation.navigate('Camera', {
      style,
      accessories: selectedAccessories,
    });
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
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>ADD FLAIR</Text>
              <Text style={styles.subtitle}>
                What accessories are you rocking?{'\n'}
                This helps our AI suggest better color matching
              </Text>
            </View>

          {/* Accessory Grid */}
          <View style={styles.accessoryGrid}>
            {ACCESSORIES.map((accessory) => (
              <TouchableOpacity
                key={accessory.id}
                style={[
                  styles.accessoryButton,
                  selectedAccessories.includes(accessory.id) &&
                    styles.accessoryButtonSelected,
                ]}
                onPress={() => toggleAccessory(accessory.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.accessoryText,
                    selectedAccessories.includes(accessory.id) &&
                      styles.accessoryTextSelected,
                  ]}
                >
                  {accessory.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>CONTINUE TO UPLOAD</Text>
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
  header: {
    marginBottom: 40,
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
  },
  accessoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  accessoryButton: {
    width: '47%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 8,
  },
  accessoryButtonSelected: {
    backgroundColor: '#041C85',
    borderColor: '#041C85',
  },
  accessoryText: {
    fontSize: 18,
    fontFamily: 'Hanuman_700Bold',
    color: '#041C85',
    textAlign: 'center',
  },
  accessoryTextSelected: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: 'transparent',
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
