import { useDocument } from "../../hooks/useDocument";
import { useState,useEffect, Fragment } from 'react';
const WorkersSuperAssignmentsList = ({ assignmentID }) => {
const { document } = useDocument("assignments", assignmentID);
console.log(document) 
const [projectDetailsArr, setProjectDetailsArr] = useState([]);
useEffect(()=>{
 if(document){
setProjectDetailsArr([])
 Object.values(Object.values(document)).forEach((monoObj)=>{
Object.entries(monoObj).forEach((monoPlusTechArr)=>{
if(monoPlusTechArr[1]){
Object.entries(monoPlusTechArr[1]).forEach((techAndTestArr)=>{
Object.entries(techAndTestArr[1]).forEach((testAndDetArr)=>{
console.log(testAndDetArr)
if(testAndDetArr[1].supervisor){
  setProjectDetailsArr((prev) => [...prev, { proj:Object.keys(document)[0],tech:techAndTestArr[0],monograph:monoPlusTechArr[0],test:testAndDetArr[0],
 workers:testAndDetArr[1]['workers'],supervisor:testAndDetArr[1].supervisor['name']}]);  
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
<h3>hai hai trallall</h3>
{projectDetailsArr.length>0&&projectDetailsArr.map((supervisorObj,index)=>(
<div key={index}>
{supervisorObj.supervisor?
<h3>
{supervisorObj.proj}

{supervisorObj.workers.length>0&&supervisorObj.workers.map((workersObj,index)=>(
<Fragment key={index}>
 <h3>{workersObj.workerName}</h3>   
</Fragment>
))}
 -{supervisorObj.monograph} - {supervisorObj.test} -
{supervisorObj.tech} - {supervisorObj.supervisor}
</h3>:''
}
<hr />
</div>
))}
</div>
  );
};

export default WorkersSuperAssignmentsList;