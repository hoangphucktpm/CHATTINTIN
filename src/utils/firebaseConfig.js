// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_rQbeTWjt0seXVh-LCJcPX1x0_UqR5c4",
  authDomain: "appchat-69200.firebaseapp.com",
  projectId: "appchat-69200",
  storageBucket: "appchat-69200.appspot.com",
  messagingSenderId: "858612687546",
  appId: "1:858612687546:web:edc2a6a752d476d6999883",
  measurementId: "G-SK9SH56PC0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
