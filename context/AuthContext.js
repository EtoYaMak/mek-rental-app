import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchUserRole(session.user.id);
        }
        setLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchUserRole(session.user.id);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchUserRole = async (userId) => {
    if (!userId) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", userId)
      .single(); // Ensure we are expecting a single row

    if (error) {
      if (error.code === "PGRST116") {
        // "PGRST116" means no rows found
        console.log("Profile not found for user:", userId);
        return null;
      } else {
        console.log("Error fetching user role:", error);
        setError(error.message);
        return null;
      }
    }
    if (data.role) {
      setRole(data.role);
    }
    return data.role;
  };

  const signUp = async (email, password, role) => {
    setLoading(true);
    setError(null);

    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([{ user_id: user.id, role }]);

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }
    // Fetch and set the role immediately after profile creation
    const userRole = await fetchUserRole(user.id);
    if (userRole) {
      setRole(userRole);
    }
    setUser(user);
    setLoading(false);
  };

  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    const userRole = await fetchUserRole(user.id);
    if (userRole) {
      setRole(userRole);
      console.log("Role set after signIn:", userRole); // Log the role being set
    }
    setUser(user);
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setUser(null);
    setRole(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, role, signIn, signUp, signOut, loading, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
