import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable } from "react-native";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import useSignedUrlCache from "../../../../hooks/useSignedUrlCache";
import ImageViewer from "react-native-image-zoom-viewer";
const ListingFullPageModal = ({ isVisible, item, onClose }) => {
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
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      propagateSwipe={true}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Pressable
            style={[{ alignSelf: "center" }]}
            onPress={() => handleImagePress()}
          >
            <Image source={{ uri: signedUrls[0] }} style={styles.thumbnail} />
          </Pressable>
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
          <Text style={[{ marginTop: 20 }, styles.heading]}>Title</Text>
          <Text style={styles.value}>{item.title}</Text>

          <Text style={styles.heading}>Description</Text>
          <Text style={styles.value}>{item.description}</Text>

          <Text style={styles.heading}>Specifications</Text>
          <Text style={styles.value}>{item.specifications}</Text>

          <Text style={styles.heading}>Price</Text>
          <Text style={styles.value}>{item.price}</Text>

          <Text style={styles.heading}>Location</Text>
          <Text style={styles.value}>{item.location}</Text>

          <Text style={styles.heading}>Category</Text>
          <Text style={styles.value}>{item.category}</Text>

          <Text style={styles.heading}>Condition</Text>
          <Text style={styles.value}>{item.condition}</Text>

          <Text style={styles.heading}>Rental Terms</Text>
          <Text style={styles.value}>{item.rental_terms}</Text>

          <Text style={styles.heading}>Verification Status</Text>
          <Text style={styles.value}>{item.verification_status}</Text>
        </ScrollView>
        <Pressable
          onPress={onClose}
          style={{
            alignSelf: "center",
            padding: 10,
            backgroundColor: "#2196F3",
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  scrollContainer: {
    justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  scrollView: {
    borderBottomWidth: 1,
    height: 70, // Adjust based on your requirement
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  thumbnail: { width: 260, height: 260, marginBottom: 20 },
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
});

export default ListingFullPageModal;
