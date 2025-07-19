// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRj2T8VANHbf7EBFK1XThBf1fDEa2PpVc",
  authDomain: "poof-4a122.firebaseapp.com",
  databaseURL: "https://poof-4a122-default-rtdb.firebaseio.com",
  projectId: "poof-4a122",
  storageBucket: "poof-4a122.firebasestorage.app",
  messagingSenderId: "768445563361",
  appId: "1:768445563361:web:5c8597192f71a7aa7192a0",
  measurementId: "G-EK5G35JMCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initalize Authorization and Sign-In
const provider = new GoogleAuthProvider();
const auth = getAuth();

provider.addScope('https://www.googleapis.com/auth/cloud-platform');
auth.useDeviceLanguage();
const signInUsingGoogleAuth = signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

export default signInUsingGoogleAuth;