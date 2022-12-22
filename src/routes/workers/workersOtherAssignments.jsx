import { useEffect, useRef, useState, Fragment } from "react";
import { useDocument } from "../../hooks/useDocument";
const WorkersOtherAssignments = ({ assignmentID, profession, userID }) => {
const { document, error } = useDocument("assignments", assignmentID);
const [rerender, setRerender] = useState("");    
const otherAssignmentObj = useRef({
  projectName: "",
  profession,
  test:[],
  userName: [],
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
Object.entries(monoPlusTechArr[1]).forEach((techAndTestArr)=>{
if (techAndTestArr[0] !== profession){
Object.entries(techAndTestArr[1]).forEach((testAdnDetArr)=>{
  otherAssignmentObj.test = [...otherAssignmentObj.test, testAdnDetArr[0]];
  otherAssignmentObj.duedate = testAdnDetArr[1].dueDate;
  otherAssignmentObj.comments = testAdnDetArr[1].comments;
  otherAssignmentObj.supervisor = testAdnDetArr[1].supervisor;
  testAdnDetArr[1]['workers'].forEach((workerObj)=>{
    otherAssignmentObj.userName= [...otherAssignmentObj.userName,workerObj.workerName]
  })
  setRerender(testAdnDetArr[0]);
})
}
})
}
})
})
}
},[document])
return (
<div>
{otherAssignmentObj.test.length>0&&otherAssignmentObj.test.map((test,index)=>(
<Fragment keys={index}>
 <div>
{otherAssignmentObj.projectName&&<h3>{otherAssignmentObj.projectName}</h3>}
<h3>dueDate :{otherAssignmentObj.duedate} </h3>
 </div>
<h3>{otherAssignmentObj.monograph} -{test} - {otherAssignmentObj.userName.toString()}</h3>
</Fragment>
))
}
<hr />
</div>
  );
};

export default WorkersOtherAssignments;
