// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_0mg_Mn88M4eICNMXwJyf1vHIJ4fdksA",
  authDomain: "shop-now-e0870.firebaseapp.com",
  projectId: "shop-now-e0870",
  storageBucket: "shop-now-e0870.appspot.com",
  messagingSenderId: "14482737388",
  appId: "1:14482737388:web:058d05c95e12dc3eb53dc9",
  measurementId: "G-T3DTE2QPKD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const provider = new GoogleAuthProvider();
