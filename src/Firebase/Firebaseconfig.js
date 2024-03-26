// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAwnbM4SQ5LoQxAr8CFbQG9QJ3MfF2Vu50",
  authDomain: "todo-s-73172.firebaseapp.com",
  projectId: "todo-s-73172",
  storageBucket: "todo-s-73172.appspot.com",
  messagingSenderId: "646367834792",
  appId: "1:646367834792:web:62f8e28e6703f5707d089d",
  measurementId: "G-JJF8M0YJXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)
export default app;
