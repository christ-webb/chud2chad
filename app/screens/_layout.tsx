import {
  Hanuman_400Regular,
  Hanuman_700Bold,
} from "@expo-google-fonts/hanuman";
import { SquadaOne_400Regular, useFonts } from "@expo-google-fonts/squada-one";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SquadaOne: SquadaOne_400Regular,
    Hanuman: Hanuman_400Regular,
    HanumanBold: Hanuman_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <Stack 
      screenOptions={{ 
        headerShown: true,             
        headerTransparent: true,       
        headerTitle: "",               
        headerTintColor: "#041C85",   
      }}
    >
      {/* Welcome page: Keep header hidden */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

    </Stack>
  );
}