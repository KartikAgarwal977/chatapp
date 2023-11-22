import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcyhuk3i41sALWZ4CXmkpZB3oGNMfVQ5Q",
  authDomain: "chatapp-fb0ef.firebaseapp.com",
  projectId: "chatapp-fb0ef",
  storageBucket: "chatapp-fb0ef.appspot.com",
  messagingSenderId: "850822679931",
  appId: "1:850822679931:web:c77340ec42ff2721f141de",
  measurementId: "G-VYJ2174DDT"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
export const db = getFirestore(app);