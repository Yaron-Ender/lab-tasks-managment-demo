import { useDocument } from "../../hooks/useDocument";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import Select from 'react-select';
import { useFriestore } from "../../hooks/useFirestore";
import { useStyle } from "../../hooks/useStyle";
const Projectspreview = ({ assignmentDocID }) => {
  const { error: documentError, document } = useDocument("assignments",assignmentDocID);
  const { error:professionError, document:professionDocument } = useDocument('profession','supervisor');
 const { selectCompDatabaseStyle } = useStyle();
 const { generalDocUpdate } = useFriestore('assignments');
const [iterate,setIterate]=useState(0)
const [dueDateArray,setDueDateArray]=useState([])
//finde the latest date in assignment document
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
// update supervisor in assignment collection
const handleSupervisor =async ( option,projName,monograph,tech,test )=>{
if(tech){
const updatedObject = { option, projName, monograph, tech, test }; 
await generalDocUpdate(updatedObject,assignmentDocID);
}
}
useEffect(()=>{
if(document){
lastDuedate()
  }    
},[document])
////////////////////////////////////////////////////
return(
<div className="projects-preview">
{documentError&&<h2 className="error" >{documentError}</h2>}
{document&&professionDocument&& Object.keys(document).map((projName)=>(
<>
<div className="project-name-duedate">
<h2>{projName}</h2>
{dueDateArray &&
dueDateArray.length>0&&
<span>
{format(new Date(dueDateArray[0]),'MM/dd/yyyy')}
</span>
}
</div>
{/* this div wrap the monograoh,tech,test,details of each test */}
<div className="all-tests" style={{background:'lightgreen'}}>
{Object.keys(document[projName]).map((monograph)=>(
<>
{/* HPLC */}
<h4 style={{color:'red'}}>HPLC TESTS</h4>
{Object.keys(document[projName][monograph]).map((tech)=>(
<>
{(tech=='HPLC')&&document[projName][monograph]['HPLC']&&
Object.keys(document[projName][monograph]['HPLC']).map((test)=>(
  <>
<div className="whole-project">
<main className="main-details" style={{border:'2px solid black'}}>
{/* shwo workers if there is one */}
{Object.keys(document[projName][monograph]['HPLC'][test]).map((property)=>(
(property==='workers')?(document[projName][monograph]['HPLC'][test][property].length>0)?
<div className="workers-box"><h3>{document[projName][monograph]['HPLC'][test][property].toString()}</h3>
</div>:<h3>no workers are assigned</h3>
:''
))}
<h3>{test}</h3>
<div className="supervisor-box">
<span>select supervisor</span>
<Select
styles={selectCompDatabaseStyle}
onChange={(option)=>(handleSupervisor(option,projName,monograph,tech,test))}
options={professionDocument['supervisor']}
/>
</div>
<svg witdh='20' height='20' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="">
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
</main>
<div className="more-details" style={{border:'5px solid pink'}}>
<h3>Comments: {document[projName][monograph]['HPLC'][test]['comments']}</h3>
<h3>{tech}</h3>
<h3>{monograph}</h3>
</div>
</div>
<hr style={{height:'25px',background:'red'}}></hr>
</> 
))}
</>
))}
{/*WET */}
<h4 style={{color:'red'}}>WET TESTS</h4>
{Object.keys(document[projName][monograph]).map((tech)=>(
<>
{(tech=='WET')&&document[projName][monograph]['WET']&&
Object.keys(document[projName][monograph]['WET']).map((test)=>(
  <>
<div className="whole-project">
<main className="main-details" style={{border:'2px solid black'}}>
{/* shwo workers if there is one */}
{Object.keys(document[projName][monograph]['WET'][test]).map((property)=>(
(property==='workers')?(document[projName][monograph]['WET'][test][property].length>0)?
<div className="workers-box"><h3>{document[projName][monograph]['WET'][test][property].toString()}</h3>
</div>:<h3>no workers are assigned</h3>
:''
))}
<h3>{test}</h3>
<div className="supervisor-box">
<span>select supervisor</span>
<Select
styles={selectCompDatabaseStyle}
onChange={(option)=>(handleSupervisor(option,projName,monograph,tech,test))}
options={professionDocument['supervisor']}
/>
</div>
<svg witdh='20' height='20' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="">
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
</main>
<div className="more-details" style={{border:'5px solid pink'}}>
<h3>Comments: {document[projName][monograph]['WET'][test]['comments']}</h3>
<h3>{tech}</h3>
<h3>{monograph}</h3>
</div>
</div>
<hr style={{height:'25px',background:'red'}}></hr>
</> 
))}
</>
))}
{/* GC */}
<h4 style={{color:'red'}}>GC TESTS</h4>
{Object.keys(document[projName][monograph]).map((tech)=>(
<>
{(tech=='GC')&&document[projName][monograph]['GC']&&
Object.keys(document[projName][monograph]['GC']).map((test)=>(
  <>
<div className="whole-project">
<main className="main-details" style={{border:'2px solid black'}}>
{/* shwo workers if there is one */}
{Object.keys(document[projName][monograph]['GC'][test]).map((property)=>(
(property==='workers')?(document[projName][monograph]['GC'][test][property].length>0)?
<div className="workers-box"><h3>{document[projName][monograph]['GC'][test][property].toString()}</h3>
</div>:<h3>no workers are assigned</h3>
:''
))}
<h3>{test}</h3>
<div className="supervisor-box">
<span>select supervisor</span>
<Select
styles={selectCompDatabaseStyle}
onChange={(option)=>(handleSupervisor(option,projName,monograph,tech,test))}
options={professionDocument['supervisor']}
/>
</div>
<svg witdh='20' height='20' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="">
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>

</main>
<div className="more-details" style={{border:'5px solid pink'}}>
<h3>Comments: {document[projName][monograph]['GC'][test]['comments']}</h3>
<h3>{tech}</h3>
<h3>{monograph}</h3>
</div>
</div>
<hr style={{height:'25px',background:'red'}}></hr>
</> 
))}
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
