// app\(protected)\(tabs)\(supplier)\listings.js
import React from "react";
import { Text } from "react-native";
import ListingManagementScreen from "../../../screens/supplier/Listing/ListingManagementScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../../styles";
import { ListingsProvider } from "../../../../context/ListingsContext";

const Listings = () => {
  return (
    <SafeAreaView style={[styles.container, { padding: 10, paddingTop: 25 }]}>
      <Text style={[styles.secondary, styles.h1, { textAlign: "center" }]}>
        Create a Listing
      </Text>
      <ListingsProvider>
        <ListingManagementScreen />
      </ListingsProvider>
    </SafeAreaView>
  );
};

export default Listings;
