import { db } from "../firebase/firebase"
import { collection, doc,getDoc,writeBatch,setDoc,addDoc,updateDoc,deleteDoc} from "firebase/firestore";
export const useFriestore = (_collection)=>{
  const batch = writeBatch(db);
  const colRef = collection(db, _collection);
 //add document
 const addDocument =async(id,monographes)=>{
const docReff = doc(colRef,id)
await setDoc(docReff,monographes)
 }
const addDocumentWithAnonymousID =async(obj)=>{
 const doc = await addDoc(colRef,obj)
 //return the doc id for addProject comp
return doc.id
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
const updateSupervisor = async (updatedObj, id) => {
  const { projName, monograph, tech, test, option } = updatedObj;
  const value = { name: option.value, id: option.id,photoURL:option.photoURL,dueDate:'',status:{done:false,issue:false} };
const document = await getDoc(doc(colRef, id));
if(document.exists()){
const originalObject = document.data()
originalObject[projName][monograph][tech][test]['supervisor']=value;
await setDoc(doc(colRef, id), {...originalObject}); 
}
};
const updateSupervisorDuedate = async (updatedObject,id) => {
const { projName, monograph, tech, test, date } = updatedObject;
const document = await getDoc(doc(colRef, id));
if(document.exists()){
 const originalObject = document.data();
originalObject[projName][monograph][tech][test]["supervisor"]['dueDate'] = date
await setDoc(doc(colRef,id),{...originalObject})
}
};
//update project's status by supervisor
const updateProjectStatusBySupervisor = async (supervisorObj, id) => {
  const {proj,monograph,tech,test,status} = supervisorObj
const docRef = doc(colRef,id)
 const document = await getDoc(docRef);
 if(document.exists()){
  const originalObject = document.data();
originalObject[proj][monograph][tech][test]["supervisor"]["status"] = {...status};
await setDoc(docRef,{...originalObject})
}   
};
//get called from addProject
const updateUsersAssignment =async(userIDAndNameObj,assignmentID)=>{
const docRef = doc(colRef, userIDAndNameObj["workerID"]);
const docsnap = await getDoc(docRef);
if(docsnap.exists()){
const userAssignmentsArr = docsnap.data().assignments;
userAssignmentsArr.push(assignmentID)
await updateDoc(docRef, { 'assignments':userAssignmentsArr});
}
}
const deleteDocument =async (id)=>{
await deleteDoc(doc(colRef,id))
}
// called from workersAssignments --> update user Assignmets array
const correctAssginments = async(correctAssignmentsArr,id)=>{
const docRef = doc(colRef,id);
const docsnap = await getDoc(docRef);
if(docsnap.exists()){
await updateDoc(docRef, { 'assignments': correctAssignmentsArr });
}
}
 return {
   updateDocument,
   updateMonographName,
   addDocument,
   addDocumentWithAnonymousID,
   updateSupervisor,
   updateSupervisorDuedate,
   updateProjectStatusBySupervisor,
   updateUsersAssignment,
   deleteDocument,
  correctAssginments,
 };
}

