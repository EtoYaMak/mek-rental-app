import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import COLORS from "../../../../styles/COLORS";

const Block = ({ heading, value }) => (
  <View style={styles.block}>
    <Text style={styles.heading}>{heading}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const ListingDetails = ({ item }) => {
  const fields = [
    { heading: "Title", value: item.title },
    { heading: "Description", value: item.description },
    { heading: "Specifications", value: item.specifications },
    { heading: "Price", value: item.price },
    { heading: "Location", value: item.location },
    { heading: "Category", value: item.category },
    { heading: "Condition", value: item.condition },
    { heading: "Rental Terms", value: item.rental_terms },
    { heading: "Verification Status", value: item.verification_status },
  ];

  return (
    <ScrollView
      horizontal
      scrollEnabled
      contentContainerStyle={styles.container}
    >
      {fields.map((field, index) => (
        <Block key={index} heading={field.heading} value={field.value} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: "row",
  },
  block: {
    marginRight: 10,
    backgroundColor: COLORS.lightBorder,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  heading: {
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.accentBackground,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: COLORS.black,
  },
});

export default ListingDetails;
