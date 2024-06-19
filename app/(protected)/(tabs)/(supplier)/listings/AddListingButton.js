// screens/supplier/listings/AddListingButton.js
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import COLORS from "../../../../../styles/COLORS";

const AddListingButton = ({ onPress }) => (
  <Pressable onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>Add Listing</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: COLORS.accentBackground,
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.secondaryBackground,
    fontSize: 18,
  },
});

export default AddListingButton;
