import React from 'react';
import MainSidebar from './mainSidebar';
import { Routes,Route,Outlet } from 'react-router-dom';
import AddProject from './addProject';
const Assignment = () => {
    return (
    <div className='assignment'>
<MainSidebar />
<Outlet/>
<Routes>
<Route path='assignment/addProject' element={<AddProject />}/>
</Routes>
{/* <h1>text</h1> */}
    </div>
    );
};

export default Assignment;