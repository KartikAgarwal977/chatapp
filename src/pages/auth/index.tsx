import { GoogleAuthProvider, User, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase-config";


interface AuthContextType {
  user: User|null;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
}
const userAuthContext = createContext<AuthContextType | null>(null);
export function useUserAuth() {
  return useContext(userAuthContext);
}
export function UserAuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
    },[])
    function logIn(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
      }
      function signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
      }
  function logOut() {
        
    return signOut(auth).then(() => {
          setUser(null)
        });
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