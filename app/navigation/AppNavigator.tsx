import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

// Import screens (create these files separately)
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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#E8F4FF' },
          gestureEnabled: true,
          gestureDirection: 'horizontal',
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
