// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getStorage } from 'firebase/storage';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB-lH8ePZ1-YJEUC6QKq1uSvDjwtpWyIBE",
//   authDomain: "songon-7c312.firebaseapp.com",
//   projectId: "songon-7c312",
//   storageBucket: "songon-7c312.appspot.com",
//   messagingSenderId: "764966011644",
//   appId: "1:764966011644:web:6342882c94e07cb5e30d79"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);

// Firestore database & storage

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB_wIsYVPIkIbLCSwTcWvwSeCI37aHsxbU",
  authDomain: "fir-chatapp-75f34.firebaseapp.com",
  projectId: "fir-chatapp-75f34",
  storageBucket: "fir-chatapp-75f34.appspot.com",
  messagingSenderId: "1040357783666",
  appId: "1:1040357783666:web:eda74bc9bcf4ddb6e4eaeb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export { app };
