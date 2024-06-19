// screens/supplier/listings/ListingDetailsScreen.js
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import useSignedUrlCache from "../../../../../hooks/useSignedUrlCache";
import ImageViewer from "react-native-image-zoom-viewer";
import COLORS from "../../../../../styles/COLORS";
import { useLocalSearchParams, Stack } from "expo-router";
import { ListingsContext } from "../../../../../context/ListingsContext";

const ListingDetails = () => {
  const { id } = useLocalSearchParams();

  const { fetchListingById } = useContext(ListingsContext);
  const [listing, setListing] = useState(null);
  const { signedUrls, isLoading: signedUrlsLoading } = useSignedUrlCache(
    listing ? listing.image_url : []
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const getListing = async () => {
      const fetchedListing = await fetchListingById(id);
      setListing(fetchedListing);
    };

    getListing();
  }, [id]);

  if (!listing) {
    return <Text>Loading...</Text>;
  }

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const images = signedUrls.map((url) => ({ url }));
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: listing.title,
        }}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.imageScroll}
      >
        {signedUrls.map((url, index) => (
          <Pressable key={index} onPress={() => handleImagePress(index)}>
            <Image source={{ uri: url }} style={styles.image} />
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.title}>{listing.title}</Text>
      <Text style={styles.description}>{listing.description}</Text>
      <Text style={styles.label}>Price:</Text>
      <Text style={styles.value}>{listing.price}</Text>
      <Text style={styles.label}>Location:</Text>
      <Text style={styles.value}>{listing.location}</Text>
      <Text style={styles.label}>Category:</Text>
      <Text style={styles.value}>{listing.category}</Text>
      <Text style={styles.label}>Condition:</Text>
      <Text style={styles.value}>{listing.condition}</Text>
      <Text style={styles.label}>Rental Terms:</Text>
      <Text style={styles.value}>{listing.rental_terms}</Text>
      <Text style={styles.label}>Verification Status:</Text>
      <Text style={styles.value}>{listing.verification_status}</Text>
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        <ImageViewer
          imageUrls={images}
          index={selectedImageIndex}
          onSwipeDown={closeModal}
          enableSwipeDown
        />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    backgroundColor: COLORS.primaryBackground,
    minHeight: "100%",
  },
  title: {
    fontSize: 24,
    paddingHorizontal: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 20,
    marginVertical: 10,
    color: COLORS.white,
  },
  imageScroll: {
    flexDirection: "row",
    marginVertical: 10,
    maxHeight: 250,
    paddingLeft: 8,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 10,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 20,
    color: COLORS.white,
  },
  value: {
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.white,
  },
});

export default ListingDetails;
