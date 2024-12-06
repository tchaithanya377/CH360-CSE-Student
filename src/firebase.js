// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDms_4IY2WftkKoP1cnFNLCBqHNymhAdps",
  authDomain: "college-management-4e323.firebaseapp.com",
  projectId: "college-management-4e323",
  storageBucket: "college-management-4e323.firebasestorage.app",
  messagingSenderId: "198799590130",
  appId: "1:198799590130:web:abca0e9493886240c2866b",
  measurementId: "G-0JZBG38R2K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);