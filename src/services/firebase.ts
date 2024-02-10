import { FirebaseApp, initializeApp } from "firebase/app";
import 'firebase/auth';
import firebase from "firebase/compat/app";
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY ,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_ID
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();