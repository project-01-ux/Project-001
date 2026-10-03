import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase credentials configured for project-001-b499f
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAwC6jZLCFTMZ8bkkft-YrYHmSxetXmuHs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "project-001-b499f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "project-001-b499f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "project-001-b499f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1073790096090",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1073790096090:web:dab838ba962a3366f70be3",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-BRWJLK6VH6"
};

export const isFirebaseConfigured = true;

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore Database
export const db = getFirestore(app);
