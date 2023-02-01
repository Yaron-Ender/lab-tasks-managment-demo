import { useDocument } from "../../hooks/useDocument";
import { useState, useEffect,Fragment,useCallback,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Select from 'react-select';
import { useFriestore } from "../../hooks/useFirestore";
import { useStyle } from "../../hooks/useStyle";
import Button from '../../component/button/button'
import Avatar from "../../component/avatar/avatar";
import chevron from '../../asstes/chevron.svg'
const Projectspreview = ({ assignmentDocID,usersCollectionArray }) => {
const { error: documentError, document } = useDocument("assignments",assignmentDocID);
const { document:professionDocument } = useDocument('profession','supervisor');
const { selectCompSupervisor } = useStyle();
const { updateSupervisor, updateSupervisorDuedate,deleteDocument } =
  useFriestore("assignments");
const [dueDateArray,setDueDateArray]=useState([]);
const [testsArray,setTestsArray] = useState([]);
const [technologyArr,setTechnologyArr]=useState([]);
const [techWithTests,setTechWithTests]=useState([]);
const [usersArray,setUsersArray]=useState([]);
const supervisorBox = useRef()
const testObj = useRef(
  [{GC:{methanol :{comments:'001-005'},DMSO:{comments:'008'},mono:"EUR"}},
   {GC:{methanol :{comments:'001-005'},DMSO:{comments:'008'},mono:"EUR"}},
   {GC:{methanol :{comments:'001-005'},DMSO:{comments:'008'},mono:"EUR"}},
   {GC:{methanol :{comments:'001-005'},DMSO:{comments:'008'},mono:"JP"}},
   {GC:{methanol :{comments:'001-005'},DMSO:{comments:'008'},mono:"JP"}},
   {GC:{methanol :{comments:'001-005'},DMSO:{comments:'008'},mono:"USA"}},
   {GC:{methanol :{comments:'001-005'},DMSO:{comments:'008'},mono:"USA"}},

]
).current
const navigate = useNavigate();
//delete project
const deleteProject =async () => {
await deleteDocument(assignmentDocID);
navigate("/assignment");
setTimeout(()=>{
  navigate("/assignment/projectsDashboard");
},200)
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
const handleSupervisor = async (option,projName,monograph,tech,test)=>{
  if(tech){
    const updatedObject = { option, projName, monograph, tech, test };
    await updateSupervisor(updatedObject, assignmentDocID);
    //handle with tests-with-details-container demensions
    const selectElementBox = window.document.getElementById(
      `select-${projName}-${monograph}-${tech}-${test}`
    ).parentElement.parentElement;
  const testWithDetailsContainer =selectElementBox.parentElement.parentElement;
  testWithDetailsContainer.style.height = `${testWithDetailsContainer.scrollHeight}px`;
//handlw with the apearance of the date element
    const dateElement = window.document.getElementById(
      `${projName}-${monograph}-${tech}-${test}`
    );
    if (option.value) {
      dateElement.style.display = "block";
    } else {
      dateElement.style.display = "none";
    }
  }
}
const handlsupervisorDuedate =async(projName, monograph, tech, test, e) => {
 const date =  e.target.value;
 const updatedObject = { projName, monograph, tech, test,date }; 
 await updateSupervisorDuedate(updatedObject,assignmentDocID)
};
//open single tech
const handleOpenTech = (e) => {
 e.target.classList.toggle("open-tech-pannel");
const testsWithDetailsContainer = e.target.parentElement.nextElementSibling;
 if(e.target.classList.contains('open-tech-pannel')){
testsWithDetailsContainer.style.height = `${testsWithDetailsContainer.scrollHeight}px`;
testsWithDetailsContainer.style.opacity = "1";
testsWithDetailsContainer.style.margin='0 1rem 2rem 1rem'
 }
 if(!e.target.classList.contains('open-tech-pannel')){
 testsWithDetailsContainer.style.height ='0';
   testsWithDetailsContainer.style.opacity = "0";
     testsWithDetailsContainer.style.margin = "0";
 }
};
//this useEffect response on:1.lastDuedate 2.on the presantaion of the tests checkboxes
useEffect(()=>{
if(document){
  lastDuedate();
 setTestsArray((prev)=>(prev=[]))
  Object.keys(document[Object.keys(document)[0]]).sort().forEach((mono) => {
  let arr=[]
  let arr2=[]
  let object={}
  Object.entries(document[Object.keys(document)[0]][mono]).sort().forEach((techAndTestArr)=>{
   arr.push(techAndTestArr[1])
   })
  arr =arr.map((objOftestAdnDetails)=>{
 Object.assign(object,objOftestAdnDetails)
 })
 arr2.push(object)
setTestsArray((prev) => [...prev, { [mono]:{...arr2} }]);
  });
}    
},[document,lastDuedate])
 
//this useEffect response on building the states that buils the rest of the project preview UI
useEffect(()=>{
  if(document){
  const projName = Object.keys(document)[0];
  const techArr = []
  const techWithTestArr =[];
  Object.keys(document[Object.keys(document)[0]]).sort().forEach((mono)=>{
  Object.entries(document[Object.keys(document)[0]][mono]).sort().forEach((techAndTestArr) => {
  if(!techArr.includes(techAndTestArr[0])) {
  techArr.push(techAndTestArr[0])
    }
  setTechnologyArr(techArr)
})
// setTechWithTests([])
if(techArr.length>0){
  techArr.forEach((tech)=>{
    const testsObject = document[projName][mono][tech]
 techWithTestArr.push({ [tech]:{...testsObject,mono }});
})
// console.log(techWithTestArr)
}
}) 
setTechWithTests((prev) => [...prev, ...techWithTestArr]);
}
},[document])
useEffect(()=>{
  if(usersCollectionArray.length){
    setUsersArray(usersCollectionArray)
  }
},[usersCollectionArray])
//  console.log(techWithTests)
//  console.log(technologyArr)

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
{format(new Date(dueDateArray[0]),'EEEE dd/MM/yyyy')}
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
 {!test[1]['supervisor']&&<div className="status-box">
</div>}
<h4>{test[0]}</h4>
<span>{m[0]}</span>
</div>
   ))
  ))
))
))
}
{/* end of Test Status */}
</div>
</div>
</div>
{/* end of header */}
<div className="project-all-technologies-container">
{technologyArr.length>0&&technologyArr.map((tech,index)=>(
<div className="project-tech" key={index}>
  <div className="tech-chevron-box">
  <h3>{tech}</h3>
  <img src={chevron} alt="chevron icon" onClick={handleOpenTech}
  />
  </div>
  {/* {testObj&&console.log(testObj)} */}
  {techWithTests.length>0&&console.log(techWithTests)}
  {techWithTests.length>0&&techWithTests.map((objectOfTechAndTests)=>(
    // {HPLC:{imp: {…}, assay: {…}, organic: {…}, mono: 'ih-eur'} }
  Object.entries(objectOfTechAndTests).sort().map((techAndTestsArray,index)=>(
  //['HPLC', {…}]
  //1:{Imp: {…}, Assay: {…}, mono: 'EUR'}
  (techAndTestsArray[0]===tech)?
<div key={index}  className='tests-with-details-container'>
  {techWithTests.length>0&&console.log(techAndTestsArray)}
{Object.entries(techAndTestsArray[1]).sort().map((testAndDetailsArray,index)=>(
  <div key={index} className='tests-with-details-inner-container'>
  {techWithTests.length>0&&console.log(testAndDetailsArray)}
{
(testAndDetailsArray[0]!=='mono')?
<>
<div className="test-box">
<h4>{testAndDetailsArray[0]}</h4>
</div>
<div className="workers-box" >
<span>workers:</span>
{testAndDetailsArray[1]['workers'].length>0?
testAndDetailsArray[1]['workers'].map((workerObj,index)=>(
<Avatar key={index} src={workerObj['workerAvatar']}/>
)):<span>no worker was assigned</span>
}
</div>
<div className="test-details">
<h4><span>monograph : </span>{techAndTestsArray[1]['mono']}</h4>
{testAndDetailsArray[1]['dueDate']&&
<h4><span> dueDate :</span>{format(new Date(testAndDetailsArray[1]['dueDate']),'EEEE dd/MM/yyyy')}</h4>
}
<h4><span> comments : </span>{testAndDetailsArray[1]['comments']}</h4>

</div>
{professionDocument&&
<div className="supervisor-container">
<div className='supervisor-select-box'>
<Select
id={`select-${projName}-${techAndTestsArray[1]['mono']}-${tech}-${testAndDetailsArray[0]}`}
styles={selectCompSupervisor}
onChange={(option)=>(handleSupervisor(option,projName,techAndTestsArray[1]['mono'],tech,testAndDetailsArray[0]))}
options={professionDocument['supervisor'].concat({label:'cancel choise',value:'',id:'',photoURL:''})}
placeholder='Select Supervisor'
ref = {supervisorBox}
// onFocus ={(e)=>{handleTestsBoxDimension(e)}}
/>
</div>
  <label>
  <input
  id={`${projName}-${techAndTestsArray[1]['mono']}-${tech}-${testAndDetailsArray[0]}`}
  name='date'
  type="date"
 onChange={(e) =>handlsupervisorDuedate(projName,techAndTestsArray[1]['mono'],tech,testAndDetailsArray[0],e)}
  />
</label>
{document[projName][techAndTestsArray[1]['mono']][tech][testAndDetailsArray[0]]['supervisor']['photoURL']?
<Avatar className='supervisor-avatar' src={document[projName][techAndTestsArray[1]['mono']][tech][testAndDetailsArray[0]]['supervisor']['photoURL']}/>
:<span className="no-supervisor">no supervisor is assigned</span>
}
<span>supervisor duedate :</span>
{document[projName][techAndTestsArray[1]['mono']][tech][testAndDetailsArray[0]]['supervisor']['dueDate']?<span>{format(new Date(document[projName][techAndTestsArray[1]['mono']][tech][testAndDetailsArray[0]]['supervisor']['dueDate']),'EEEE dd/MM/yyyy')}</span>:<span></span>
}
</div>
}
</>:<div className="delete-last-item-mono"></div>
}
</div>
))}
</div>
:''    
))
))}
</div>
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
