import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyC6JHewdrvtfyNZvrTVSkxlQUssPctCHiQ",
  authDomain: "pi2prog3-cbd4a.firebaseapp.com",
  projectId: "pi2prog3-cbd4a",
  storageBucket: "pi2prog3-cbd4a.firebasestorage.app",
  messagingSenderId: "429255221690",
  appId: "1:429255221690:web:124b6f806d044d95917d83"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore()