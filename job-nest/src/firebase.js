// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "job-nest-7cc7c.firebaseapp.com",
  projectId: "job-nest-7cc7c",
  storageBucket: "job-nest-7cc7c.firebasestorage.app",
  messagingSenderId: "396213714906",
  appId: "1:396213714906:web:74d894881e23b5402f0ae3",
  measurementId: "G-FZPNPVVD85"
};
// console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export {app, analytics, provider, auth}