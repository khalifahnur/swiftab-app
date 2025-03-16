import { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

ExpoSplashScreen.preventAutoHideAsync();

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const prepareApp = async () => {
      try {
        const [hasSeenOnboard, userData] = await Promise.all([
          AsyncStorage.getItem('hasSeenOnboard'),
          AsyncStorage.getItem('userObj')
        ]);

        // Add minimum 1s delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!isMounted) return;

        const parsedUser = userData ? JSON.parse(userData) : null;
        const authToken = parsedUser?.token;

        const seenOnboard = hasSeenOnboard === "true";

        // Handle navigation
        if (!seenOnboard) {
          await AsyncStorage.setItem("hasSeenOnboard", "true");
          router.replace('/(onboard)');
        } else if (authToken) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)');
        }
      } catch (error) {
        console.error(error);
        router.replace('/(auth)/signin');
      } finally {
        await ExpoSplashScreen.hideAsync();
      }
    };

    prepareApp();

    return () => {
      isMounted = false;
    };
  }, []);

  return <View />;
}
