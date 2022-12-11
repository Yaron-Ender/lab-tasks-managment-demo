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
const [selectProject,setSelectProject]=useState([]);
const [arrayMonographName,setArrayMonographName] = useState([]);
const [projName,setProjName ]=useState(null);
const buildProjectObj = useRef({});
const arrOfMonogrpaghsNames= useRef();
useEffect(()=>{
  if(arrayOfDocID.length>0){
    arrayOfDocID.forEach((proj)=>{
      setSelectProject((prev)=>([...prev,{value:proj,label:proj}]))
    })
  }
},[arrayOfDocID])
useEffect(()=>{
  arrOfMonogrpaghsNames.current=[]
  buildProjectObj.current = {};
},[projName])
// function that handle the data from AddTEst comp and from addProjectMono comp.

const handleTestFields =(monoTitle,fieldsObj,tech,test)=>{
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
  Object.keys(fieldsObj).map((m)=>{
buildProjectObj.current[m]={...buildProjectObj.current[m],
  [tech]:{ ...buildProjectObj.current[m][tech], [test]:fieldsObj[m][tech][test] } } 
  })

  }
}
// get called from addProjectMono
const deleteMonograph =(monoTitle)=>{
  Object.keys(buildProjectObj.current).forEach((m)=>{
    if(m === monoTitle){
      console.log(m)
    delete buildProjectObj.current[m]
  }
  })
}
const handleChange = (option)=>{
  setProjName(option.value);
}
const handleSubmit=async(e)=>{
  e.preventDefault();
//console.log(buildProjectObj.current)

 await addDocument('',buildProjectObj.current)
}
/////////////////////////////////////////////////////////
return(
    <div className="assign-project-container">
      {/* <h3>add project</h3> */}
<form className="select-proj-and-mono-container" onSubmit={handleSubmit}>
<header>
<Button
type='submit'
children="Add Project"
buttontype="addProject"
/>
   <label>
   <span>add project</span>
   <Select
    onChange={(option)=>handleChange(option)}
    options={selectProject}
    />
    </label>
</header>
{projName&& 
<>
{/* takes the substance name and bring all the document */}
<AddProjectMono 
projName={projName}
handleTestFields={handleTestFields}
deleteMonograph={deleteMonograph}
/>
</>
}
</form>
      </div>
    );
  };

export default AddProject;