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
import ListingFullPageModal from "./ListingFullPageModal";
import COLORS from "../../../../styles/COLORS";

const ListingManagementScreen = () => {
  const { listings, addListing, deleteListing, fetchListings } =
    useContext(ListingsContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFullModalVisible, setIsFullModalVisible] = useState(false);
  const { user, role } = useAuth();
  const [supplierId, setSupplierId] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);

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
  const toggleFullModal = () => {
    setIsFullModalVisible(!isFullModalVisible);
  };

  const handleAddListing = async (newListing) => {
    const addedListing = await addListing(newListing);
    if (addedListing) {
      await fetchListings(user.id); // Refresh the listings after adding a new one
    }
    toggleModal();
  };

  const handleItemPress = (item) => {
    setSelectedListing(item);
    setIsFullModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {role === "Supplier" && (
        <Pressable
          title="Add Listing"
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
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          <ListingItem
            item={item}
            deleteListing={deleteListing}
            onPress={() => handleItemPress(item)}
          />
        )}
        keyExtractor={(item) => item?.id.toString()}
      />
      {selectedListing && (
        <ListingFullPageModal
          isVisible={!!selectedListing}
          item={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ListingManagementScreen;
