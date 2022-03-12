// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0hGg22c-iOE-oEc_83OJ8LcfvfT8Yd3U",
  authDomain: "instagram-copy-b7df5.firebaseapp.com",
  databaseURL: "https://instagram-copy-b7df5-default-rtdb.firebaseio.com",
  projectId: "instagram-copy-b7df5",
  storageBucket: "instagram-copy-b7df5.appspot.com",
  messagingSenderId: "833217825807",
  appId: "1:833217825807:web:77c986badd791a0103677a"
};



// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
