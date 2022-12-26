import { useEffect,useState,useRef,Fragment } from "react";
import { useDocument } from "../../hooks/useDocument";

const WorkersMyAssignment = ({myAssignmentID,profession,userName,userID }) => {
const { document,error } =useDocument('assignments',myAssignmentID);
const [rerender,setRerender]=useState('');
const myAssignmentObj = useRef({projectName:'',profession,test:[],duedate:"",monograph:''}).current
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
<div>
<h1>My Assignment</h1>
{myAssignmentObj.test.length>0&&myAssignmentObj.test.map((test,index)=>(
<Fragment key={index}>
<div>
{myAssignmentObj.projectName&&<h3>{myAssignmentObj.projectName}</h3>}
<h3>dueDate :{myAssignmentObj.duedate} </h3>
</div>
<h3>{myAssignmentObj.monograph} - {test} - {userName}</h3>
<div>
{(myAssignmentObj.comments)?<h3>comments: {myAssignmentObj.comments}</h3>:<span>no comments</span>}
</div>
<div>
{(myAssignmentObj.supervisor)?<h3>supervisor:{myAssignmentObj.supervisor}</h3>:<span>no supervisor has been set yet</span>}
</div>
</Fragment>
)) 
}

<hr />
</div>
  );
};

export default WorkersMyAssignment;