import {  NavLink } from "react-router-dom";
const WorkersSidebar = ({ userDoc }) => {
    return (
    <div className="worker-sidebar">
  <nav>
    <li>
    <NavLink to="/workers">
        workers home page
    </NavLink>
    </li>
 <li> 
{userDoc['position']['supervisor']&&
<NavLink to="/workers/supervisor">
    My projects
</NavLink>
}
{!userDoc['position']['supervisor']&&
<NavLink to="/workers/workersAssignments">
   projecs
</NavLink>
}
 </li>
  </nav>
    </div> 
    );
};

export default WorkersSidebar;