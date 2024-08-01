import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXXNQgSpzUBuqL8jbhPwhtkAPPNCjhp08",
  authDomain: "fanshawe-1185982.firebaseapp.com",
  projectId: "fanshawe-1185982",
  storageBucket: "fanshawe-1185982.appspot.com",
  messagingSenderId: "886606270594",
  appId: "1:886606270594:web:fd0ccf278d7bf3379fe49b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = getFirestore(app);
