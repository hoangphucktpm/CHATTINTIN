// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVLU_6aypuSuSzsgtENtg8IGJPmucnpOY",
  authDomain: "chatotp-64366.firebaseapp.com",
  projectId: "chatotp-64366",
  storageBucket: "chatotp-64366.appspot.com",
  messagingSenderId: "167058820950",
  appId: "1:167058820950:web:3f8d84ef2f49e5cb4dd0f7",
  measurementId: "G-WH16213YND",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
