import { useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    createUser,
    user,
    setUser,
    loading,
    setLoading,
    signInUser,
    signInWithGoogle,
    signOut,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext value={authInfo}>{children}</AuthContext>;
}

export default AuthProvider;
