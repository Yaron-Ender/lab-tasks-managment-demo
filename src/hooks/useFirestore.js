import { db } from "../firebase/firebase"
import { collection, doc,getDoc,writeBatch,setDoc,addDoc,updateDoc} from "firebase/firestore";
import { async } from "@firebase/util";
export const useFriestore = (_collection)=>{
  const batch = writeBatch(db);
  const colRef = collection(db, _collection);
 //add document
 const addDocument =async(id,monographes)=>{
  //add document without ID
if(!id){
await addDoc(colRef,monographes)
}
const docReff = doc(colRef,id)
await setDoc(docReff,monographes)
 }

 //updateDoc
 const updateDocument =async (id,fieldsObj)=>{
   const docReff = doc(colRef, id);
   const getdoc = await getDoc(doc(colRef, id));
   if(getdoc.exists()){
const origonalFullData = getdoc.data()
let modifiedObj={};
let monoNameAndID={}
Object.keys(origonalFullData).forEach((o)=>{
  monoNameAndID = { ...monoNameAndID, [o]:fieldsObj[origonalFullData[o]["id"]] };
const newData = fieldsObj[origonalFullData[o]["id"]];
modifiedObj = {...origonalFullData, [o]:{...newData} }
})  
  batch.set(docReff, { ...monoNameAndID });
  await batch.commit();
}
 }
  //update MonoGraphName
  const updateMonographName = async (monoName, id) => {
    const docReff = doc(colRef, id);
    const getdoc = await getDoc(docReff);
    const originalData = getdoc.data();
    const nameArr = [];
    let newMonoObj = {};
    let modifiedData = new Object();
    //make arry of names from firestore object
    Object.keys(originalData).forEach((m) => {
      nameArr.push(m);
    });
    //base on it make array of id
    nameArr.forEach((n) => {
      if (monoName[originalData[n].id]) {
    newMonoObj={...newMonoObj,[monoName[originalData[n].id]]:originalData[n]};
    delete originalData[n];
  modifiedData = { ...originalData, ...newMonoObj };
  }
    });
    batch.set(docReff, { ...modifiedData });
  await batch.commit(); 
  };
//has used by projectsPreview component
  const generalDocUpdate =async(updatedObj,id)=>{
    if(getDoc(doc(colRef,id))){
    const document = await getDoc(doc(colRef,id));
    const {projName,monograph,tech,test,option} = updatedObj;
    const string = `${projName}.${monograph}.${tech}.${test}.supervisor`;
    const value = option.value;
    await updateDoc(doc(colRef, id), {
    [string]:value
      });
    }
  }
 return { updateDocument,updateMonographName,addDocument,generalDocUpdate };
}

