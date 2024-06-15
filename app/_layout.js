import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

const Layout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/sign-up" options={{ headerShown: false }} />
        <Stack.Screen
          name="(protected)/role-based-layout"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthProvider>
  );
};

export default Layout;
