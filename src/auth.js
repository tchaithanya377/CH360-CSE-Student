import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase"; // Ensure your Firestore is correctly configured

// Create the Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, updateStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Define the updateStatus function
export const updateStatus = async (studentId, newStatus) => {
  try {
    console.log(`Updating status for Student ID: ${studentId} to: ${newStatus}`);

    // Reference to the document to update
    const docRef = doc(db, "students", studentId);

    // Update the status field
    await updateDoc(docRef, { status: newStatus });

    console.log("Status updated successfully!");
  } catch (error) {
    console.error("Error updating status:", error);
  }
};
