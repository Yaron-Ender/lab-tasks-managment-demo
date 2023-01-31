import WorkersSuperAssignmentsList from "./workersSuperAssignmentsList";
const WorkersSupervisor = ({ arrayOfDocID,superId}) => {
// this function get called from workersAssignmentsList
return (
  <div className="supervisor-container">
  <fieldset className="supervisor-assignments-list" >
  <legend> your projects</legend>
  {arrayOfDocID.length > 0 &&
  arrayOfDocID.map((assignmentID,index)=>(
  <WorkersSuperAssignmentsList key={index} assignmentID={assignmentID} superId={superId} />
  ))}
  </fieldset>
  </div>
);
};

export default WorkersSupervisor;