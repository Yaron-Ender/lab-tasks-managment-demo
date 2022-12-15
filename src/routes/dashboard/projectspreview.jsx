import { useDocument } from "../../hooks/useDocument";
import { useState, useEffect, useRef,useReducer, useCallback } from "react";
import { format } from "date-fns";
import ProjectspreviewDetails from "./projectspreviewDetails";

const Projectspreview = ({ assignmentDocID }) => {
  const initObj ={
    HPLC:[],
    HPLC_FILL_DET:(substanceName,mono,tech,test)=>{
      // setTest1(document[substanceName][mono][tech][test]['comments']);
    // setTest1(substanceName['ih-eur']['HPLC']['assay']['comments']);
    if(document){
      console.log(document[substanceName])
    }
  }
  }
  const projectsReducer =(state,action)=>{
  // console.log(action)
  
  //put here function that takes the details from the dispatch and up dtae a state 
  // setWorkers()
  const {type,payload,substanceName} = action;
  switch (type){
  case 'HPLC':
  
  state.HPLC_FILL_DET(substanceName,payload.monographName,type,payload.test);
return { ...state,HPLC:[...state['HPLC'],{test:payload.test,monographName:payload.monographName,comments:payload.comments}]};
case 'WET':
return {...state}
case 'GC':
return {...state}
default:
return state
}
}
const [iterate,setIterate]=useState(0)
const [test1,setTest1]=useState(null)
const [state,dispatch]=useReducer(projectsReducer,initObj)
const { error: documentError, document } = useDocument("assignments",assignmentDocID);
const [monographes,setMonographes]=useState([])
const [monoName,setrMonoName]=useState('')
const [tests,setTests]=useState([])
const [dueDateArray,setDueDateArray]=useState([])
const obj=useRef(initObj).current
  // console.log(document)

 const lastDuedate = ()=>{
  Object.keys(document).forEach((substanceName)=>{
  Object.keys(document[substanceName]).forEach((monographName)=>{
  setMonographes((prev)=>(prev=[...prev,monographName]))
  Object.keys(document[substanceName][monographName]).forEach((tech)=>{
  Object.keys(document[substanceName][monographName][tech]).forEach((test)=>{
  setIterate((prev)=>(++prev))
  setTests((prev)=>(prev=[...prev,test]))
  Object.entries(document[substanceName][monographName][tech][test]).forEach((details)=>{
  if(details[0]==='dueDate' && details[1]!==''){
  const date = new Date(details[1]).getTime() 
  setDueDateArray((prev) => (prev = [...prev, date]));
  }
  if(details[0]==='comments'){
    const comments = details[1]
  dispatch({type:tech,payload:{monographName,test,comments},substanceName})
  }
  if(details[0]==='workers'){
    const workers = details[1]
  dispatch({type:tech,payload:{monographName,test,workers},substanceName})
  }
})//end forEach details
//grab tests details
Object.keys()
})
}) 
})
}) 
setDueDateArray((prev)=>(prev.sort((a,b)=>b-a)))
}

useEffect(()=>{
if(document){
 lastDuedate()
}    
},[document])
////////////////////////////////////////////////////
  return(
 <div>
{document&& Object.keys(document).map((projName)=>(
<>
<h2>{projName}</h2>
{dueDateArray.length>0&&
<span>
{format(new Date(dueDateArray[0]),'MM/dd/yyyy')}
</span>
}

{/* {state['HPLC']['monographName']&&
<h3>{state['HPLC']['monographName']}</h3>
} */}

{state['HPLC'].length>0&& state['HPLC'].map((obj)=>(
<h3>{obj['monographName']}  - {obj['test']} -{obj['comments']}  </h3>

))
}
{
test1&&
<h4>{test1}</h4>

}
{document&&
<h4>{document[projName]['ih-eur']['HPLC']['asaay']['comments']}</h4>
}

{/* < ProjectspreviewDetails
x = {state['HPLC']}
/> */}
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
