import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../../styles";
import COLORS from "../../../../styles/COLORS";

const Home = () => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        { justifyContent: "center", alignItems: "center", gap: 25 },
      ]}
    >
      <Text style={[styles.h1, { color: COLORS.third }]}>
        Welcome To MEKRENTAL
      </Text>
      <Text style={[styles.h1, { color: COLORS.secondary }]}>SUPPLIER</Text>
      <Text style={[styles.h1, { color: COLORS.third }]}>
        Welcome To MEKRENTAL
      </Text>
      <Text style={[styles.h1, { color: COLORS.secondary }]}>SUPPLIER</Text>
      <Text style={[styles.h1, { color: COLORS.third }]}>
        Welcome To MEKRENTAL
      </Text>
      <Text style={[styles.h1, { color: COLORS.secondary }]}>SUPPLIER</Text>
      <Text style={[styles.h1, { color: COLORS.third }]}>
        Welcome To MEKRENTAL
      </Text>
    </SafeAreaView>
  );
};

export default Home;
