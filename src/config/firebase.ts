import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuS2Rim_g_jcq_XXDsJsG4C4yqpu-Opec",
  authDomain: "next-curd-5153c.firebaseapp.com",
  projectId: "next-curd-5153c",
  storageBucket: "next-curd-5153c.appspot.com",
  messagingSenderId: "524961361579",
  appId: "1:524961361579:web:b2a91e1c5e4df12cb151ee",
  measurementId: "G-T14DQECRSZ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
