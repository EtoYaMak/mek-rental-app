import { useState } from "react";
import { supabase } from "../lib/supabase";
import * as ImagePicker from "expo-image-picker";
import { Pressable, Text } from "react-native";
import COLORS from "../styles/COLORS";

const ImageUploader = ({ listingId, onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (result.canceled) return;

    setUploading(true);

    try {
      const uploads = await Promise.all(
        result.assets.map(async (image) => {
          const arrayBuffer = await fetch(image.uri).then((res) =>
            res.arrayBuffer()
          );
          const path = `${listingId}/${Date.now()}.jpeg`;
          const { data, error } = await supabase.storage
            .from("equipment-images")
            .upload(path, arrayBuffer, {
              contentType: "image/jpeg",
            });
          if (error) throw error;
          return data.path;
        })
      );
      onUpload(uploads);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Pressable
      onPress={uploadImage}
      disabled={uploading}
      style={[
        {
          padding: 10,
          marginVertical: 15,
          backgroundColor: COLORS.black,
          width: "50%",
          alignSelf: "center",
          alignItems: "center",
          paddingVertical: 20,
          borderRadius: 5,
        },
      ]}
    >
      <Text style={[{ color: COLORS.primaryText, fontSize: 18 }]}>
        {uploading ? "Uploading..." : "Upload Images"}
      </Text>
    </Pressable>
  );
};

export default ImageUploader;
