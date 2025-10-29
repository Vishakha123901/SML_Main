import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOxJeYhxjP-vtfDeNiZkdQ2zMqkS1gE2o",
  authDomain: "blog-63b3a.firebaseapp.com",
  projectId: "blog-63b3a",
  storageBucket: "blog-63b3a.firebasestorage.app",
  messagingSenderId: "114374235607",
  appId: "1:114374235607:web:a0edf323da2dc6a443a792",
  measurementId: "G-F3BLYDGK0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore service
export const db = getFirestore(app);

// Get a reference to the Authentication service
export const auth = getAuth(app);
