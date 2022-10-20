import { doc,onSnapshot} from "firebase/firestore";
import { db } from'../firebase/firebase'
import { useState,useEffect} from "react";
export const useDocument = (_collection,id) => {
 const [document, setDocument] = useState(null);
 const [error, setError] = useState(null);  
const refDoc=doc(db,_collection,id) 
useEffect(()=>{
const unsub = onSnapshot(refDoc,(snapshot)=>{
if(snapshot.data()){
setDocument(snapshot.data())
setError(null)
}else{
  setError('document not found')
}

},(err)=>{
setError("failed to get document");
 console.log(err.message)
})
return ()=>{unsub()}
},[_collection,id])
return {error,document}
};

