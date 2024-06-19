// screens/supplier/listings/ListingForm.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Modal,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import ImageUploader from "../../../../../components/ImageUploader";
import COLORS from "../../../../../styles/COLORS";

const ListingForm = ({ isVisible, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [rentalTerms, setRentalTerms] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [images, setImages] = useState([]);

  const handleImageUpload = (newImages) => {
    setImages(newImages);
  };

  const handleSubmit = () => {
    const newListing = {
      title,
      description,
      price,
      location,
      category,
      condition,
      rental_terms: rentalTerms,
      verification_status: verificationStatus,
      image_url: images,
    };
    onSubmit(newListing);
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
        <ImageUploader onUpload={handleImageUpload} />
        <Pressable onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>
        <Pressable onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
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
  submitButton: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: COLORS.accentBackground,
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: COLORS.secondaryBackground,
    fontSize: 18,
  },
  cancelButton: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: COLORS.lightBackground,
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: COLORS.accentText,
    fontSize: 18,
  },
});

export default ListingForm;
