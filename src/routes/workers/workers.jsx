import { Routes, Route,NavLink } from "react-router-dom";
import WorkersAssignments from "./workersAssignments";
import WorkersSidebar from "./workersSidebar";
import WorkersSupervisor from "./workersSupervisor";
import { useCollection } from "../../hooks/useCollection";
const Workers = () => {
const { arrayOfDocID, error } = useCollection("assignments");

return (
  <div>
    <h2>workers</h2>
    <NavLink to="/workers">
      <span>workers hom page</span>
    </NavLink>
    <br></br>
    <NavLink to="workers/workersAssignments">
      <span>Add project</span>
    </NavLink>
    <WorkersSidebar />
    <Routes>
      <Route
        path="workers/workersAssignments"
        element={<WorkersAssignments />}
      />
      <Route
        path="/supervisor"
        element={<WorkersSupervisor arrayOfDocID={arrayOfDocID} error={error} />}
      />
    </Routes>
  </div>
);
};

export default Workers;
