import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../../../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Home = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    console.log("sign out clicked!");
    router.replace("(auth)/sign-in");
  };

  return (
    <SafeAreaView>
      <Text>Home Rentee</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </SafeAreaView>
  );
};

export default Home;
