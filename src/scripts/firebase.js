// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseConfig = {

  apiKey: "AIzaSyABnjpHVqRO2Bh3Fv8yU7rURCwZHKXfG8M",

  authDomain: "deepblue-pursuits.firebaseapp.com",

  projectId: "deepblue-pursuits",

  storageBucket: "deepblue-pursuits.appspot.com",

  messagingSenderId: "125253996386",

  appId: "1:125253996386:web:956a9c6cf301ef2b94a63b",

  measurementId: "G-Q9DLFTX36R"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const firestoreDB = getFirestore(app);


const analytics = getAnalytics(app);