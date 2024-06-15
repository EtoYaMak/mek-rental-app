import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { ActivityIndicator, View, Text } from "react-native";

const RoleBasedLayout = () => {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      console.log("#################################################");
      console.log("rbl: ", role);
      console.log("rbl: ", user?.id);
      console.log("#################################################");
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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Redirecting...</Text>
    </View>
  );
};

export default RoleBasedLayout;
