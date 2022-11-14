import React from 'react';
import { NavLink } from 'react-router-dom';
import AddIcon from '../../asstes/add.svg'
import dashboardIcon from '../../asstes/dashboard.svg'
const MainSidebar = () => {
    return (
<div className='main-sidebar'>
<h3>sometext</h3>
<nav>
<ul>
<li>
<NavLink to="/">
<img src={dashboardIcon}alt='dashboard icon'/>
<span>Dashboard</span>
</NavLink>
</li>
<li>
<NavLink to="/database">
<img src={AddIcon}alt='add icon'/>
<span>Add project</span>
</NavLink>
</li>
</ul>
</nav>
</div>
    );
};

export default MainSidebar;