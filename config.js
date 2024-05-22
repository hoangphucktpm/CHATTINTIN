import fire from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCFM63vw-bHDBASeag3AZFx_Ugv-LwLhjM",
  authDomain: "chat-6bcfa.firebaseapp.com",
  projectId: "chat-6bcfa",
  storageBucket: "chat-6bcfa.appspot.com",
  messagingSenderId: "104641576786",
  appId: "1:104641576786:web:9e6adffc6ac499db43048b",
  measurementId: "G-6W3G8F0RRF",
};

if (!fire?.apps?.length) {
  fire?.initializeApp(firebaseConfig);
}
