import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type CameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;
type CameraScreenRouteProp = RouteProp<RootStackParamList, 'Camera'>;

interface Props {
  navigation: CameraScreenNavigationProp;
  route: CameraScreenRouteProp;
}

export default function CameraScreen({ navigation, route }: Props) {
  const { style, accessories } = route.params;
  const [imageUri, setImageUri] = useState<string | null>(null);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Camera permission is needed to take photos.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    if (imageUri) {
      navigation.navigate('HygieneChecklist', {
        style,
        accessories,
        imageUri,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Upload Your Outfit</Text>
        <Text style={styles.subtitle}>
          Take a photo or choose one from your gallery
        </Text>

        {imageUri ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={() => setImageUri(null)}
            >
              <Text style={styles.retakeButtonText}>Choose Different Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={takePhoto}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>📷 Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={pickImage}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>🖼️ Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {imageUri && (
        <View style={styles.bottomButtonContainer}>
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
    marginBottom: 40,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A5F',
    textAlign: 'center',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '70%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  retakeButton: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  retakeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  bottomButtonContainer: {
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
