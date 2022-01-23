// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6OCMoU2LsEw2_RXYaNUlRA3NfSQ8SttA",
  authDomain: "react-firebase-project-397c0.firebaseapp.com",
  databaseURL:
    "https://react-firebase-project-397c0-default-rtdb.firebaseio.com",
  projectId: "react-firebase-project-397c0",
  storageBucket: "react-firebase-project-397c0.appspot.com",
  messagingSenderId: "791962544449",
  appId: "1:791962544449:web:348626a175878f909ad9c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firebaseDB = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
