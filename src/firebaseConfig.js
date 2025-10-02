// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEinEwDhLbqx7Dcdzi4is1LJMh4rf_Z4k",
  authDomain: "blinkit-25ed9.firebaseapp.com",
  projectId: "blinkit-25ed9",
  storageBucket: "blinkit-25ed9.firebasestorage.app",
  messagingSenderId: "1022751222810",
  appId: "1:1022751222810:web:5191bd9269a2b9f2c7f5a3",
  measurementId: "G-PXKXZCZJTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
