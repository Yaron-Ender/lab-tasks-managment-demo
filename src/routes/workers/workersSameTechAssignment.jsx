import { useEffect,useRef,useState,Fragment } from "react";
import { useDocument } from "../../hooks/useDocument";
const WorkersSameTechAssignment = ({ assignmentID,profession,userID }) => {
const { document,error } = useDocument('assignments',assignmentID)
const [rerender, setRerender] = useState("");
const otherAssignmentObj = useRef({
  projectName: "",
  profession,
  test: [],
  userName:'',
  duedate: "",
  monograph: "",
}).current;

useEffect(()=>{
  if(document){
otherAssignmentObj.projectName = Object.keys(document)
Object.values(Object.values(document)).forEach((monographesObj)=>{
Object.entries(monographesObj).forEach((monoPlusTechArr)=>{
//check if there a value in the monograph property
if(monoPlusTechArr[1]){
  otherAssignmentObj.monograph=monoPlusTechArr[0]
  if (monoPlusTechArr[1][profession]){
    Object.entries(monoPlusTechArr[1][profession]).forEach((arr) => {
   arr[1]["workers"].forEach((workerObj) => {
   if (workerObj.workerID !== userID) {
     //test state is for make the comp rerender
     otherAssignmentObj.test = [...otherAssignmentObj.test, arr[0]];
     otherAssignmentObj.duedate = arr[1].dueDate;
     otherAssignmentObj.comments = arr[1].comments;
     otherAssignmentObj.supervisor = arr[1].supervisor;
     otherAssignmentObj.userName = workerObj.workerName;
     setRerender(arr[0]);
}
});
});
}
}
})
})
}
},[document])
return (
<div>

{otherAssignmentObj.test.length>0&&otherAssignmentObj.test.map((test,index)=>(
<Fragment key={index}>
<div>
{otherAssignmentObj.projectName&&<h3>{otherAssignmentObj.projectName}</h3>}
<h3>dueDate :{otherAssignmentObj.duedate} </h3>
</div>
<h3>{otherAssignmentObj.monograph} - {test} - {otherAssignmentObj.userName}</h3>
<div>
{(otherAssignmentObj.comments)?<h3>comments: {otherAssignmentObj.comments}</h3>:<span>no comments</span>}
</div>
<div>
{(otherAssignmentObj.supervisor)?<h3>supervisor:{otherAssignmentObj.supervisor}</h3>:<span>no supervisor has been set yet</span>}
</div>
</Fragment>
)) 
}

<hr />
</div>
  );
};

export default WorkersSameTechAssignment;