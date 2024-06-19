// screens/supplier/listings/ListingCard.js
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import COLORS from "../../../../../styles/COLORS";

const ListingCard = ({ item, onPress, onDelete }) => (
  <Pressable onPress={onPress} style={styles.card}>
    <Image source={{ uri: item.image_url[0] }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    borderRadius: 5,
    backgroundColor: COLORS.lightBackground,
    marginBottom: 10,
    zIndex: -1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    zIndex: 10,
  },
  info: {
    marginLeft: 10,
    zIndex: -1,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    zIndex: -1,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    zIndex: -1,
  },
  deleteButton: {
    backgroundColor: COLORS.accentBackground,
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
    zIndex: 10,
  },
  deleteButtonText: {
    color: COLORS.secondaryBackground,
    fontSize: 14,
  },
});

export default ListingCard;
