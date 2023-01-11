import { useDocument } from "../../hooks/useDocument";
import { useState,useEffect, Fragment} from 'react';
import WorkersSupervisorOneAssignment from "./workersSupervisorOneAssignment";
const WorkersSuperAssignmentsList = ({ assignmentID,superId,relevantIdFunction}) => {
const { document } = useDocument("assignments", assignmentID);
const [projectDetailsArr, setProjectDetailsArr] = useState([]);
useEffect(()=>{
 if(document){
setProjectDetailsArr([])
 Object.values(Object.values(document)).forEach((monoObj)=>{
//{ih-usa: {…}}
Object.entries(monoObj).forEach((monoPlusTechArr)=>{
// ['ih-usa', {…}]
if(monoPlusTechArr[1]){
  Object.entries(monoPlusTechArr[1]).forEach((techAndTestArr)=>{
//['GC', {…}]
Object.entries(techAndTestArr[1]).forEach((testAndDetArr)=>{
if(testAndDetArr[1].supervisor.id===superId){
  relevantIdFunction(assignmentID)
  setProjectDetailsArr((prev) => [
    ...prev,
    {
      proj: Object.keys(document)[0],
      tech: techAndTestArr[0],
      monograph: monoPlusTechArr[0],
      test: testAndDetArr[0],
      workers: testAndDetArr[1]["workers"],
      status: testAndDetArr[1].supervisor["status"],
      supervisor:testAndDetArr[1].supervisor["name"],
      dueDate: testAndDetArr[1].supervisor["dueDate"],
      comments: testAndDetArr[1].comments,
    },
  ]);   
}
})
})
}
})
 })   
 }   
},[document])
  return (
<div className="supervisor-singel-proj">
{projectDetailsArr.length>0&&projectDetailsArr.sort().map((supervisorObj,index)=>(
<Fragment  key={index} >
{supervisorObj.supervisor?
<div>
< WorkersSupervisorOneAssignment supervisorObj={supervisorObj}  assignmentID={ assignmentID} />
</div>:''
}
</Fragment>

))}
</div>
  );
};

export default WorkersSuperAssignmentsList;