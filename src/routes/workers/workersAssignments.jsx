
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
 //!! the reason i devided the logic into three seperate comp( WorkersMyAssignment -- responsible to display my Assigntments, and workersSameTechAssignments-- assignments with the same thech WorkersOtherAssignmet-- responsible for all the other assignments.) is because My assignment comes from the users collection as opposed to other assignments that comes from assignments collection - the reason for that is because we don't want to allow all the users access to users collection
  useEffect(()=>{
  if(userDocuemnt){
  setMyAssignments((prev) => (prev = userDocuemnt["assignments"]));
  Object.keys(userDocuemnt["position"]).map((pos) => {
  if(userDocuemnt["position"][pos])setProfession(pos);
  });
  }
  },[userDocuemnt])
 return (
<div>
<h1>Assignmets</h1>
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
};

export default WorkersAssignments;