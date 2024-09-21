// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNsoMaZ5NR-v2eUcsG9qVsx-tp03Bhi84",
  authDomain: "movie-app-10d57.firebaseapp.com",
  projectId: "movie-app-10d57",
  storageBucket: "movie-app-10d57.appspot.com",
  messagingSenderId: "504155023914",
  appId: "1:504155023914:web:ae89b4f22e8295e33a3153",
  measurementId: "G-SGDFJPJK5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);      // Export auth directly
export const analytics = getAnalytics(app); // Export analytics directly
export const database = getFirestore(app);  // Export Firestore directly
