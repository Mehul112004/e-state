// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-29580.firebaseapp.com",
  projectId: "mern-estate-29580",
  storageBucket: "mern-estate-29580.appspot.com",
  messagingSenderId: "737459828864",
  appId: "1:737459828864:web:da11dbadfd81a3c3960e65"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);