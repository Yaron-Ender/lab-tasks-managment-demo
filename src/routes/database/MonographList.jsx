import { useState,useEffect,useRef,useReducer,Fragment } from "react";
import { Timestamp } from "firebase/firestore";
import { useFriestore } from "../../hooks/useFirestore";
import  edit from'../../asstes/edit.svg';
const MonographList = ({ document,id }) => {
const { updateDocument, updateMonographName } = useFriestore("substances");
const [monographFields, setMonographFields] = useState(null);
const [disabled, setdisabled] = useState(true);
const monographName = useRef("")
const monoDeteails=useRef({})
const [changeMonoName,setChangeMonoName] = useState("")
//THE LOGIC IS SEPARATE TO TWO PARTS 1. MONOGRAPH NAME 2.ALL THE OTHER FIELDS(conversion between Timestamp and date object)
  //reducer function
  const firestoreReducer =(state,action)=>{
const {type,payload}=action
switch (type){
case 'MONO_NAME':
return { ...state, monographName:true};
case 'MONO_EDITION':
return { ...state, monographEdition: true };
case 'EFFECTIVE_DATE':
return { ...state, effectiveDate: true };
case 'RESET':
  return {...state, monographName: false,monographEdition: false,effectiveDate:false };
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
  let  k = document[m]["id"] 
 arrayMono.push({[k]:m});
 })
     arrayMono.forEach((i)=>{
   newObj  = {...newObj,...i}
   monographName.current=newObj
      })
//it's for the other fields 
 Object.keys(document).forEach((n)=>{
  let {effectiveDate,monographEdition,note,id,tests}=document[n]
    // effectiveDate=effectiveDate.toDate().toDateString()
 monoDeteails.current ={...monoDeteails.current,
   [document[n]['id']]:{ monographEdition,note,id,tests,effectiveDate} };  
 }) 
    }
},[document])
  const[state,dispatch]=useReducer(firestoreReducer,{
  monographName:false,
  monographEdition:false,
  effectiveDate:false
  })
  //open and close input
  const openCloseInput = (e) => {
    const el = window.document.querySelectorAll("span");
    el.forEach((s) => {
      s.classList.remove("open-input");
    });
    e.target.parentElement.classList.add("open-input");
    //  setOpenMonoInput(true)
    setdisabled(false);
  };

  //send data to useFirestore
  const handleSubmitMonographName = (e) =>{
    e.preventDefault();
    // move input to the top and make it disabled
    setdisabled(true);   
    //update monograp name
  if(state.monographName){
 updateMonographName(changeMonoName,id)
  }
  if (state.monographEdition&&monographFields) {
    updateDocument(id, monographFields);
  }
  if(state.effectiveDate&&monographFields) {
     updateDocument(id, monographFields);
  }
  dispatch({type:'RESET'})
  };

  //handle with the old and the new monograph name and monograph feilds
  const handleChangeMonoField = (e, ID) => {
    const { name, value } = e.target;
  switch(name){
  case "monographName":
setChangeMonoName((prev) => ({ ...prev, [ID]: e.target.value }));
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

default:
 return;
    }
  };
  //send data to fireStore for update the test
  const handleSubmitTest = async (e, mono, tech, index) => {
    e.preventDefault();
    const newTextValue = e.target[0].value;
    await updateDocument(id, mono, tech, index, newTextValue);
    //  setOpenMonoInput(false);
    setdisabled(true);
    e.target.children[0].children[0].classList.remove("open-input");
  };
  // --------------------------------------
  return (
    <div className="substance-monograph">
      <h2 className="substance-title"> {id}</h2>
      {document &&
        // create the Monograph title
        Object.keys(document).map((mono) => (
    <Fragment key={document[mono]["id"]}>
    
    <div className="change-monograph-container">
      <form onSubmit={handleSubmitMonographName}>
    {/* monograph title */}
    {/* THE BUTTON HERE IS NOT VISIBLE AND USED ONLY FOR SUBMITING THE INPUT PERPUSEES */}
    <label>
      <span>
      {mono}
      <img src={edit} onClick={openCloseInput} />
    </span>
    <div className="btn-input-container">
      <input
      type="text"
      disabled={disabled}
      name="monographName"
      onChange={(e)=>handleChangeMonoField(e,document[mono]["id"])}
     value={(changeMonoName[document[mono]["id"]])?changeMonoName[document[mono]["id"]]:''}
      />
  <button type="submit"></button>
    </div>
  </label>
  {/* monograph edition */}
  <label>
    <span>
      {document[mono]["monographEdition"]}
      <img src={edit} onClick={openCloseInput} />
    </span>
    <div className="btn-input-container">
      <input
      id={document[mono]["id"]}
      type="number"
      disabled={disabled}
     name="monographEdition"
    onChange={(e)=>handleChangeMonoField(e,document[mono]["id"])}
    value={monoDeteails.current[document[mono]["id"]["monographEdition"]]}
    />
  <button type="submit"></button>
   </div>
  </label>
   {/* efective date */}
  <label>
    <span>
      {document[mono]["effectiveDate"].toDate().toDateString()}
      <img src={edit} onClick={openCloseInput} />
    </span>
    <div className="btn-input-container">
      <input
      id={document[mono]["id"]}
      type="date"
      disabled={disabled}
     name="effectiveDate"
    onChange={(e)=>handleChangeMonoField(e,document[mono]["id"])}
    value={monoDeteails.current[document[mono]["id"]["effectiveDate"]]}
    />
  <button type="submit"></button>
   </div>
  
  </label>
  
</form>
</div>
{/* tests*/}
<form>
{Object.keys(document[mono]['tests']).map((technology)=>
<label>
  <span>
  <h3>{(technology)}</h3>
 <img src={edit} onClick={openCloseInput} />
  </span>
{document[mono]['tests'][technology].map(t=>
<div className="btn-input-container">
<li>{t}</li>
<input
 id={document[mono]["id"]}
type="date"
disabled={disabled}
name="tests" 
onChange={(e)=>handleChangeMonoField(e,document[mono]["id"])}
value={monoDeteails.current[document[mono]["id"]["effectiveDate"]]}
/>
  <button type="submit"></button>
</div>
   )}
</label>
  )}
</form>
</Fragment>
  ))}
 </div>
  );
}
export default MonographList;
