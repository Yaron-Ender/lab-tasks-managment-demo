import { useEffect,useState,useRef } from "react";
import { useDocument } from "../../hooks/useDocument";
const WorkersMyAssignment = ({myAssignmentID,profession,userID,myAssignmentsLength,orderByDateFunction }) => {
const { document } =useDocument('assignments',myAssignmentID);
const [,setRerender]=useState('');
const [restricUseEffectIteration,setRestrictUseEffectIteration]=useState(1)
const myAssignmentObj = useRef({projectName:'',profession,test:[],monograph:''}).current
// console.log(myAssignmentID, myAssignmentsLength,document);
useEffect(()=>{
if(document&&restricUseEffectIteration<=myAssignmentsLength){
for(let i=0;i<=myAssignmentsLength;i++){
  setRestrictUseEffectIteration((prev)=>++prev)
}
myAssignmentObj.projectName = Object.keys(document)[0]
console.log(Object.values(document));
console.log(Object.values(Object.values(document)));

Object.values(Object.values(document)).forEach((monographesObj)=>{
  console.log(monographesObj)
  //{usa: {…}, eur: {…}, jp: ''}
  Object.entries(monographesObj).forEach((monoPlusTechArr)=>{
//check if there a value in the monograph property
console.log(monoPlusTechArr)
//['eur', {…}]
if(monoPlusTechArr[1]){
myAssignmentObj.monograph=monoPlusTechArr[0]
//array of test's name and details of the same technilogy
Object.entries(monoPlusTechArr[1][profession]).forEach((arr)=>{
  console.log(arr)
  //['assay + imp', {…}], ['organic purity', {…}]
 arr[1]['workers'].forEach((worker)=>{
if(worker.workerID===userID){
  myAssignmentObj.test = [...myAssignmentObj.test,arr];
  //rerender state is for make the comp rerender
  // setRerender(arr[0]);
}
})
})
}
console.log(myAssignmentObj);
orderByDateFunction(myAssignmentObj);
})
})
}
},[document])
};

export default WorkersMyAssignment;