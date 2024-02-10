import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCx9NIT0ESxPFbWUAvTg8mCcyQHW9Qp-jA",
  authDomain: "letmeask-3477a.firebaseapp.com",
  databaseURL: "https://letmeask-3477a-default-rtdb.firebaseio.com",
  projectId: "letmeask-3477a",
  storageBucket: "letmeask-3477a.appspot.com",
  messagingSenderId: "209929374182",
  appId: "1:209929374182:web:bd5ebd356017c6e2ed6e27"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Obtém a instância de autenticação do Firebase

export { app, auth, GoogleAuthProvider };
