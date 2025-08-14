// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-advicer.firebaseapp.com",
  projectId: "ai-advicer",
  storageBucket: "ai-advicer.appspot.com",
  messagingSenderId: "76825602151",
  appId: "1:76825602151:web:88f8c03e80387ca3e74cc2",
  measurementId: "G-TL9XT867X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)