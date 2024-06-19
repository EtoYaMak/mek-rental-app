// context/ListingsContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const { user, role } = useAuth();
  const [listings, setListings] = useState([]);

  const fetchListings = async (supplierId = null) => {
    try {
      let query = supabase.from("listings").select("*");
      if (supplierId) {
        query = query.eq("supplier_id", supplierId);
      }
      const { data, error } = await query;
      if (error) throw error;
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };
  const fetchListingById = async (id) => {
    try {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching listing:", error);
      return null;
    }
  };
  const addListing = async (listing) => {
    try {
      const { data, error } = await supabase
        .from("listings")
        .insert([listing])
        .single();
      if (error) throw error;
      setListings((prevListings) => [...prevListings, data]);
      return data;
    } catch (error) {
      console.error("Error adding listing:", error);
      return null;
    }
  };

  const deleteListing = async (listingId, imagePaths) => {
    try {
      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", listingId);
      if (error) throw error;

      const { error: deleteError } = await supabase.storage
        .from("equipment-images")
        .remove(imagePaths);
      if (deleteError) throw deleteError;

      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== listingId)
      );
      return true;
    } catch (error) {
      console.error("Error deleting listing:", error);
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      if (role === "supplier") {
        fetchListings(user.id);
      } else {
        fetchListings();
      }
    } else {
      fetchListings();
    }
  }, [user, role]);

  return (
    <ListingsContext.Provider
      value={{
        listings,
        fetchListings,
        fetchListingById,
        addListing,
        deleteListing,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};
