import { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

ExpoSplashScreen.preventAutoHideAsync();

export default function SplashScreen() {
  const router = useRouter();

  // useEffect(() => {
  //   let isMounted = true;

  //   const prepareApp = async () => {
  //     try {
  //       const [hasSeenOnboard, userData] = await Promise.all([
  //         AsyncStorage.getItem('hasSeenOnboard'),
  //         AsyncStorage.getItem('userObj')
  //       ]);

  //       // Add minimum 1s delay for better UX
  //       await new Promise(resolve => setTimeout(resolve, 1000));

  //       if (!isMounted) return;

  //       const parsedUser = userData ? JSON.parse(userData) : null;
  //       const authToken = parsedUser?.token;

  //       const seenOnboard = hasSeenOnboard === "true";

  //       // Handle navigation
  //       if (!seenOnboard) {
  //         await AsyncStorage.setItem("hasSeenOnboard", "true");
  //         router.replace('/(onboard)');
  //       } else if (authToken) {
  //         router.replace('/(tabs)');
  //       } else {
  //         router.replace('/(auth)');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       router.replace('/(auth)/signin');
  //     } finally {
  //       await ExpoSplashScreen.hideAsync();
  //     }
  //   };

  //   prepareApp();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  
  useEffect(() => {
    let isMounted = true;

    const prepareApp = async () => {
      try {
        const [hasSeenOnboard, userData] = await Promise.all([
          AsyncStorage.getItem('hasSeenOnboard'), // Note: Check for typo in key 'hasSeenOnboard' vs 'hasSeenOnboard'
          AsyncStorage.getItem('userObj')
        ]);

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!isMounted) return;

        console.log('SplashScreen debug:', { 
          hasSeenOnboard, 
          userData: userData ? JSON.parse(userData) : null 
        });

        const parsedUser = userData ? JSON.parse(userData) : null;
        const authToken = parsedUser?.token;

        // Only set hasSeenOnboard AFTER showing onboarding
        if (hasSeenOnboard !== "true") {
          console.log('Navigating to onboarding');
          router.replace('/(onboard)');
          return; // Don't proceed further
        }

        if (authToken) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)');
        }
      } catch (error) {
        console.error('SplashScreen error:', error);
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
