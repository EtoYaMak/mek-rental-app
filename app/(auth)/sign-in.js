import React, { useState } from "react";
import { Alert, Text, ActivityIndicator, Pressable } from "react-native";
import { Input } from "@rneui/themed";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/index";
import COLORS from "../../styles/COLORS";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loading, error, setError } = useAuth();

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      Alert.alert("Login successful!", "", [
        { text: "OK", onPress: () => setError(null) },
      ]);
      router.replace("(protected)/role-based-layout");
    } catch (error) {
      Alert.alert(
        "Login failed:",
        error.message || "An Unexpected Error Occurred!",
        [{ text: "OK", onPress: () => setError(null) }]
      );
    }
  };

  const handleNavigateToSignUp = () => {
    router.push("(auth)/sign-up");
  };

  return (
    <SafeAreaView
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

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.third} />
      ) : (
        <Pressable onPress={handleSignIn} style={styles.btnMain}>
          <Text style={styles.btnMainText}>Sign In</Text>
        </Pressable>
      )}
      <Pressable onPress={handleNavigateToSignUp} style={styles.btnSecondary}>
        <Text style={styles.btnSecondaryText}>Create an account?</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SignIn;
