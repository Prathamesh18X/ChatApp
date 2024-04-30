import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

// Your Firebase configuration (replace the placeholders with your actual configuration details)
const firebaseConfig = {
    apiKey: "AIzaSyC0ZV2chDofMhrpoxQFJt2yhH_gxkiZg-M",
    authDomain: "mern-authentication-18x.firebaseapp.com",
    projectId: "mern-authentication-18x",
    storageBucket: "mern-authentication-18x.appspot.com",
    messagingSenderId: "832607608399",
    appId: "1:832607608399:web:4634efedbfe2cd19a1543a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};
