import React, { createContext, useEffect, useState, useContext } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../helpers/firebase";

//!const mantigini anla use context here with functions and just pull functions  ?
export const AuthContext = createContext();

//!defina a function to get data from authcontext
//!bu functionlara service deniyor to pull data from api, db
export const useAuth = () => {
  return useContext(AuthContext);
};
//!we need to tie every Context with Provider
const AuthContextProvider = (props) => {
  //!to pull user details and keep it we are using useEffect and state
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutFunct = () => {
    signOut(auth);
  };

  const signInWithGoogle = () => {
    googleProvider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, googleProvider);
  };

  //!hangi valuelari istiyorsak onlari providera gonderiyorsun

  const values = {
    signUp,
    signIn,
    signOutFunct,
    signInWithGoogle,
    currentUser,
  };

  useEffect(() => {
    //! when authentication situation changed
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoading(false);
    });
    //!garbage collection style
    //!contextprovider unmount oldugunda kaldir demek oluyur imis
    return unSubscribe;
  }, []);

  return (
    <AuthContext.Provider value={values}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
