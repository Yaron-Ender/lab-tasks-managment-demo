import { useDocument } from "../../hooks/useDocument";
import { useState, useEffect, Fragment,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { format, set } from "date-fns";
import Select from 'react-select';
import { useFriestore } from "../../hooks/useFirestore";
import { useStyle } from "../../hooks/useStyle";
import Button from '../../component/button/button'
import Avatar from "../../component/avatar/avatar";

const Projectspreview = ({ assignmentDocID }) => {
const { error: documentError, document } = useDocument("assignments",assignmentDocID);
const { error:professionError, document:professionDocument } = useDocument('profession','supervisor');
const { selectCompSupervisor } = useStyle();
const { updateSupervisor,deleteDocument } = useFriestore("assignments");
const [dueDateArray,setDueDateArray]=useState([]);
const [moveDown,setMoveDown]=useState(false)
const navigate = useNavigate()

//delete project
const deleteProject =async () => {
await deleteDocument(assignmentDocID);
 navigate("/assignment");
};


//finde the latest date in assignment document
 const lastDuedate = useCallback(()=>{
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
  }
  ); //end forEach details
  })
  }) 
  })
  }) 
  setDueDateArray((prev)=>(prev.sort((a,b)=>b-a)))
   //end of last dueDate
},[document]) 
// update supervisor in assignment collection
const handleSupervisor = async ( option,projName,monograph,tech,test )=>{
if(tech){
const updatedObject = { option, projName, monograph, tech, test }; 
await updateSupervisor(updatedObject, assignmentDocID);
}
}
//open tech box
const handleOpenTechBox = (e)=>{
e.target.classList.toggle('open')
const allTestBox = e.target.parentElement.nextElementSibling
if(e.target.classList.contains('open')){
  allTestBox.style.height ='100%';
}
if (!e.target.classList.contains("open")) {
  allTestBox.style.height = "0";
}
}
//open single tech
const handleOpenTech = (e) => {
 e.target.firstElementChild.classList.toggle('open')
const projectTech = e.target.nextElementSibling;
const projectMain = projectTech.firstElementChild.firstElementChild
const arrOfProjectTech = Array.from(projectTech.children)
 const childernNum = projectTech.childElementCount;
if (!e.target.firstElementChild.classList.contains("open")) {
  projectTech.style.height = `0px`;
}
if (e.target.firstElementChild.classList.contains('open')) {
  arrOfProjectTech.forEach((el) => {
  el.lastElementChild.style.display='none'
  });
 projectTech.style.height = `calc((${childernNum} * ${projectMain.scrollHeight}px))`;
}
};
//open more details box
const handleMoreDetailsBox = (e)=>{
  e.target.classList.toggle('open')
  const moreDetails =e.target.parentElement.nextElementSibling
  const wholeTest = e.target.parentElement.parentElement.
  parentElement;
  if ( e.target.classList.contains('open')) {
   moreDetails.style.display='block'
 wholeTest.style.height = `calc(${wholeTest.scrollHeight}px)`;
}
if(! e.target.classList.contains('open')){
  wholeTest.style.height = `calc(${wholeTest.scrollHeight}px - ${moreDetails.scrollHeight}px)`;
   moreDetails.style.display = "none";
}
}
useEffect(()=>{
if(document){
lastDuedate()
  }    
},[document,lastDuedate])
////////////////////////////////////////////////////
return(
<div className="project-preview">
{documentError&&<h2 className="error" >{documentError}</h2>}
{!documentError&&document&& Object.keys(document).map((projName,index)=>(
<Fragment key={index}>
<div className="project-header">
<h2>{projName}</h2>
<div className="delete-and-date-box">
{dueDateArray &&
dueDateArray.length>0&&
<span>
{format(new Date(dueDateArray[0]),'MM/dd/yyyy')}
</span>
}
<Button type="button" children="Delete Project" buttontype="deleteProject" onClick={()=>{deleteProject()}}/>
</div>
<div className="project-status">
<h3>i'm the status box</h3>
</div>
<div className="chevron-open-tech-box" onClick={handleOpenTechBox}>  
<svg  witdh='20' height='20' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
</div>
</div>
{/* this div wrap the monograoh,tech,test,details of each test */}
<div className="project-all-tests">
{Object.keys(document[projName]).sort().map((monograph,index)=>(
<Fragment key={index}>
{/* HPLC */}
<h4 onClick={handleOpenTech}>HPLC TESTS
<svg witdh='20' height='20' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg></h4>
<div className="project-tech">
{Object.keys(document[projName][monograph]).sort().map((tech,index)=>(
<Fragment key={index}>
{(tech==='HPLC')&&document[projName][monograph]['HPLC']&&
Object.keys(document[projName][monograph]['HPLC']).sort().map((test,index)=>(
  <Fragment key={index}>
<div className="whole-test">
<main className="main-details">
<div className="workers-and-test-box">
{/* shwo workers if there is one */}
{Object.keys(document[projName][monograph]['HPLC'][test]).sort().map((property,index)=>(
(property==='workers')?(document[projName][monograph]['HPLC'][test][property].length>0)?
<div key={index} className="workers-box">{document[projName][monograph]['HPLC'][test][property].sort().map((workerObj,index)=>
(<div key={index}>
<Avatar src={workerObj['workerAvatar']} />
</div>))}
</div>:<span>no workers are assigned</span>
:''
))}
<h4>{test}</h4>
</div>
{professionDocument&&
<div className="supervisor-box">
<div  className={`select-box ${moveDown ?'move-down':""}`}>
<Select
styles={selectCompSupervisor}
onChange={(option)=>(handleSupervisor(option,projName,monograph,tech,test))}
options={professionDocument['supervisor'].concat({label:'cancel choise',value:'',id:'',photoURL:''})}
placeholder='Select Supervisor'
onMenuOpen={()=>{setMoveDown(true)}}
onMenuClose={()=>{setMoveDown(false)}}
/>
</div>
{document[projName][monograph]['HPLC'][test]['supervisor']['photoURL']?
<Avatar src={document[projName][monograph]['HPLC'][test]['supervisor']['photoURL']} />
  :<span>no supervisor is assign</span>}
</div>
}
{professionError&&<h4>No Supervisor is register</h4>}
<div className="chevron-more-details" onClick={handleMoreDetailsBox}>
<svg witdh='20' height='20' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
</div>
</main>
<div className="more-details">
<h4><span>dueDate:</span>{document[projName][monograph]['HPLC'][test]['dueDate']}</h4>
<h4><span>Comments:</span>{document[projName][monograph]['HPLC'][test]['comments']}</h4>
<h4><span> Monograph</span>{monograph}</h4>
</div>
</div>
</Fragment> 
))}
</Fragment>
))}
</div>
{/*WET */}
<h4 onClick={handleOpenTech}>WET TESTS
<svg witdh='20' height='20' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg></h4>
<div className="project-tech">
{Object.keys(document[projName][monograph]).sort().map((tech,index)=>(
<Fragment key={index}>
{(tech==='WET')&&document[projName][monograph]['WET']&&
Object.keys(document[projName][monograph]['WET']).sort().map((test,index)=>(
  <Fragment key={index}>
<div className="whole-test">
<main className="main-details">
<div className="workers-and-test-box">
{/* shwo workers if there is one */}
{Object.keys(document[projName][monograph]['WET'][test]).sort().map((property,index)=>(
(property==='workers')?(document[projName][monograph]['WET'][test][property].length>0)?
<div key={index} className="workers-box">{document[projName][monograph]['WET'][test][property].sort().map((workerObj,index)=>
(<div key={index}>
<Avatar src={workerObj['workerAvatar']} />
</div>))}
</div>:<span>no workers are assigned</span>
:''
))}
<h4>{test}</h4>
</div>
{professionDocument&&
<div className="supervisor-box">
<div className={`select-box ${moveDown ?'move-down':""}`}>
<Select
styles={selectCompSupervisor}
onChange={(option)=>(handleSupervisor(option,projName,monograph,tech,test))}
options={professionDocument['supervisor'].concat({label:'cancel choise',value:'',id:'',photoURL:''})}
placeholder='Select Supervisor'
onMenuOpen={()=>{setMoveDown(true)}}
onMenuClose={()=>{setMoveDown(false)}}
/>
</div>
{document[projName][monograph]['WET'][test]['supervisor']['photoURL']?
<Avatar src={document[projName][monograph]['WET'][test]['supervisor']['photoURL']} />
  :<span>no supervisor is assign</span>}
</div>
}
{professionError&&<h4>No Supervisor is register</h4>}
<div className="chevron-more-details" onClick={handleMoreDetailsBox}>
<svg witdh='20' height='20' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
</div>
</main>
<div className="more-details">
<h4><span>dueDate:</span>{document[projName][monograph]['WET'][test]['dueDate']}</h4>
<h4><span>Comments:</span>{document[projName][monograph]['WET'][test]['comments']}</h4>
<h4><span> Monograph</span>{monograph}</h4>
</div>
</div>
</Fragment> 
))}
</Fragment>
))}
</div>
{/* GC */}
<h4 onClick={handleOpenTech}>GC TESTS
<svg witdh='20' height='20' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg></h4>
<div className="project-tech">
{Object.keys(document[projName][monograph]).sort().map((tech,index)=>(
<Fragment key={index}>
{(tech==='GC')&&document[projName][monograph]['GC']&&
Object.keys(document[projName][monograph]['GC']).sort().map((test,index)=>(
<Fragment key={index}>
<div className="whole-test">
<main className="main-details">
<div className="workers-and-test-box">
{/* shwo workers if there is one */}
{Object.keys(document[projName][monograph]['GC'][test]).sort().map((property,index)=>(
(property==='workers')?(document[projName][monograph]['GC'][test][property].length>0)?
<div key={index} className="workers-box">{document[projName][monograph]['GC'][test][property].sort().map((workerObj,index)=>
(<div key={index}>
 <Avatar src={workerObj['workerAvatar']} />
</div>))}
</div>:<span>no workers are assigned</span>
:''
))}
<h4>{test}</h4>
</div>
{professionDocument&&
<div className="supervisor-box">
<div className={`select-box ${moveDown ?'move-down':""}`}>
<Select
styles={selectCompSupervisor}
onChange={(option)=>(handleSupervisor(option,projName,monograph,tech,test))}
options={professionDocument['supervisor'].concat({label:'cancel choise',value:'',id:'',photoURL:''})}
placeholder='Supervisor'
onMenuOpen={()=>{setMoveDown(true)}}
onMenuClose={()=>{setMoveDown(false)}}
/>
</div>
{document[projName][monograph]['GC'][test]['supervisor']['photoURL']?
<Avatar src={document[projName][monograph]['GC'][test]['supervisor']['photoURL']} />
  :<span>no supervisor is assign</span>}
</div>
}
{professionError&&<h4>No Supervisor is register</h4>}
<div className="chevron-more-details" onClick={handleMoreDetailsBox}>
<svg  witdh='20' height='20' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
</div>
</main>
<div className="more-details">
<h4><span>dueDate:</span>{document[projName][monograph]['GC'][test]['dueDate']}</h4>
<h4><span>Comments:</span>{document[projName][monograph]['GC'][test]['comments']}</h4>
<h4><span> Monograph</span>{monograph}</h4>
</div>
</div>
</Fragment> 
))}
</Fragment>
))}
</div>
</Fragment>
))}
</div>    
{
}
</Fragment>
))}
</div>
  ) 
};

export default Projectspreview;
