// screens/supplier/listings/ListingsScreen.js
import React, { useContext, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ListingsContext } from "../../../../../context/ListingsContext";
import AddListingButton from "./AddListingButton";
import ListingCard from "./ListingCard";
import ListingForm from "./ListingForm";
import { Link } from "expo-router";
import COLORS from "../../../../../styles/COLORS";
import { SafeAreaView } from "react-native-safe-area-context";

const ListingsScreen = () => {
  const { listings, addListing, deleteListing } = useContext(ListingsContext);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAddListing = (newListing) => {
    addListing(newListing);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddListingButton onPress={() => setModalVisible(true)} />
      <ListingForm
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddListing}
      />
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: `/listings/${item.id}`,
            }}
            style={styles.listingLinks}
          >
            <ListingCard
              item={item}
              onDelete={
                () => console.log("delete Clicked") /* deleteListing(item.id) */
              }
            />
          </Link>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.primaryBackground,
  },
  listingLinks: { marginBottom: 10 },
});

export default ListingsScreen;
