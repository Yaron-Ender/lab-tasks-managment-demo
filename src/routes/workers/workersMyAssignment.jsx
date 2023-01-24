import { useEffect,useState,useRef,Fragment } from "react";
import { useDocument } from "../../hooks/useDocument";
import { format } from "date-fns";
const WorkersMyAssignment = ({myAssignmentID,profession,userID,myAssignmentsLength }) => {
const { document } =useDocument('assignments',myAssignmentID);
const [,setRerender]=useState('');
const [restricUseEffectIteration,setRestrictUseEffectIteration]=useState(1)
const myAssignmentObj = useRef({projectName:'',profession,test:[],monograph:''}).current
useEffect(()=>{
if(document&&restricUseEffectIteration<=myAssignmentsLength){
for(let i=0;i<=myAssignmentsLength;i++){
  setRestrictUseEffectIteration((prev)=>++prev)
}
myAssignmentObj.projectName = Object.keys(document)[0]
Object.values(Object.values(document)).forEach((monographesObj)=>{
Object.entries(monographesObj).forEach((monoPlusTechArr)=>{
//check if there a value in the monograph property
console.log(monoPlusTechArr)
if(monoPlusTechArr[1]){
myAssignmentObj.monograph=monoPlusTechArr[0]
//array of test's name and details of the same technilogy
Object.entries(monoPlusTechArr[1][profession]).forEach((arr)=>{
 arr[1]['workers'].forEach((worker)=>{
if(worker.workerID===userID){
  console.log(arr)
  myAssignmentObj.test = [...myAssignmentObj.test,arr];
  //rerender state is for make the comp rerender
  setRerender(arr[0]);
  console.log(myAssignmentObj)
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
{test[1]["dueDate"]&&
  <h4>{ format(new Date(test[1]["dueDate"]),'EEEE dd/MM/yyyy')}</h4>
}
<div className="myAssignments-proj-test-box">
{myAssignmentObj.projectName&&<h4>{myAssignmentObj.projectName}</h4>}
<h4>{test[0]}</h4>
</div>
<h4><span>methode : </span>{myAssignmentObj.monograph}</h4>
{(test[1].comments)?<h4><span>comments : </span>{test[1].comments}</h4>:<span>no comments</span>}
{(test[1].supervisor.name)?<h4> <span>supervisor : </span>{test[1].supervisor.name}</h4>:<span>no supervisor has been set yet</span>}
</div>

</Fragment>
))}

</>
</div>
  );
};

export default WorkersMyAssignment;