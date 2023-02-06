import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyANL7vXkYdt394CoroQPlnTU0YXwgeXu7A",
  authDomain: "lab-task--management-demo.firebaseapp.com",
  projectId: "lab-task--management-demo",
  storageBucket: "lab-task--management-demo.appspot.com",
  messagingSenderId: "429156658456",
  appId: "1:429156658456:web:c1a63adddc0f689f25026d"
};


// Initialize Firebase
 const app = initializeApp(firebaseConfig);
//initialize Firestore
const db = getFirestore(app)
const auth= getAuth(app)
const storage =getStorage(app)
export { db,auth,storage }

