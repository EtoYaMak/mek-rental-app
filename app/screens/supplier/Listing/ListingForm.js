import "react-native-get-random-values";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import ImageUploader from "../../../../components/ImageUploader";
import { v4 as uuidv4 } from "uuid";
import COLORS from "../../../../styles/COLORS";

const ListingForm = ({ isVisible, onClose, onSubmit, supplierId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [availability, setAvailability] = useState(true);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [rentalTerms, setRentalTerms] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [images, setImages] = useState([]);
  const [imgFolderId, setImgFolderId] = useState(uuidv4());

  const handleImageUpload = (newImages) => {
    setImages(newImages);
  };

  const handleSubmit = async () => {
    const newListing = {
      title,
      description,
      specifications,
      availability,
      price,
      location,
      category,
      condition,
      rental_terms: rentalTerms,
      verification_status: verificationStatus,
      img_folder_id: imgFolderId,
      supplier_id: supplierId,
      image_url: images,
    };

    const listing = await onSubmit(newListing); // Pass the new listing data
    if (listing && listing.img_folder_id) {
      handleImageUpload(listing.img_folder_id); // Pass the listing ID to handleImageUpload
    }
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor={COLORS.white}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          placeholderTextColor={COLORS.white}
        />
        <TextInput
          placeholder="Specifications"
          value={specifications}
          onChangeText={setSpecifications}
          style={styles.input}
          placeholderTextColor={COLORS.white}
        />
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          placeholderTextColor={COLORS.white}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
          placeholderTextColor={COLORS.white}
        />
        <TextInput
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
          placeholderTextColor={COLORS.white}
        />
        <TextInput
          placeholder="Condition"
          value={condition}
          onChangeText={setCondition}
          style={styles.input}
          placeholderTextColor={COLORS.white}
        />
        <TextInput
          placeholder="Rental Terms"
          value={rentalTerms}
          onChangeText={setRentalTerms}
          style={styles.input}
          placeholderTextColor={COLORS.white}
        />
        <TextInput
          placeholder="Verification Status"
          value={verificationStatus}
          onChangeText={setVerificationStatus}
          style={styles.input}
          placeholderTextColor={COLORS.white}
        />

        <ImageUploader
          listingId={imgFolderId}
          onUpload={handleImageUpload}
          style={{ backgroundColor: COLORS.accentBackground }}
        />

        <Pressable
          onPress={handleSubmit}
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
            Submit
          </Text>
        </Pressable>

        <Pressable
          onPress={onClose}
          style={[
            {
              padding: 10,
              marginVertical: 15,
              backgroundColor: COLORS.lightBackground,
              width: "50%",
              alignSelf: "center",
              alignItems: "center",
              paddingVertical: 20,
              borderRadius: 5,
            },
          ]}
        >
          <Text style={[{ color: COLORS.accentText, fontSize: 18 }]}>
            Cancel
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.primaryBackground,
  },
  input: {
    borderColor: COLORS.lightBorder,
    borderRadius: 5,
    height: 44,
    color: COLORS.white,
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default ListingForm;
