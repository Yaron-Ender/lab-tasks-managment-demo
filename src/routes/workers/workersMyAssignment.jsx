import { useEffect,useState,useRef,Fragment } from "react";
import { useDocument } from "../../hooks/useDocument";
import { format } from "date-fns";
const WorkersMyAssignment = ({myAssignmentID,profession,userID }) => {
const { document } =useDocument('assignments',myAssignmentID);
const [,setRerender]=useState('');
const myAssignmentObj = useRef({projectName:'',profession,test:[],duedate:"",monograph:''}).current
console.log(document)
useEffect(()=>{
if(document){
myAssignmentObj.projectName = Object.keys(document)[0]
// console.log(Object.values(Object.values(document)))
Object.values(Object.values(document)).forEach((monographesObj)=>{
// console.log(monographesObj)
Object.entries(monographesObj).forEach((monoPlusTechArr)=>{
//check if there a value in the monograph property
if(monoPlusTechArr[1]){
myAssignmentObj.monograph=monoPlusTechArr[0]
// console.log(monoPlusTechArr) 
// console.log(Object.entries(monoPlusTechArr[1][profession]))
//array of test's name and details of the same technilogy
Object.entries(monoPlusTechArr[1][profession]).forEach((arr)=>{
 arr[1]['workers'].forEach((worker)=>{
if(worker.workerID===userID){
  //rerender state is for make the comp rerender
  myAssignmentObj.test=[...myAssignmentObj.test,arr[0]]
  myAssignmentObj.duedate=arr[1].dueDate;
  myAssignmentObj.comments=arr[1].comments;
  myAssignmentObj.supervisor=arr[1].supervisor['name'];
  setRerender(arr[0]);
}
})
})
}
})
})
}
},[document])
  return (
<div className="workers-singel-test-container">
<>
{myAssignmentObj.test.length>0&&myAssignmentObj.test.map((test,index)=>(
<Fragment key={index}>
<div className="workers-singel-test-card">
<h4>{format(new Date(myAssignmentObj.duedate), 'EEEE - MM/dd/yyyy')} </h4>
<div className="myAssignments-proj-test-box">
{myAssignmentObj.projectName&&<h4>{myAssignmentObj.projectName}</h4>}
<h4>{test}</h4>
</div>
<h4><span>methode : </span>{myAssignmentObj.monograph}</h4>
{(myAssignmentObj.comments)?<h4><span>comments : </span>{myAssignmentObj.comments}</h4>:<span>no comments</span>}
{(myAssignmentObj.supervisor)?<h4> <span>supervisor : </span>{myAssignmentObj.supervisor}</h4>:<span>no supervisor has been set yet</span>}
</div>
</Fragment>
)) 
}
</>
</div>
  );
};

export default WorkersMyAssignment;