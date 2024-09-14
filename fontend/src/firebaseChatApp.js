// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCsPxjHuqASVmcFpTh2M_6tnxJ13R0xyk",
  authDomain: "chatapp-44134.firebaseapp.com",
  projectId: "chatapp-44134",
  storageBucket: "chatapp-44134.appspot.com",
  messagingSenderId: "934981079801",
  appId: "1:934981079801:web:b8877cad84a165e04ec828"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};