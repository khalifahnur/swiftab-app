import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="forgotpassword" options={{ presentation:'modal',headerShown:false}} />
      <Stack.Screen name="codeverify" options={{ presentation:'modal',headerShown:false}} />
      <Stack.Screen name="newpassword" options={{ presentation:'modal',headerShown:false}} />
    </Stack>
  );
}
