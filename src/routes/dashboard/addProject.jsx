import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useState,useEffect } from 'react';
import Button from '../../component/button/button';
import AddProjectMono from './addProjectMono';
import Select from 'react-select'
const AddProject = () => {
const { arrayOfDocID, error } = useCollection("substances");
const [selectProject,setSelectProj]=useState([]);
const [projName,setProjectName ]=useState(null)
useEffect(()=>{
if(arrayOfDocID.length>0){
arrayOfDocID.forEach((proj)=>{
setSelectProj((prev)=>([...prev,{value:proj,label:proj}]))
})
}
},[arrayOfDocID])
const handleSubmit=(e)=>{
 e.preventDefault();
}
    return (
      <div className="add-project">
        <h3>add project</h3>
<form className="select-proj-container" onSubmit={handleSubmit}>
    <label>
    <span>project :</span>
    <Select
        onChange={(option) => {
        setProjectName(option);
        }}
        options={selectProject}
    />
    </label>
{projName&& 
<div className='add-project-mono'>
<AddProjectMono 
projName={projName.value}
/>
</div>
}

    <Button
    disabled="disabled"
    children="Add Project"
    buttontype="addProject"
    />
</form>
      </div>
    );
};

export default AddProject;