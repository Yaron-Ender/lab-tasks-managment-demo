import { useDocument } from "../../hooks/useDocument";
import { useState, useEffect, useRef,useReducer, useCallback } from "react";
import { format } from "date-fns";
import ProjectspreviewDetails from "./projectspreviewDetails";
const Projectspreview = ({ assignmentDocID }) => {
const { error: documentError, document } = useDocument("assignments",assignmentDocID);
const [copy,setCopy]=useState([])
const initObj ={
    HPLC:{},
    WET:{},
    GC:{},
  }
  const projectsReducer =(state,action)=>{
    const {type,payload,substanceName} = action;
    const {property} = payload
    // switch (type){
      // case 'HPLC': 
    switch(property){
      case 'comments':
   
   return { ...state,[type]:{test:payload.test,monographName:payload.monographName, comments:document[substanceName][payload.monographName][type][payload.test][payload.property]}};
case 'dueDate':
return { ...state,[type]:{...state[type],test:payload.test,monographName:payload.monographName,dueDate:document[substanceName][payload.monographName][type][payload.test][payload.property]}}; 
 case 'workers':
  return { ...state,[type]:{...state[type],test:payload.test,monographName:payload.monographName,workers:document[substanceName][payload.monographName][type][payload.test][payload.property]}}; 
  default:
    return state
  }
  
  // case 'WET':
  //   return {...state}
  //   case 'GC':
  // return {...state}
  // default:
  // return state
  // }
}
  
const [iterate,setIterate]=useState(0)
const [state,dispatch]=useReducer(projectsReducer,initObj)
const [dueDateArray,setDueDateArray]=useState([])
const obj=useRef(state).current

 const lastDuedate = ()=>{
   Object.keys(document).forEach((substanceName)=>{
  Object.keys(document[substanceName]).forEach((monographName)=>{
    // setMonographes((prev)=>(prev=[...prev,monographName]))
    Object.keys(document[substanceName][monographName]).forEach((tech)=>{
      Object.keys(document[substanceName][monographName][tech]).forEach((test)=>{
    // grab details
    Object.keys(document[substanceName][monographName][tech][test]).forEach((detailsProperty)=>{
      Object.keys(document[substanceName][monographName][tech][test]).forEach((property)=>{
  // console.log(property)
  setIterate((prev) => ++prev);
  dispatch({type:tech,payload:{monographName,test,property},substanceName})
  })
});
//grab details methode 2
Object.entries(document[substanceName][monographName][tech][test]).forEach(
  (details) => {
        if (details[0] === "dueDate" && details[1] !== "") {
          const date = new Date(details[1]).getTime();
          setDueDateArray((prev) => (prev = [...prev, date]));
        }
     
        }
        ); //end forEach details
        //grab tests details
  })
}) 
})
}) 
setDueDateArray((prev)=>(prev.sort((a,b)=>b-a)))
}
 

console.log(copy)

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

{state['HPLC']['monographName']&&

<h3>{state['HPLC']['monographName']} - {state['HPLC']['test']} -
{state['HPLC']['dueDate']} - {state['HPLC']['comments']} -{state['HPLC']['workers'].join(', ')} </h3>
}


{/* {state['HPLC'].length>0&& state['HPLC'].map((obj)=>(
<h3>{obj['monographName']}  - {obj['test']} -{obj['comments']}- {obj['dueDate']}  </h3>))} */}


< ProjectspreviewDetails
x = {copy}
/>


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
