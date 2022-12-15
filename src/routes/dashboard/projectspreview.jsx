import { useDocument } from "../../hooks/useDocument";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import Select from 'react-select'
import { useStyle } from "../../hooks/useStyle";
import ProjectspreviewDetails from "./projectspreviewDetails";
const Projectspreview = ({ assignmentDocID }) => {
  const { error: documentError, document } = useDocument("assignments",assignmentDocID);
  const { error:professionError, document:professionDocument } = useDocument('profession','supervisor');
  console.log(professionDocument,documentError)
 const { selectCompDatabaseStyle } = useStyle();
const [iterate,setIterate]=useState(0)
// const [state,dispatch]=useReducer(projectsReducer,initObj)
const [dueDateArray,setDueDateArray]=useState([])

 const lastDuedate = ()=>{
   Object.keys(document).forEach((substanceName)=>{
  Object.keys(document[substanceName]).forEach((monographName)=>{
  Object.keys(document[substanceName][monographName]).forEach((tech)=>{
  Object.keys(document[substanceName][monographName][tech]).forEach((test)=>{
  Object.entries(document[substanceName][monographName][tech][test]).forEach(
    (details) => {
  if(details[0] === "dueDate" && details[1] !== "") {
    const date = new Date(details[1]).getTime();
   setDueDateArray((prev) => (prev = [...prev, date]));
    }
setIterate((prev) => ++prev);
}
 ); //end forEach details
  })
}) 
})
}) 
setDueDateArray((prev)=>(prev.sort((a,b)=>b-a)))
}
const handleSuperviser = ()=>{

}
useEffect(()=>{
if(document){
lastDuedate()
  }    
},[document])
////////////////////////////////////////////////////
return(
  <div>
{documentError&&<h2 className="error" >{documentError}</h2>}
{document&&professionDocument&& Object.keys(document).map((projName)=>(
  <>
<h2>{projName}</h2>

{dueDateArray &&
dueDateArray.length>0&&
<span>
{format(new Date(dueDateArray[0]),'MM/dd/yyyy')}
</span>
}

<div>
{Object.keys(document[projName]).map((monograph)=>(
  <>
<h4 style={{color:'red'}}>HPLC TESTS</h4>
<h3>{monograph}</h3>
{document[projName][monograph]['HPLC']&&
Object.keys(document[projName][monograph]['HPLC']).map((test)=>(
<>
<div>
<h3>{test}</h3>
<span>select supervier</span>
<Select
styles={selectCompDatabaseStyle}
onChange={(option)=>(handleSuperviser(option))}
options={professionDocument['supervisor']}

/>
</div>
{Object.keys(document[projName][monograph]['HPLC'][test]).map((property)=>(
(property==='workers')?
<div><h3>{document[projName][monograph]['HPLC'][test][property].toString()}</h3>
</div>:
<h3>{document[projName][monograph]['HPLC'][test][property]}</h3>

))}
</>
))}
<h4 style={{color:'red'}}>WET TESTS</h4>
{document[projName][monograph]['WET']&&
Object.keys(document[projName][monograph]['WET']).map((test)=>(
<>
<h3>{test}</h3>
</>
))}
<h4 style={{color:'red'}}>GC TESTS</h4>
{(document[projName][monograph]['GC'])&&
Object.keys(document[projName][monograph]['GC']).map((test)=>(
<>
<h3>{test}</h3>
</>
))}
</>
))}
</div>
    
{
  iterate&&
  <h3>{iterate}</h3>
}
</>
))}
</div>
  ) 
};

export default Projectspreview;
