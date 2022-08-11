// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtM7zjuXimTAwQlf4if-7-XVazPaokvNY",
  authDomain: "projeto-ubuntu-c5640.firebaseapp.com",
  projectId: "projeto-ubuntu-c5640",
  storageBucket: "projeto-ubuntu-c5640.appspot.com",
  messagingSenderId: "662566580150",
  appId: "1:662566580150:web:c618d79206372726e69b17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db