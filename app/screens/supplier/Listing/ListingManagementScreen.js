import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import ListingForm from "./ListingForm";
import ListingItem from "./ListingItem";
import { ListingsContext } from "../../../../context/ListingsContext";
import { useAuth } from "../../../../context/AuthContext";
import COLORS from "../../../../styles/COLORS";
import ListingFullPage from "./ListingFullPage";

const ListingManagementScreen = () => {
  const { listings, addListing, deleteListing, fetchListings } =
    useContext(ListingsContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const { user, role } = useAuth();
  const [supplierId, setSupplierId] = useState(null);

  useEffect(() => {
    if (user) {
      setSupplierId(user.id);
      if (role === "supplier") {
        fetchListings(user.id); // Fetch listings specific to supplier
      } else {
        fetchListings(); // Fetch all listings for viewing
      }
    } else {
      fetchListings(); // Fetch all listings for viewing
    }
  }, [user, role]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddListing = async (newListing) => {
    await addListing(newListing);
    toggleModal();
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <View style={styles.container}>
      {role === "Supplier" && (
        <Pressable
          onPress={toggleModal}
          style={[
            {
              padding: 10,
              marginVertical: 15,
              backgroundColor: COLORS.accentBackground,
              width: "50%",
              alignSelf: "center",
              alignItems: "center",
              paddingVertical: 20,
              borderRadius: 5,
            },
          ]}
        >
          <Text style={[{ color: COLORS.secondaryBackground, fontSize: 18 }]}>
            Add Listing
          </Text>
        </Pressable>
      )}
      <ListingForm
        isVisible={isModalVisible}
        onClose={toggleModal}
        onSubmit={handleAddListing}
        supplierId={supplierId} // Pass supplierId to ListingForm
      />
      {listings !== null && listings.length > 0 ? (
        <FlatList
          data={listings}
          renderItem={({ item }) => (
            <ListingItem item={item} deleteListing={deleteListing} />
          )}
          keyExtractor={(item) => item?.id.toString()}
        />
      ) : (
        <View>
          <Text>No listings available.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.primaryBackground,
  },
});

export default ListingManagementScreen;
