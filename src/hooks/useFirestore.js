import { db } from "../firebase/firebase"
import { collection, doc,getDoc,writeBatch } from "firebase/firestore";
export const useFriestore = (_collection,id)=>{
  const colRef = collection(db,_collection)
  const docReff = doc(colRef, id);
  const batch = writeBatch(db);
 //updateDoc
 const updateDocument = async (id,mono, tech, index, newVal) => {
   const docReff = doc(colRef, id);
   const getdoc = await getDoc(doc(colRef,id));
   const originalObj = getdoc.data()
    originalObj[mono][tech][index] = newVal;
   batch.set(docReff,{...originalObj})
   await batch.commit();
  };
  const updateMonograph=async(newVal,mono)=>{
    const getdoc = await getDoc(docReff);
    const originalObj = getdoc.data()
    const modifiedObj = new Object()
    modifiedObj[newVal] = originalObj[mono];
   
    
    batch.set(docReff,{...modifiedObj})
    await batch.commit();
  }
 return { updateDocument,updateMonograph }
}

 