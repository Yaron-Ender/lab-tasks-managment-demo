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
const openCloseInput = (e,name) => {
  const el = window.document.querySelectorAll("span");
  el.forEach((s) => {
    s.classList.remove("open-input");
  });
  e.target.parentElement.classList.add("open-input");
   const inp = window.document.querySelector(`input[name=${name}]`);
   inp.disabled=false
   console.log(inp.disabled)
};
//turn all the inputs to disable after submiting the form
const turnToDissable =()=>{
   const el = window.document.querySelectorAll("span");
  el.forEach((s) => {
    s.classList.remove("open-input");
  });
const inp = window.document.querySelectorAll('input');
inp.forEach((inp)=>{
inp.disabled=true
})
}
//send data to useFirestore
//THE LOGIC IN THIS FUNCION IS DEVIDED INTO TWO PARTS 1. MONOGRAPH NAME 2.ALL THE OTHER FIELDS(conversion between Timestamp and date object)
const handleSubmitMonographName = (e) =>{
  e.preventDefault();
  // move input to the top and make it disabled
  setdisabled(true);   
  turnToDissable()
  //update monograp name
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
  const handleChangeMonoField = (e, ID,technology,t,index) => {
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
case 'tests':
  if(e.target.id== ID && value){
monoDeteails.current[ID]["tests"][technology][index]=value
setMonographFields((prev) => (prev = { ...monoDeteails.current }));
 dispatch({ type: "TESTS" });
  }
  case 'note':
if(e.target.id== ID && value){
console.log(value)
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
    <h2 className="substance-title"> {id}</h2>
    {document &&
   // create the Monograph title
      Object.keys(document).map((mono) => (
   <div className="change-singel-monograph"
   key={document[mono]["id"]}>
    
   <div className="change-details">
   <form onSubmit={handleSubmitMonographName}
   className="details-input-container">
  {/* THE BUTTON HERE IS NOT VISIBLE AND USED ONLY FOR SUBMITING THE INPUT PERPUSEES */}
{/* this form store all the details input */}
    <label >
  {/* monograph title */}
  <span>
   Monograph name
   <img src={edit} onClick={(e)=>{openCloseInput(e, "monographName");}} />
  </span>
  <div className="btn-input-container">
  <input
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
   <img src={edit} onClick={(e)=>{openCloseInput(e, "effectiveDate");}} />
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
    <img src={edit} onClick={(e)=>{openCloseInput(e, "monographEdition");}} />
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

</form>
  {/* end of details-input-container */}
  <div className="details-UI-container">
  {/* this div responsible of the UI mono details */}
  <h2> {mono} / <span>
  {document[mono]["monographEdition"]}
    </span></h2>
  <h4> {document[mono]["effectiveDate"].toDate().toDateString()}</h4>
  </div>
  {/* end of details_UI-container */}
</div>
{/* tests*/}
<div className="change-tests">
<form onSubmit={handleSubmitMonographName}>
{Object.keys(document[mono]['tests']).map((technology)=>
<label>
  <h3>{(technology)}</h3>
{ document[mono]['tests'][technology].map((t,index)=>
<div className="btn-input-container">
<li>{t}</li>
 <img src={edit} onClick={openCloseInput} />
<input
 id={document[mono]["id"]}
type="text"
disabled={disabled}
name="tests" 
onChange={(e)=>handleChangeMonoField(e,document[mono]["id"],technology,t,index)}
/>
  <button type="submit"></button>
</div>
   )}
</label>
  )}
</form>
</div>
   {/* note */}
  <div className="note">
<form  onSubmit={handleSubmitMonographName}>
  <label>
    <span>
  <img src={edit} onClick={openCloseInput} />
    </span>
    <div className="btn-input-container">
   <textarea
     id={document[mono]["id"]}
     disabled={disabled}
     name="note"
     onChange={(e)=>handleChangeMonoField(e,document[mono]["id"])}
  value={monoDeteails.current[document[mono]["id"]["note"]]}   
   >
{document[mono]["note"]}
  </textarea>
  <button type="submit"></button>
   </div>
  </label>
</form>
  </div>
</div>
  ))}
 </div>
  );
}
export default MonographList;
