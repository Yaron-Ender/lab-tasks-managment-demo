import React from 'react';
import { Routes,Route,Outlet } from 'react-router-dom';
import MainSidebar from './mainSidebar';
import AddProject from './addProject';
import ProjectDashboard from './projectDashboard';
const Assignment = () => {
    return (
<div className='assignment'>
<MainSidebar />
<Outlet/>
<Routes>
<Route path='assignment/projectsDashboard' element={<ProjectDashboard />} />
<Route path='assignment/addProject' element={<AddProject />}/>
</Routes>
    </div>
    );
};

export default Assignment;