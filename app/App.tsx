import React from 'react';
import { StatusBar, View, ActivityIndicator, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { useFonts, SquadaOne_400Regular } from '@expo-google-fonts/squada-one';
import { Hanuman_400Regular, Hanuman_700Bold } from '@expo-google-fonts/hanuman';

export default function App() {
  console.log('App component rendering...');
  
  const [fontsLoaded, fontError] = useFonts({
    SquadaOne_400Regular,
    Hanuman_400Regular,
    Hanuman_700Bold,
  });

  // Log any font loading errors
  if (fontError) {
    console.error('Error loading fonts:', fontError);
  }

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#84A6FF' }}>
        <ActivityIndicator size="large" color="#041C85" />
        <Text style={{ marginTop: 16, color: '#041C85', fontSize: 18, fontWeight: 'bold' }}>
          Loading CHUD2CHAD...
        </Text>
      </View>
    );
  }
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#84A6FF" />
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
