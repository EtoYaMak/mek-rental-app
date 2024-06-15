import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../../../../context/AuthContext";

const Home = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Text>Home Admin</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default Home;
