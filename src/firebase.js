// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQzy04Dy8grTCU0SbuhbdjiyufSg72hHA",
  authDomain: "nodues-cse.firebaseapp.com",
  projectId: "nodues-cse",
  storageBucket: "nodues-cse.firebasestorage.app",
  messagingSenderId: "1033059355029",
  appId: "1:1033059355029:web:08c0d462e04fafdb5ace9c",
  measurementId: "G-17CQLSS4TK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);