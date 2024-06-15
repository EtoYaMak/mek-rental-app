import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import useSignedUrlCache from "../../../../hooks/useSignedUrlCache";
import COLORS from "../../../../styles/COLORS";
import ListingDetails from "./ListingDetails";
import { useRouter } from "expo-router";

const ListingItem = ({ item, deleteListing }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { signedUrls, isLoading: signedUrlsLoading } = useSignedUrlCache(
    item?.image_url || []
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (item?.image_url) {
      setIsLoading(false);
    }
  }, [item?.image_url]);

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (!item) {
    return null;
  }

  if (isLoading || signedUrlsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const images = signedUrls.map((url) => ({ url }));

  return (
    <View style={styles.container}>
      <ListingDetails item={item} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {signedUrls.map((url, index) => (
          <Pressable key={index} onPress={() => handleImagePress(index)}>
            <Image source={{ uri: url }} style={styles.image} />
          </Pressable>
        ))}
      </ScrollView>
      <Pressable
        style={{
          paddingHorizontal: 5,
          paddingVertical: 10,
          backgroundColor: COLORS.black,
          width: "30%",
          alignSelf: "flex-end",
          alignItems: "center",
          borderRadius: 5,
        }}
        onPress={() => deleteListing(item.id, item.image_url)}
      >
        <Text style={{ color: COLORS.white, fontSize: 19, fontWeight: "600" }}>
          Delete
        </Text>
      </Pressable>

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
          renderHeader={() => (
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          )}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.lightBackground,
    borderRadius: 5,
    backgroundColor: COLORS.lightBackground,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  scrollView: {
    height: 120, // Adjust based on your requirement
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: "white",
    fontSize: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  heading: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
  value: {
    flex: 1,
    fontSize: 16,
  },
});

export default ListingItem;
