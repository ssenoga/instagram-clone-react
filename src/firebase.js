import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAybawzKxG6zgdV1HL-xmcXuq_5UGPw-Qk",
  authDomain: "instagram-clone-16d4c.firebaseapp.com",
  databaseURL: "https://instagram-clone-16d4c.firebaseio.com",
  projectId: "instagram-clone-16d4c",
  storageBucket: "instagram-clone-16d4c.appspot.com",
  messagingSenderId: "550868799263",
  appId: "1:550868799263:web:3c4a66767f84bf110c6a2a",
  measurementId: "G-RB86N34LTC"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
