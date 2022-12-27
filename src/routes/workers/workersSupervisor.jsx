
import { useEffect, useState } from "react";
import WorkersSuperAssignmentsList from "./workersSuperAssignmentsList";
import { useDocument } from '../../hooks/useDocument';
const WorkersSupervisor = ({ arrayOfDocID,error }) => {

const [projectDetailsArr,setProjectDetailsArr]=useState([])

return (
  <div>
  <h1>hai supervisor</h1>
  {error&&<h2>{error}</h2>}
  {arrayOfDocID.length > 0 &&
  arrayOfDocID.map((assignmentID,index)=>(
  <div key={index}>
  <WorkersSuperAssignmentsList assignmentID={assignmentID} />
  </div>
  ))}
  </div>
);
};

export default WorkersSupervisor;