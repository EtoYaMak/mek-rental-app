import React from "react";
import { useAuth } from "../context/AuthContext";
import { Stack } from "expo-router";

const ProtectedRoute = ({ children }) => {
  const { session } = useAuth();

  if (!session) {
    return <Stack.Screen name="sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
