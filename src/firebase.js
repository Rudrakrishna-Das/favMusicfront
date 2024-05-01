// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fav-music-1c3d5.firebaseapp.com",
  projectId: "fav-music-1c3d5",
  storageBucket: "fav-music-1c3d5.appspot.com",
  messagingSenderId: "754996446705",
  appId: "1:754996446705:web:033747719a9f558c96b050",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
