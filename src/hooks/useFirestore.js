import { db } from "../firebase/firebase"
import { collection, doc,getDoc,writeBatch,setDoc } from "firebase/firestore";
export const useFriestore = (_collection)=>{
  const batch = writeBatch(db);
  const colRef = collection(db, _collection);
 //add document
 const addDocument =async(id,monographes)=>{
  console.log(_collection,id,monographes)
const docReff = doc(colRef,id)
await setDoc(docReff,monographes)
 }
 //updateDoc
 const updateDocument = async (id,mono, tech, index, newVal) => {
   const docReff = doc(colRef, id);
   const getdoc = await getDoc(doc(colRef,id));
   const originalObj = getdoc.data()
    originalObj[mono][tech][index] = newVal;
   batch.set(docReff,originalObj)
   await batch.commit();
  };
  const updateMonograph=async(newMono,oldMono,id)=>{
    const docReff = doc(colRef, id);
    const getdoc = await getDoc(docReff);
    const originalObj = getdoc.data()
    const modifiedObj = new Object()
    modifiedObj[newMono] = originalObj[oldMono];
    batch.set(docReff,{...modifiedObj})
    await batch.commit();
  }
 return { updateDocument,updateMonograph,addDocument }
}

 