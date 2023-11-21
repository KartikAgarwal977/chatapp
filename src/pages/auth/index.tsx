import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../../firebase-config";

const userAuthContext = createContext();

export function useUserAuth() {
  return useContext(userAuthContext);
}
export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});
  
    function logIn(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
      }
      function signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
      }
      function logOut() {
        return signOut(auth);
      }
      function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
      }
    return (
      <userAuthContext.Provider
        value={{ user, logIn, signUp, logOut, googleSignIn }}
      >
        {children}
      </userAuthContext.Provider>
    );
  }