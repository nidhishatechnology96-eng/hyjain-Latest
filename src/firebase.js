// src/firebase.js

import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore"; // <-- CHANGE #1
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIyBUbb9mnK9K1f6DTsk-Rt9fcmBjThLk",
  authDomain: "ecom-86d10.firebaseapp.com",
  databaseURL: "https://ecom-86d10-default-rtdb.firebaseio.com",
  projectId: "ecom-86d10",
  storageBucket: "ecom-86d10.appspot.com",
  messagingSenderId: "866941090133",
  appId: "1:866941090133:web:0d6bd8c28066d9de68d7dc",
  measurementId: "G-BK1ECQQX11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
// This special setting fixes the ERR_QUIC_PROTOCOL_ERROR network issue
export const db = initializeFirestore(app, {           // <-- CHANGE #2
  experimentalForceLongPolling: true,
});

export const auth = getAuth(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);