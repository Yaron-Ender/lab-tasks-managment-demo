import { useState,useEffect,useCallback } from "react";
import WorkersSuperAssignmentsList from "./workersSuperAssignmentsList";
const WorkersSupervisor = ({ arrayOfDocID,superId}) => {
const [relavantid,setRelevantId] = useState([])
// this function get called from workersAssignmentsList
const relevantIdFunction = useCallback((relevantID)=>{
 setRelevantId((prev) => (prev = [...prev,relevantID]));
},[relavantid])
useEffect(() => {
  setRelevantId([]);
}, []);

return (
  <div className="supervisor-container">
  {relavantid&&<h2>you have {relavantid.length} projects</h2>}
  <div className="supervisor-assignments-list" >
  {arrayOfDocID.length > 0 &&
  arrayOfDocID.map((assignmentID,index)=>(
  <WorkersSuperAssignmentsList key={index} assignmentID={assignmentID} superId={superId} relevantIdFunction={relevantIdFunction} />
  ))}
  </div>
  </div>
);
};

export default WorkersSupervisor;