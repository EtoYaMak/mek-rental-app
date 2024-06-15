import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

const Index = () => {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user && role) {
        if (role === "admin") {
          router.replace("(protected)/(tabs)/(admin)/");
        } else if (role === "Rentee") {
          router.replace("(protected)/(tabs)/(rentee)/");
        } else if (role === "Supplier") {
          router.replace("(protected)/(tabs)/(supplier)/");
        }
      } else {
        router.replace("(auth)/sign-in");
      }
    }
  }, [user, role, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null;
};

export default Index;
