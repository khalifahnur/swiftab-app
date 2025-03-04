import { useCallback, useEffect, useState } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Store } from "@/redux/store/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetworkStatus from "@/components/NetworkStatus";
import { useNotifications } from "@/hooks/useNotifications";
import { useAppPermissions } from "@/hooks/usePermissionHook";

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

  const { fcmToken } = useNotifications();

  useEffect(() => {
    if (fcmToken) {
      AsyncStorage.setItem("fcmToken", fcmToken);
    }
  }, [fcmToken]);

  useAppPermissions()

  return (
    <Provider store={Store}>
      <QueryClientProvider client={client}>    
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(onboard)" />
          </Stack>
          <NetworkStatus />
          <Toast config={toastConfig()} />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </Provider>
  );
}
