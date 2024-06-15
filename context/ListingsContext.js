import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext"; // Assuming the path to your AuthProvider

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const { user, role } = useAuth();

  const fetchListings = async (supplierId = null) => {
    let query = supabase.from("listings").select("*");

    if (supplierId) {
      query = query.eq("supplier_id", supplierId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching listings:", error);
    } else {
      setListings(data);
    }
  };

  const addListing = async (listing) => {
    const { data, error } = await supabase
      .from("listings")
      .insert([listing])
      .single(); // Ensure we get the single object
    if (error) {
      console.error("Error adding listing:", error);
      return null;
    } else {
      await fetchListings(listing.supplier_id); // Refresh listings after adding
      return data; // Return the created listing
    }
  };

  const deleteListing = async (listingId, imagePaths) => {
    const { data, error } = await supabase
      .from("listings")
      .delete()
      .eq("id", listingId);

    if (error) {
      console.error("Error deleting listing:", error);
      return false;
    }

    const { error: deleteError } = await supabase.storage
      .from("equipment-images")
      .remove(imagePaths);

    if (deleteError) {
      console.error("Error deleting images:", deleteError);
      return false;
    }

    setListings(listings.filter((listing) => listing.id !== listingId));
    return true;
  };

  useEffect(() => {
    if (user) {
      if (role === "supplier") {
        fetchListings(user.id); // Fetch listings specific to supplier
      } else {
        fetchListings(); // Fetch all listings for viewing
      }
    } else {
      fetchListings(); // Fetch all listings for viewing
    }
  }, [user, role]);

  return (
    <ListingsContext.Provider
      value={{ listings, fetchListings, addListing, deleteListing }}
    >
      {children}
    </ListingsContext.Provider>
  );
};
