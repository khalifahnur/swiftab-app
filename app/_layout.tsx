import { useCallback, useEffect, useState } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Store } from "@/redux/store/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import NetworkStatus from "@/components/NetworkStatus";
import { useAppPermissions } from "@/hooks/usePermissionHook";
import { StatusBar } from "expo-status-bar";
import { color } from "@/constants/Colors";

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

  useAppPermissions()

  return (
    <Provider store={Store}>
      <QueryClientProvider client={client}>    
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(onboard)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
          <StatusBar backgroundColor={color.green} />
          <NetworkStatus />
          <Toast config={toastConfig()} />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </Provider>
  );
}
