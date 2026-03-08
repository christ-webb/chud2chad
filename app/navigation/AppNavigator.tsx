import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

// Import screens
import IndexScreen from '../screens/IndexScreen';
import PrologueScreen from '../screens/PrologueScreen';
import SelectStyleScreen from '../screens/SelectStyleScreen';
import AddFlairScreen from '../screens/AddFlairScreen';
import CameraScreen from '../screens/CameraScreen';
import HygieneChecklistScreen from '../screens/HygieneChecklistScreen';
import ResultsScreen from '../screens/ResultsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer
      fallback={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#A8CFFF' }}>
          <ActivityIndicator size="large" color="#1E3A5F" />
          <Text style={{ marginTop: 16, color: '#1E3A5F', fontSize: 16 }}>Loading...</Text>
        </View>
      }
    >
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#A8CFFF' },
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          animationEnabled: true,
        }}
      >
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="Prologue" component={PrologueScreen} />
        <Stack.Screen name="SelectStyle" component={SelectStyleScreen} />
        <Stack.Screen name="AddFlair" component={AddFlairScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="HygieneChecklist" component={HygieneChecklistScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
