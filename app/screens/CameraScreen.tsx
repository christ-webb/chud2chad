import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
        <View style={styles.content}>
          <Text style={styles.title}>UPLOAD YOUR OUTFIT</Text>
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
              <Text style={styles.retakeButtonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={takePhoto}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>📷 TAKE PHOTO</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={pickImage}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>🖼️ CHOOSE FROM GALLERY</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
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
    marginBottom: 40,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    fontFamily: 'Hanuman_700Bold',
    color: '#041C85',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  retakeButtonText: {
    fontSize: 16,
    fontFamily: 'Hanuman_700Bold',
    color: '#041C85',
  },
  bottomButtonContainer: {
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
