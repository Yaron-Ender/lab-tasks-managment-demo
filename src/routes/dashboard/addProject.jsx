import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useState,useEffect,useRef } from 'react';
import Button from '../../component/button/button';
import AddProjectMono from './addProjectMono';
import Select from 'react-select';
import { useFriestore } from '../../hooks/useFirestore';
const AddProject = () => {

const { addDocument } = useFriestore('assignments')
const { arrayOfDocID, error } = useCollection("substances");
const [selectProject,setSelectProj]=useState([]);
const [arrayMonographName,setArrayMonographName] = useState([]);
const [projName,setProjName ]=useState(null);
const buildProjectObj = useRef({});
const arrOfMonogrpaghsNames= useRef();
arrOfMonogrpaghsNames.current=[]
useEffect(()=>{
  if(arrayOfDocID.length>0){
    arrayOfDocID.forEach((proj)=>{
    setSelectProj((prev)=>([...prev,{value:proj,label:proj}]))
    })
  }
},[arrayOfDocID])
// function that handle the data from AddTEst comp and from addProjectMono comp.
const handleTestFields =(monoTitle,fieldsObj)=>{
  if(monoTitle){
    for(let i=0;i<=arrOfMonogrpaghsNames.current.length;i++){
      if(!arrOfMonogrpaghsNames.current.includes(monoTitle)){
      arrOfMonogrpaghsNames.current=[...arrOfMonogrpaghsNames.current,monoTitle]
  }
  }
  arrOfMonogrpaghsNames.current.forEach((mono)=>{
  buildProjectObj.current={...buildProjectObj.current,[mono]:''}
})
}
if(fieldsObj){
  Object.keys(buildProjectObj.current).forEach((m)=>{
  buildProjectObj.current[m]={...buildProjectObj.current[m],...fieldsObj}
  })
  }
}
const handleChange = (option)=>{
  setProjName((prev)=>(option.value));
}
const handleSubmit=async(e)=>{
  e.preventDefault();
await addDocument(projName,buildProjectObj.current)
}
return(
    <div className="assign-project-container">
      <h3>add project</h3>
<form className="select-proj-and-mono-container" onSubmit={handleSubmit}>
<Button
type='submit'
children="Add Project"
buttontype="addProject"
/>
   <label>
   <span>project :(addProject comp)</span>
   <Select
    onChange={(option)=>handleChange(option)}
    options={selectProject}
    />
    </label>
{projName&& 
<div>
{/* takes the substance name and bring all the document */}
<AddProjectMono 
projName={projName}
handleTestFields={handleTestFields}
/>
</div>
}
</form>
      </div>
    );
  };

export default AddProject;