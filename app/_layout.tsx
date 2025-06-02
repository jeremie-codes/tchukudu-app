import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, 
  Montserrat_400Regular, 
  Montserrat_500Medium, 
  Montserrat_700Bold 
} from '@expo-google-fonts/montserrat';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SplashScreen } from 'expo-router';
import "../global.css";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Montserrat_400Regular': Montserrat_400Regular,
    'Montserrat_500Medium': Montserrat_500Medium,
    'Montserrat_700Bold': Montserrat_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="transporteur/login" options={{ presentation: 'modal', title: 'Connexion' }} />
        <Stack.Screen name="transporteur/signup" options={{ presentation: 'modal', title: 'Inscription' }} />
        <Stack.Screen name="client/order-details" options={{ presentation: 'card', title: 'Détails de la commande' }} />
        <Stack.Screen name="client/payment" options={{ presentation: 'modal', title: 'Paiement' }} />
        <Stack.Screen name="client/rating" options={{ presentation: 'modal', title: 'Évaluation' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}