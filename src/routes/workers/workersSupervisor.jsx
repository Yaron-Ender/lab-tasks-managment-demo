
import WorkersSuperAssignmentsList from "./workersSuperAssignmentsList";
const WorkersSupervisor = ({ arrayOfDocID,error }) => {


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