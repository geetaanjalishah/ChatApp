// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1AHnGN85KrKo4vpnEQwx5zaKGHhn4HJ8",
  authDomain: "chitchat-5e677.firebaseapp.com",
  projectId: "chitchat-5e677",
  storageBucket: "chitchat-5e677.appspot.com",
  messagingSenderId: "1057593207889",
  appId: "1:1057593207889:web:69ece3349ef566fac75c70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);