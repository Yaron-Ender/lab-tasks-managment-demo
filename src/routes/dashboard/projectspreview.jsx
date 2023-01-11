import { useDocument } from "../../hooks/useDocument";
import { useState, useEffect,useRef, Fragment,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Select from 'react-select';
import { useFriestore } from "../../hooks/useFirestore";
import { useStyle } from "../../hooks/useStyle";
import Button from '../../component/button/button'
import Avatar from "../../component/avatar/avatar";

const Projectspreview = ({ assignmentDocID }) => {
const { error: documentError, document } = useDocument("assignments",assignmentDocID);
const { error:professionError, document:professionDocument } = useDocument('profession','supervisor');
const { selectCompSupervisor } = useStyle();
const { updateSupervisor, updateSupervisorDuedate,deleteDocument, deleteTest } =
  useFriestore("assignments");
const [dueDateArray,setDueDateArray]=useState([]);
const [moveDown,setMoveDown]=useState(false);
const [testsArray,setTestsArray] = useState([]);
const navigate = useNavigate();
//delete project
const deleteProject =async () => {
await deleteDocument(assignmentDocID);
 navigate("/assignment");
setTimeout(()=>{
  navigate("/assignment/projectsDashboard");
},200)
};
//delete test
const deleteSingleTest = async(projName, monograph, tech, test) => {
await deleteTest(assignmentDocID,projName, monograph, tech, test);
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
const handleSupervisor = async ( option,projName,monograph,tech,test)=>{
  if(tech){
  const updatedObject = { option, projName, monograph, tech, test }; 
  await updateSupervisor(updatedObject, assignmentDocID);
  const dateElement = window.document.querySelector(`.${projName}-${monograph}-${tech}-${test}`);
  console.log(dateElement)
if(option.value){
  dateElement.style.display='block' 
}else{  
  dateElement.style.display='none' 
}
}
}
const handlsupervisorDuedate =async(projName, monograph, tech, test, e) => {
 const date =  e.target.value;
 const updatedObject = { projName, monograph, tech, test,date }; 
 await updateSupervisorDuedate(updatedObject,assignmentDocID)

};
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
 const arrOfProjectTech = Array.from(projectTech.children)
 const childernNum = projectTech.childElementCount;
 if (!e.target.firstElementChild.classList.contains("open")) {
   projectTech.style.height = `0px`;
  }
  if (e.target.firstElementChild.classList.contains('open')) {
  if (projectTech.firstElementChild) {
  const projectMain = projectTech.firstElementChild.firstElementChild
  arrOfProjectTech.forEach((el) => {
  el.lastElementChild.style.display = "none";
  });
  projectTech.style.height = `calc((${childernNum} * ${projectMain.scrollHeight}px))`;
}
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
  lastDuedate();
 setTestsArray((prev)=>(prev=[]))
  Object.keys(document[Object.keys(document)[0]]).sort().forEach((mono) => {
  let arr=[]
  let arr2=[]
  let object={}
  Object.entries(document[Object.keys(document)[0]][mono]).sort().forEach((techAndTestArr)=>{
  //  console.log(techAndTestArr[1])
   arr.push(techAndTestArr[1])

  //  Object.keys(techAndTestArr[1]).sort().forEach((test)=>{
  //   console.log(test)
  //     arr.push(test)
  //   });
   })
  arr =arr.map((objOftestAdnDetails)=>{
  console.log(objOftestAdnDetails)
 Object.assign(object,objOftestAdnDetails)
 })
 arr2.push(object)
setTestsArray((prev) => [...prev, { [mono]:{...arr2} }]);
  });

}    
},[document,lastDuedate])
  console.log(testsArray)
////////////////////////////////////////////////////
return(
<div className="project-preview">
{documentError&&<h2 className="error" >Project was deleted</h2>}
{!documentError&&document&& Object.keys(document).map((projName,index)=>(
<Fragment key={index}>
<div className="project-header">
<h2>{projName}</h2>
<div className="delete-and-date-box">
{dueDateArray &&
dueDateArray.length>0&&
<span>
{format(new Date(dueDateArray[0]),'EEEE MM/dd/yyyy')}
</span>
}
<Button type="button" children="Delete Project" buttontype="deleteProject" onClick={()=>{deleteProject()}}/>
</div>
<div className="project-status">
<h4>Tests Status</h4>
<div className="all-tests-status-box">
{testsArray.length>0&&testsArray.sort().map((obj)=>(
// obj=>{monograph:{ imp:{},assay:{},ir:{} }}
Object.entries(obj).sort().map((m)=>(
//ih-eur: {0: {…}}
Object.entries(m[1]).sort().map((testArr)=>(
//m[1]==>{0:{...}}
Object.entries(testArr[1]).sort().map((test,index)=>(
//testArr[1]==> {organic: {…}, imp: {…}, assay: {…}}
<div key={index} className="one-test" >
  {test[1]['supervisor']&&
 <div className={`status-box ${(test[1]['supervisor']['status']['done']) ? 'done' :''} ${(test[1]['supervisor']['status']['issue']) ? 'issue' :''} `}></div>}
 {!test[1]['supervisor']&&<div className="status-box"></div>}
<h4>{test[0]}</h4>
<span>{m[0]}</span>
</div>
   ))
  ))
))
))
}
</div>
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
{document[projName][monograph]['HPLC'][test]&&
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
<Button type="button" children="Delete Test" buttontype="deleteProject" onClick={()=>{deleteSingleTest(projName, monograph, tech, test);}}/>
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
  <label>
  <input
  className={`${projName}-${monograph}-${tech}-${test}`}
  name='date'
  type="date"
 onChange={(e) =>handlsupervisorDuedate(projName,monograph,tech,test,e)}
  />
</label>
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
}
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
{document[projName][monograph]['WET'][test]&&
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
<Button type="button" children="Delete Test" buttontype="deleteProject" onClick={()=>{deleteSingleTest(projName, monograph, tech, test);}}/>
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
 <label>
  <input
  className={`${projName}-${monograph}-${tech}-${test}`}
  name='date'
  type="date"
 onChange={(e) =>handlsupervisorDuedate(projName,monograph,tech,test,e)}
  />
</label>
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

}
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
{document[projName][monograph]['GC'][test]&&
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
<Button type="button" children="Delete Test" buttontype="deleteProject" onClick={()=>{deleteSingleTest(projName, monograph, tech, test);}}/>
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
 <label>
  <input
  className={`${projName}-${monograph}-${tech}-${test}`}
  name='date'
  type="date"
 onChange={(e) =>handlsupervisorDuedate(projName,monograph,tech,test,e)}
  />
</label>
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

}
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
