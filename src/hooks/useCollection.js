import { useState,useEffect } from 'react';
import { db } from '../firebase/firebase'
import { collection,onSnapshot } from "firebase/firestore";

export const useCollection=(_collection)=>{
 const [arrayOfDocID, setArrayOfDocID] = useState([]);
  const [error, setError] = useState(null); 
useEffect(()=>{
setArrayOfDocID((prev)=>(prev=[]))
 let refCol= collection(db,_collection)
const arr = []
const unsub = onSnapshot(refCol,(snapshot)=>{
snapshot.docs.forEach((sub)=>{
 if(!arr.includes(sub.id)){
   arr.push(sub.id)
   setArrayOfDocID((prev)=>(arr))
  }
 
}
)
// snapshot.docs.forEach(sub=>setArrayOfDocID((prev)=>([...prev,sub.id])))
if (snapshot.empty){
  setError('the collection is empty')
}
},(err)=>{
  setError(err.message);
  console.log(err.message);
})
return ()=>{unsub()}
},[_collection])
return{ arrayOfDocID,error }
}