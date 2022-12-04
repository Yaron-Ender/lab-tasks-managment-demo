import { useState,useEffect,useRef,useReducer } from "react";
import { Timestamp } from "firebase/firestore";
import { useFriestore } from "../../hooks/useFirestore";
import  edit from'../../asstes/edit.svg';
import done from '../../asstes/done.svg'
import Button from "../../component/button/button";
const MonographList = ({ document,id }) => {
const { updateDocument, updateMonographName } = useFriestore("substances");
const [monographFields, setMonographFields] = useState(null);
const [disabled, setdisabled] = useState(true);
const monographName = useRef("")
const monoDeteails=useRef({})
const [changeMonoName,setChangeMonoName] = useState("")
//reducer function
const firestoreReducer =(state,action)=>{
  const {type}=action
  switch (type){
    case 'MONO_NAME':
return { ...state, monographName:true};
case 'MONO_EDITION':
return { ...state, monographEdition: true };
case 'EFFECTIVE_DATE':
return { ...state, effectiveDate: true };
case 'TESTS':
  return { ...state,tests: true };
  case 'NOTE':
    return {...state,note:true }; 
    case 'RESET':
      return {...state, monographName: false,monographEdition: false,effectiveDate:false,note:false };
      default:
        return state ;
      }
  }
    //create array of objects {id:monographName} and store it in monographName state 
    useEffect(()=>{
  const arrayMono = [];
  let newObj ={};
  if(document){
    // it's for monograph names changing
    Object.keys(document).forEach((m)=> {
    let k = document[m]["id"] 
      arrayMono.push({[k]:m});
    })
    arrayMono.forEach((i)=>{
    newObj  = {...newObj,...i}
    monographName.current=newObj
    })
    //it's for the other fields 
    Object.keys(document).forEach((n)=>{
    let {effectiveDate,monographEdition,note,id,tests}=document[n]
    monoDeteails.current ={...monoDeteails.current,
    [document[n]['id']]:{ monographEdition,note,id,tests,effectiveDate} };        
  }) 
}
},[document])
const[state,dispatch]=useReducer(firestoreReducer,{
  monographName:false,
  monographEdition:false,
  effectiveDate:false,
  tests:false,
  note:false
})
//open and close input
const openCloseInput = (e,name,id) => {
  const el = window.document.querySelectorAll("span");
  el.forEach((s) => {
    s.classList.remove("open-input");
  });
  e.target.parentElement.classList.add("open-input");
  let inp 
   inp = window.document.querySelectorAll(`input[name=${name}]`);
   inp.forEach((input) => {
     if (input.getAttribute("id") == id) {
       input.disabled = false;
     }
   });
};
//turn all the inputs to disable after submiting the form
const turnToDissable =()=>{
  const el = window.document.querySelectorAll("span");
  el.forEach((s) => {
  s.classList.remove("open-input");
  });
}
//send data to useFirestore
//THE LOGIC IN THIS FUNCION IS DEVIDED INTO TWO PARTS 1. MONOGRAPH NAME 2.ALL THE OTHER FIELDS(conversion between Timestamp and date object)
const handleSubmitMonographName = (e) =>{
  e.preventDefault();
  // move input to the top and make it disabled
  setdisabled(true);   
  turnToDissable()
  //update monograph name in firestore
  if(state.monographName){
    updateMonographName(changeMonoName,id)
    dispatch({ type: "RESET" });
  }
  if (state.monographEdition&&monographFields) {
    updateDocument(id, monographFields);
    dispatch({ type: "RESET" });
  }
  if(state.effectiveDate&&monographFields) {
    updateDocument(id, monographFields);
     dispatch({ type: "RESET" });
  }
  if(state.tests&&monographFields) {
    updateDocument(id, monographFields);
    dispatch({ type: "RESET" });
  }
  if(state.note&&monographFields) {
     updateDocument(id, monographFields);
     dispatch({ type: "RESET" });
  }
  dispatch({type:'RESET'})
  };
  //handle with the old and the new monograph name and monograph feilds
  const handleChangeMonoField = (e, ID,technology,index) => {
    const { name, value } = e.target;
  switch(name){
  case "monographName":
setChangeMonoName((prev) => ({ ...prev,[ID]: e.target.value }));
dispatch({type:'MONO_NAME'})
break;
  case "monographEdition":
    if(e.target.id == ID && value){
 monoDeteails.current[ID]["monographEdition"] = value;
 setMonographFields((prev)=>(prev={...monoDeteails.current}))
 dispatch({ type:"MONO_EDITION" });
  }
  break;
case "effectiveDate":
if(e.target.id == ID && value){
  monoDeteails.current[ID]["effectiveDate"]=Timestamp.fromDate(new Date(value))
 setMonographFields((prev) => (prev = { ...monoDeteails.current }));
 dispatch({ type:"EFFECTIVE_DATE" });
}
break;
case 'tests':
  if(e.target.id == ID && value){
    monoDeteails.current[ID]["tests"][technology][index]=value
    setMonographFields((prev) => (prev = { ...monoDeteails.current }));
    dispatch({ type: "TESTS" });
  }
  break;
  case 'note':
    if(e.target.id == ID && value){
    monoDeteails.current[ID]["note"]=value;
    setMonographFields((prev) => (prev = { ...monoDeteails.current }));
    dispatch({ type:"NOTE" });
  }
  default:
    return;
  }
};
// --------------------------------------
return (
  <div className="substance-monographes">
  <h2 className="substance-title">{id}</h2>
    {document &&
   // create the Monograph title
   Object.keys(document).map((mono) => (
     <div className="change-singel-monograph"
     key={document[mono]["id"]}>
    
  {/* this div responsible of the UI mono details */}
  <div className="details-UI-container">
  <h2> {mono} / <span>
  {document[mono]["monographEdition"]}
    </span></h2>
  <h4> {document[mono]["effectiveDate"].toDate().toDateString()}</h4>
  </div> 
  {/* end of details_UI-container */}
   <div className="change-details">
  {/* this form store all the details input */}
  <form onSubmit={handleSubmitMonographName}
  className="details-input-container">
  {/* THE BUTTON HERE IS NOT VISIBLE AND USED ONLY FOR SUBMITING THE INPUT PERPUSEES */}
 <label >
  {/* monograph title */}
  <span>
   Monograph name
   <img src={edit} alt={edit} onClick={(e)=>{openCloseInput(e, "monographName",document[mono]["id"])}} />
  </span>
  <div className="btn-input-container">
  <input
  id={document[mono]["id"]}
  type="text"
  disabled
  name="monographName"
  onChange={(e)=>handleChangeMonoField(e,document[mono]["id"])}
  value={(changeMonoName[document[mono]["id"]])?changeMonoName[document[mono]["id"]]:''}
   />
  <button type="submit"></button>
  </div>
  </label>
  {/* efective date */}
  <label>
  <span>
   Effective date
   <img src={edit} alt={edit} onClick={(e)=>{openCloseInput(e, "effectiveDate", document[mono]["id"])}} />
  </span>
  <div className="btn-input-container">
  <input
  id={document[mono]["id"]}
  type="date"
  disabled
  name="effectiveDate"
  onChange={(e)=>handleChangeMonoField(e,document[mono]["id"])}
  value={monoDeteails.current[document[mono]["id"]["effectiveDate"]]}
  />
  <button type="submit"></button>
   </div>
  </label>
  {/* monograph edition */}
  <label>
  <span>
   Ed.
    <img src={edit} alt={edit} onClick={(e)=>{openCloseInput(e, "monographEdition", document[mono]["id"])}} />
  </span>
  <div className="btn-input-container">
   <input
    id={document[mono]["id"]}
    type="number"
    disabled
    name="monographEdition"
    onChange={(e)=>handleChangeMonoField(e,document[mono]["id"])}
    value={monoDeteails.current[document[mono]["id"]["monographEdition"]]}
    />
  <button type="submit"></button>
   </div>
  </label>
</form>
<div className="note-container">
<form  onSubmit={handleSubmitMonographName}>
<Button
type='submit'
children="Add comment"
buttontype="addProject"
/>
{/* <button type="submit">sdsdadasd</button> */}
   <textarea
  id={document[mono]["id"]}
  name="note"
  onChange={(e)=>handleChangeMonoField(e,document[mono]["id"])}
  value={monoDeteails.current[document[mono]["id"]["note"]]}   
  >
{document[mono]["note"]}
  </textarea>
</form>
 </div>
</div>

{/* tests*/}
<div className="change-tests">
{Object.keys(document[mono]['tests']).map((technology)=>
<div className="change-tests-container">
  <h3>{(technology)}</h3>
<ul>
{ document[mono]['tests'][technology].map((t,index)=>
<form onSubmit={handleSubmitMonographName}>
<li  className="btn-input-container">
<span>{t}</span>
<input
 id={document[mono]["id"]}
type="text"
name="tests" 
onChange={(e)=>handleChangeMonoField(e,document[mono]["id"],technology,index)}
/>
</li>
<Button
 onClick={(e)=>handleSubmitMonographName(e)}
  type='submit'
  buttontype="done" 
  children={<img className="done-img" src={done} alt={done}/>} 
/>
</form>
   )}
</ul>

</div>
  )}
</div>
</div>
  ))}
 </div>
  );
}
export default MonographList;
