
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocument } from '../../hooks/useDocument';
const WorkerSupervisorAss = ({ assignmentID }) => {
const { document,error } = useDocument('assignments',assignmentID)
const [projectDetailsArr,setProjectDetailsArr]=useState([])
useEffect(() => {
  if (document) {
Object.values(Object.values(document)).forEach((monoObj)=>{
Object.entries(monoObj).forEach((monoPlusTechArr) => {
if(monoPlusTechArr[1]){
Object.entries(monoPlusTechArr[1]).forEach((techAndTestArr)=>{
Object.entries(techAndTestArr[1]).forEach((testAdnDetArr) => {
if(testAdnDetArr[1].supervisor){
console.log(testAdnDetArr[1].supervisor);
setProjectDetailsArr((prev) => [...prev, { proj:Object.keys(document)[0],tech:techAndTestArr[0],monograph:monoPlusTechArr[0],supervisor:testAdnDetArr[1].supervisor['name']}]);
}   
});
})
}
});
})
  }
}, [document]);
return (
<div>
<h1>hai supervisor</h1> 
{projectDetailsArr.length>0&&projectDetailsArr.map((supervisorObj,index)=>(
<div key={index}>
<h3>{supervisorObj.proj} -{supervisorObj.monograph} - {supervisorObj.tech} - {supervisorObj.supervisor}</h3>
</div>
))}

</div>
    );
};

export default WorkerSupervisorAss;