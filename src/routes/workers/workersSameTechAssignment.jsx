import { useEffect,useRef,useState,Fragment } from "react";
import { useDocument } from "../../hooks/useDocument";
const WorkersSameTechAssignment = ({ assignmentID,profession,userID }) => {
const { document} = useDocument('assignments',assignmentID)
const [rerender, setRerender] = useState("");
const otherAssignmentObj = useRef({
  projectName: "",
  profession,
  test: [],
  userName:[],
  duedate: "",
  monograph: "",
  supervisor:'',
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
      console.log(arr)
   arr[1]["workers"].forEach((workerObj) => {
   if (workerObj.workerID !== userID) {
  //rerender state is for make the comp rerender
  otherAssignmentObj.test = [...otherAssignmentObj.test, arr[0]];
  otherAssignmentObj.duedate = arr[1].dueDate;
  otherAssignmentObj.comments = arr[1].comments;
  otherAssignmentObj.supervisor = arr[1].supervisor['name'];
  otherAssignmentObj.userName=[...otherAssignmentObj.userName,{[arr[0]]:arr[1]['workers']}]
  console.log(otherAssignmentObj.userName)
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

{rerender&&otherAssignmentObj.test.length>0&&otherAssignmentObj.test.map((test,index)=>(
<Fragment key={index}>
<div>
{otherAssignmentObj.projectName&&<h3>{otherAssignmentObj.projectName}</h3>}
<h3>dueDate :{otherAssignmentObj.duedate} </h3>
</div>
<h3>{otherAssignmentObj.monograph} - {test}</h3>

 {otherAssignmentObj.userName.length>0&&otherAssignmentObj.userName.map((testAndWorkerObj,index)=>(
<Fragment key={index}>
{testAndWorkerObj[test]&&testAndWorkerObj[test].map((nameObj,index)=>(
<h3 key={index}>{nameObj.workerName}</h3>
))}
</Fragment>
 ))}
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