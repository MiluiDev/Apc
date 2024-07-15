
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPoDYSR0dI3xqMiklvH77Zs1dUXzX5lIo",
  authDomain: "apcauth.firebaseapp.com",
  projectId: "apcauth",
  storageBucket: "apcauth.appspot.com",
  messagingSenderId: "335667610048",
  appId: "1:335667610048:web:aaaa4b7ed483dfb8f18825"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;