import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDV2NcJ4NRwtzvtcYuG5n3EXq8wkF48YGo",
  authDomain: "employee-management-35712.firebaseapp.com",
  projectId: "employee-management-35712",
  storageBucket: "employee-management-35712.appspot.com",
  messagingSenderId: "296530281589",
  appId: "1:296530281589:web:0f034f2706e0fa97cf243c",
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
//initialize Firestore
const db = getFirestore(app)
const auth= getAuth(app)
const storage =getStorage(app)
export { db,auth,storage }
