import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useState,useEffect,useRef } from 'react';
import AddProjectMono from './addProjectMono';
import Select from 'react-select';
import { useFriestore } from '../../hooks/useFirestore';
import { useNavigate} from 'react-router-dom';
const AddProject = () => {
const { addDocumentWithAnonymousID } = useFriestore('assignments')
const { arrayOfDocID} = useCollection("substances");
const { updateUsersAssignment } =useFriestore('users')
const [selectProject,setSelectProject]=useState([]);
const [projName,setProjName ]=useState(null);
const buildProjectObj = useRef({});
const arrOfMonogrpaghsNames= useRef();
const navigate = useNavigate()
useEffect(()=>{
  if(arrayOfDocID.length>0){
    arrayOfDocID.forEach((proj)=>{
      setSelectProject((prev)=>([...prev,{value:proj,label:proj}]))
    })
  }
},[arrayOfDocID])
useEffect(()=>{
  arrOfMonogrpaghsNames.current=[]
  buildProjectObj.current = {[projName]:''};
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
  buildProjectObj.current[projName]={...buildProjectObj.current[projName],[mono]:''}
})

}
if(fieldsObj){
  Object.keys(fieldsObj).map((m)=>{
buildProjectObj.current[projName][m]={...buildProjectObj.current[projName][m],
  [tech]:{ ...buildProjectObj.current[projName][m][tech], [test]:fieldsObj[m][tech][test] } } 
})
  }
}
// get called from addProjectMono
const deleteMonograph =(monoTitle)=>{
  Object.keys(buildProjectObj.current[projName]).forEach((m)=>{
    if(m === monoTitle){
    delete buildProjectObj.current[projName][m]
  }
  })
}
//Select project(the Select-box   at the top page)
const handleChange = (option)=>{
  setProjName(option.value);
}
//add assignment to assignments property in users collection
const addAssignmentToWorker = (assignmentObj,assignmentID) => {
//assignmentObj--> is the assignment object
//assignmetID --> is the id's asssignment document
  //reach to monographes
Object.values(Object.values(assignmentObj)).map((monographesObj) => {
//monographesObj --> {ih-eur: {…}, ih-jp: {…}, ih-usa: ''}
 if (monographesObj) {
  Object.values(monographesObj).map((tech)=>{
  //in every monograph only filled tech will apear --> {WET: {…}, HPLC: {…}}
Object.values(tech).map((testsObject)=>{
  //testsObject is noe obj contains all test -->{organic: {…}, imp: {…}, assay: {…}}
Object.entries(testsObject).map((test)=>{
  //['kf', {…}]
if(test[1]['workers'].length>0){
test[1]['workers'].forEach((userIDAndNameObj)=>{
//  grab the user id
updateUsersAssignment(userIDAndNameObj,assignmentID)

})
}
})
})
})
}
});
};
// this is the main function:two action happed here. one:build the assignments collection. two: take the document's id of assignments collection and the buildProjectObj(actually this is the document) and fill the assignment property of the user by the assAssignmentToWorker  
const handleSubmit=async(e)=>{
  e.preventDefault();
 const assignmentID = await addDocumentWithAnonymousID(buildProjectObj.current);
addAssignmentToWorker(buildProjectObj.current,assignmentID);
navigate('/assignment/projectsDashboard');
}
/////////////////////////////////////////////////////////
return(
  <div className="assign-project-container">
<form className="select-proj-and-mono-container" onSubmit={handleSubmit}>
<header>
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