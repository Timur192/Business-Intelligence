import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBubg5C-wkSxEigiqwrDgNWG4CcmsciH0",
  authDomain: "nth-armor-383906.firebaseapp.com",
  databaseURL: "https://nth-armor-383906-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nth-armor-383906",
  storageBucket: "nth-armor-383906.appspot.com",
  messagingSenderId: "909078214138",
  appId: "1:909078214138:web:336bae1fe3e736d8dca043"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();