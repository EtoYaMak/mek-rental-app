import React, { useState, useEffect } from "react";
import styles from "../../../styles";
import { Text, TextInput, Pressable } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import COLORS from "../../../styles/COLORS";

const ProfileSettings = () => {
  const { signOut, user } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("name")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      setError(error.message);
    } else {
      setName(data.name);
    }
    setLoading(false);
  };

  const updateProfile = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({ name })
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating profile:", error);
      setError(error.message);
    } else {
      alert("Profile updated successfully!");
    }
    setLoading(false);
  };
  const handleSignOut = async () => {
    await signOut();
    console.log("sign out clicked!");
    router.replace("(auth)/sign-in");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.label]}>Name</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={[styles.secondary, styles.input]}
        placeholderTextColor={COLORS.disabledText}
      />

      <Pressable
        onPress={updateProfile}
        disabled={loading}
        style={styles.btnSecondary}
      >
        <Text style={styles.btnSecondaryText}>Update Profile</Text>
      </Pressable>
      <Pressable onPress={handleSignOut} style={styles.btnMain}>
        <Text style={styles.btnMainText}>Log Out!</Text>
      </Pressable>
      {loading && <Text>Loading...</Text>}
    </SafeAreaView>
  );
};

export default ProfileSettings;
