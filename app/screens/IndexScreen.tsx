import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions, 
  Image 
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

const { width, height } = Dimensions.get("window");

type IndexScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;

interface Props {
  navigation: IndexScreenNavigationProp;
}

export default function IndexScreen({ navigation }: Props) {
  const chudAnim = useRef(new Animated.Value(-width * 2)).current;
  const twoAnim = useRef(new Animated.Value(height * 2)).current;
  const chadAnim = useRef(new Animated.Value(width * 2)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(500),
      Animated.spring(chudAnim, {
        toValue: 0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(twoAnim, {
        toValue: 0,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(chadAnim, {
        toValue: 0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={["#84A6FF", "#D8F0FC"]} style={styles.container}>
      <Image
        source={require("../assets/images/light-gray-kraft-paper-textured-background_53876-147736.avif")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.titleContainer}>
        <Animated.Text
          style={[styles.title, { transform: [{ translateX: chudAnim }] }]}
        >
          CHUD
        </Animated.Text>
        <Animated.Text
          style={[styles.title, { transform: [{ translateY: twoAnim }] }]}
        >
          2
        </Animated.Text>
        <Animated.Text
          style={[styles.title, { transform: [{ translateX: chadAnim }] }]}
        >
          CHAD
        </Animated.Text>
      </View>

      <View style={styles.contentBox}>
      </View>

      {/* Navigation Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => {
          console.log('Navigating to Prologue...');
          navigation.navigate('Prologue');
        }}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    minHeight: 90,
  },
  title: {
    color: "#FFF",
    fontFamily: "SquadaOne",
    fontSize: 74, 
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  contentBox: {
    width: 326,
    height: 463,
    backgroundColor: "#ECF1FD",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#A0BCFB",
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ECF1FD",
    height: 60,
    width: 326,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#041C85",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 8,
  },
  buttonText: {
    color: "#041C85",
    fontFamily: "Hanuman",
    fontWeight: "bold",
    fontSize: 30,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
});