import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "aroundher.firebaseapp.com",
  databaseURL:
    "https://aroundher-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "aroundher",
  storageBucket: "aroundher.appspot.com",
  messagingSenderId: "58212294904",
  appId: "1:58212294904:web:f55bfced32cac2104b9b0d",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
