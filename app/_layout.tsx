import { useCallback, useEffect, useState } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Store } from "@/redux/store/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
//import { useAppPermissions } from "@/hooks/usePermissionHook";
//import { getFCMToken } from "@/lib/getFcmToken";
//import { listenForTokenRefresh } from "@/lib/listenforTokenRefresh";
//import { setupNotificationListeners } from "@/lib/setUpNotificationListeners";
//import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import * as Notifications from "expo-notifications";

export default function RootLayout() {
  const [client] = useState(() => new QueryClient());

  const toastConfig = useCallback(
    () => ({
      success: (props: any) => (
        <BaseToast
          {...props}
          style={{ marginTop: 10, borderLeftColor: "green" }}
        />
      ),
      error: (props: any) => (
        <ErrorToast
          {...props}
          style={{ marginTop: 10, borderLeftColor: "red" }}
        />
      ),
    }),
    []
  );

  // useEffect(() => {
  //   const handleNotifications = async () => {
  //     try {
  //       const token = await getFCMToken();
  //       console.log("FCM Token (verified):", token);
  //       if (!token) {
  //         console.error("No FCM token received");
  //         return;
  //       }
  //       await AsyncStorage.setItem("fcmToken", token); // Remove JSON.stringify

  //       // Verify token in console
  //       const storedToken = await AsyncStorage.getItem("fcmToken");
  //       console.log("Stored FCM Token:", storedToken);
  //       // Enable notification handlers
  //       setupNotificationListeners();
  //       listenForTokenRefresh();
  //     } catch (error) {
  //       console.error("FCM Error:", error);
  //     }
  //   };

  //   handleNotifications();
  // }, []);

  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: true,
  //     shouldSetBadge: true,
  //     priority: Notifications.AndroidNotificationPriority.MAX,
  //   }),
  // });

  // // useAppPermissions();
  // useAppPermissions();

  // useEffect(() => {
  //   messaging().onMessage(async (remoteMessage) => {
  //     console.log("MESSAGE RECEIVED:", remoteMessage);
  //   });
  // }, []);

  return (
    <Provider store={Store}>
      <QueryClientProvider client={client}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(onboard)" />
          </Stack>
          <Toast config={toastConfig()} />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </Provider>
  );
}
