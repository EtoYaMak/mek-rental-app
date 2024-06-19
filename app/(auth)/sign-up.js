import React, { useState } from "react";
import { View, Alert, Text, ActivityIndicator, Pressable } from "react-native";
import { Input } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import styles from "../../styles/index";
import COLORS from "../../styles/COLORS";
const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Supplier");

  const { signUp, loading, error, setError } = useAuth();
  const handleSignUp = async () => {
    if (!email || !password || !role) {
      Alert.alert("All fields are required");
      return;
    }
    try {
      await signUp(email, password, role);
      Alert.alert("Registration successful!", "", [
        { text: "OK", onPress: () => setError("") },
      ]);
      router.replace("(protected)/role-based-layout");
    } catch (error) {
      console.error("Error during sign up:", error);
      Alert.alert("Registration failed:", error.message, [
        { text: "OK", onPress: () => setError("") },
      ]);
    }
  };
  const handleNavigateToSignIn = () => {
    router.push("(auth)/sign-in");
  };
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        },
      ]}
    >
      {error && <Text style={styles.error}>{error}</Text>}
      <Text
        style={[styles.h1, { color: COLORS.third, textTransform: "uppercase" }]}
      >
        Register
      </Text>
      <Input
        label="Email"
        leftIcon={{
          type: "font-awesome",
          name: "envelope",
          color: COLORS.third,
        }}
        onChangeText={setEmail}
        value={email}
        placeholder="email@address.com"
        autoCapitalize="none"
        labelStyle={[styles.h5, styles.third]}
        placeholderTextColor={COLORS.secondary}
      />
      <Input
        label="Password"
        leftIcon={{ type: "font-awesome", name: "lock", color: COLORS.third }}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        labelStyle={[styles.h5, styles.third]}
        placeholderTextColor={COLORS.secondary}
      />
      <View style={{ paddingHorizontal: 10, width: "100%" }}>
        <Text style={[styles.h2, { color: COLORS.secondary }]}>I am a </Text>

        <Picker
          selectedValue={role}
          dropdownIconColor={COLORS.third}
          selectioncolor={COLORS.secondary}
          style={[
            styles.h2,
            {
              color: COLORS.third,
              margin: 2,
            },
          ]}
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="Supplier" value="Supplier" />
          <Picker.Item label="Rentee" value="Rentee" />
        </Picker>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.third} />
      ) : (
        <Pressable onPress={handleSignUp} style={styles.btnMain}>
          <Text style={styles.btnMainText}>Sign Up</Text>
        </Pressable>
      )}
      <Pressable onPress={handleNavigateToSignIn} style={styles.btnSecondary}>
        <Text style={styles.btnSecondaryText}>Already have an account?</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
