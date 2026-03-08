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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Flair</Text>
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
          <Text style={styles.continueButtonText}>Continue to upload</Text>
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
  header: {
    marginBottom: 40,
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
  },
  accessoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  accessoryButton: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
  },
  accessoryButtonSelected: {
    backgroundColor: '#6B9FD8',
    borderColor: '#1E3A5F',
  },
  accessoryText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A5F',
    textAlign: 'center',
  },
  accessoryTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'transparent',
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
