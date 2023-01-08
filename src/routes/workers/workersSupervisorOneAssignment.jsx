
import {Fragment } from "react";
const WorkersSupervisorOneAssignment = ({supervisorObj}) => {
const {proj,test,monograph,workers,comments,dueDate} = supervisorObj
console.log(supervisorObj)
return (
<div className="supervisor-singel-test">
<div className="supervisor-card-date-proj-box">
<span>{dueDate}</span>
<h3>{proj}</h3>
</div>
<h4><span>test : </span>{test}</h4>
<h4><span>methode : </span>{monograph}</h4>
<h4><span>comments: </span> {comments}</h4>
<div className="supervisor-card-workers">
<span>workers : </span> 
{workers.length>0&&workers.map((workersObj,index)=>(
<Fragment key={index}>
 <h4>{workersObj.workerName}</h4>   
</Fragment>
))}
</div>
</div>
);
};

export default WorkersSupervisorOneAssignment;