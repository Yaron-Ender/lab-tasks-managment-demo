
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDocument } from "../../hooks/useDocument";
import { Fragment, useEffect,useState } from "react";
import WorkersMyAssignment from "./workersMyAssignment";
import WorkersSameTechAssignment from "./workersSameTechAssignment";
import WorkersOtherAssignments from "./workersOtherAssignments";
const WorkersAssignments = () => {
 const { arrayOfDocID, error } = useCollection("assignments");
 const { user } =useAuthContext(); 
 const { document:userDocuemnt, error: errorUser } = useDocument("users",user.uid);
 const [profession, setProfession] = useState(null);
 const [myAssignments,setMyAssignments] = useState([])

  useEffect(()=>{
  if(userDocuemnt){
  //store the users's assignments array 
  setMyAssignments((prev) => (prev = userDocuemnt["assignments"]));
  Object.keys(userDocuemnt["position"]).map((pos) => {
  if(userDocuemnt["position"][pos])setProfession(pos);
  });
  }
  },[userDocuemnt])
if(profession !=='supervisor'&& profession !=='manager'){
  return (
 <div className="workers-container">
{errorUser&&<h2>user does not exsist</h2>}
 <h1>Assignmets</h1>
 <div className="workers-my-assignments">
  <h2>My Assignments</h2>
 {myAssignments.length>0?myAssignments.map((assignmentID,index)=>(
 <WorkersMyAssignment  key={index} myAssignmentID={assignmentID}profession={profession} userID={userDocuemnt.id}/>
 )):<h3>No project has been assigned</h3>}
 </div>
 <div className="workers-same-tech-container">
 <h2>{profession} Assignments</h2>
 <div className="workers-same-tech-tests-container">
 {arrayOfDocID.length>0&&arrayOfDocID.map((assignmentID,index)=>(
 <WorkersSameTechAssignment key={index} assignmentID={assignmentID}profession={profession} userID={userDocuemnt.id} />
 ))}
 </div>
 </div>
 <div className="workers-other-container">
 <h2>Other workers Assignments</h2>
 <div className="workers-other-tests-container">
 {arrayOfDocID.length>0&&arrayOfDocID.map((assignmentID,index)=>(
 <WorkersOtherAssignments key={index} assignmentID={assignmentID}profession={profession} userID={userDocuemnt.id} />
 ))
}
</div>
 </div>
 </div>
   );
}

};

export default WorkersAssignments;