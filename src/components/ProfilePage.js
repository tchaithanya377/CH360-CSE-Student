import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);

        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const email = user.email; // Get email of the logged-in user

            // Navigate Firestore to find the student document
            const studentQuery = query(
              collection(db, "students/III/A"),
              where("email", "==", email)
            );
            const querySnapshot = await getDocs(studentQuery);

            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                setUserInfo({ id: doc.id, ...doc.data() });
              });
            } else {
              console.error("Student document not found.");
            }
          } else {
            console.error("No user is logged in.");
          }
        });
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Update Firestore document
        const docRef = doc(db, "students/III/A", userInfo.id);
        await setDoc(docRef, userInfo, { merge: true });
        alert("Profile updated successfully!");
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (!userInfo) {
    return <div className="text-center text-red-600">No user information available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <button
          onClick={() => (editMode ? handleSave() : setEditMode(true))}
          className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700"
        >
          {editMode ? "Save" : "Edit"}
        </button>
      </header>

      {/* Personal Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
        {editMode ? (
          <>
            <input
              type="text"
              value={userInfo.name || ""}
              className="w-full py-2 px-4 rounded bg-gray-200 mb-2"
              placeholder="Name"
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            />
            <input
              type="email"
              value={userInfo.email || ""}
              className="w-full py-2 px-4 rounded bg-gray-200 mb-2"
              placeholder="Email"
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
            <input
              type="text"
              value={userInfo.fatherMobile || ""}
              className="w-full py-2 px-4 rounded bg-gray-200 mb-2"
              placeholder="Father's Mobile"
              onChange={(e) => setUserInfo({ ...userInfo, fatherMobile: e.target.value })}
            />
          </>
        ) : (
          <>
            <p className="text-gray-600">
              <strong>Name:</strong> {userInfo.name}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p className="text-gray-600">
              <strong>Roll NO:</strong> {userInfo.rollNo}
            </p>
            <p className="text-gray-600">
              <strong>Mobile:</strong> {userInfo.studentMobile}
            </p>
            <p className="text-gray-600">
              <strong>Father's Name:</strong> {userInfo.fatherName}
            </p>
            <p className="text-gray-600">
              <strong>Mother's Name:</strong> {userInfo.motherName}
            </p>
            <p className="text-gray-600">
              <strong>Father's Mobile:</strong> {userInfo.fatherMobile}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
