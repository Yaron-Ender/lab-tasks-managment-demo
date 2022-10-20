import { useState,useEffect } from 'react';
import { db } from '../firebase/firebase'
import { collection,doc,getDocs,getDoc,onSnapshot } from "firebase/firestore";

export const useCollection=(_collection)=>{
 const [arrayOfDocID, setArrayOfDocID] = useState([]);
  const [error, setError] = useState(null); 
useEffect(()=>{
 let refCol= collection(db,_collection)
const unsub = onSnapshot(refCol,(snapshot)=>{
  snapshot.docs.forEach(sub=>setArrayOfDocID(prev=>[...prev,sub.id]))
},(err)=>{
  setError(err.message);
  console.log(err.message);
})
return ()=>{unsub()}
},[_collection])
return{ arrayOfDocID }
}