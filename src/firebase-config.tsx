// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsio0OD8o4uWPKYvhQoHwwd-PbqkfjCEA",
  authDomain: "chatapp-9cdcd.firebaseapp.com",
  projectId: "chatapp-9cdcd",
  storageBucket: "chatapp-9cdcd.appspot.com",
  messagingSenderId: "606346833379",
  appId: "1:606346833379:web:92578afc93b978b64404d6",
  measurementId: "G-PJG6HPSRDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
export const db = getFirestore(app);