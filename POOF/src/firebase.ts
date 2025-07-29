// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: "https://poof-4a122-default-rtdb.firebaseio.com",
  projectId: "poof-4a122",
  storageBucket: "poof-4a122.firebasestorage.app",
  messagingSenderId: "768445563361",
  appId: "1:768445563361:web:5c8597192f71a7aa7192a0",
  measurementId: "G-EK5G35JMCH"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}