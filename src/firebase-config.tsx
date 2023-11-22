import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDownY6eqjyJebFWmcFTrtZh9ijopOQxTM",
  authDomain: "chatapp-bd15c.firebaseapp.com",
  projectId: "chatapp-bd15c",
  storageBucket: "chatapp-bd15c.appspot.com",
  messagingSenderId: "988635577387",
  appId: "1:988635577387:web:ea675b2b49c893fa323e6e",
  measurementId: "G-CLFC2F0WE8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
export const db = getFirestore(app);