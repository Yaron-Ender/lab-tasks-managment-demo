
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
 <div>
 <h1>Assignmets</h1>
 <h2>My Assignments</h2>
 {myAssignments.length>0&&myAssignments.map((assignmentID,index)=>(
 <Fragment key={index}>
 <WorkersMyAssignment myAssignmentID={assignmentID}profession={profession} userName={userDocuemnt.userName}userID={userDocuemnt.id}/>
 </Fragment>
 ))}
 <h2>{profession} Assignments</h2>
 {arrayOfDocID.length>0&&arrayOfDocID.map((assignmentID,index)=>(
 <div key={index}>
 <WorkersSameTechAssignment assignmentID={assignmentID}profession={profession} userID={userDocuemnt.id} />
 </div>
 ))}
 <h2>Other Assignments</h2>
 {arrayOfDocID.length>0&&arrayOfDocID.map((assignmentID,index)=>(
 <div key={index}>
 <WorkersOtherAssignments assignmentID={assignmentID}profession={profession} userID={userDocuemnt.id} />
 </div>
 ))
 }
 </div>
   );
}

};

export default WorkersAssignments;