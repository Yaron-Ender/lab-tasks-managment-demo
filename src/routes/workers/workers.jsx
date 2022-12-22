import { useEffect,useState,Fragment } from "react";
import { Routes, Route,NavLink, Outlet } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import WorkersAssignments from "./workersAssignments";
import WorkersSidebar from "./workersSidebar";
const Workers = () => {

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
< WorkersSidebar />
  <Routes>
  <Route path='workers/workersAssignments' element={<WorkersAssignments />} />
</Routes>
  </div>
);
};

export default Workers;
