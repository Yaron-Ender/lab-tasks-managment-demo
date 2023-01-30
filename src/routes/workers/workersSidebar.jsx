import {  NavLink } from "react-router-dom";
const WorkersSidebar = ({ userDoc }) => {
    return (
    <div className="worker-sidebar">
  <nav>
 <li> 
{userDoc['position']['supervisor']&&
<NavLink to="/workers/supervisor">
    My projects
</NavLink>
}
{!userDoc['position']['supervisor']&&
<NavLink to="/workers/workersAssignments">
   Projecs
</NavLink>
}
 </li>
  <li>
  <NavLink to="/workers">
     Safety
  </NavLink>
  </li>
  </nav>
    </div> 
    );
};

export default WorkersSidebar;