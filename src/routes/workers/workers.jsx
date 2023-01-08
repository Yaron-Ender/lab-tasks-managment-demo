import { Routes, Route } from "react-router-dom";
import WorkersAssignments from "./workersAssignments";
import WorkersSidebar from "./workersSidebar";
import WorkersSupervisor from "./workersSupervisor";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDocument } from "../../hooks/useDocument";
const Workers = () => {
const { arrayOfDocID} = useCollection("assignments");
const { user } = useAuthContext();
const { document,error:errorFromFirestore } =useDocument('users',user.uid)
return (
  <div className="workers">
  {!errorFromFirestore&&document&&
  <WorkersSidebar userDoc={document}/>
  }
    <Routes>
      <Route
        path="/workersAssignments"
        element={<WorkersAssignments />}
      />
      <Route
        path="/supervisor"
        element={document&&<WorkersSupervisor arrayOfDocID={arrayOfDocID} superId={document.id} />}
      />
    </Routes>
  </div>
);
};

export default Workers;
