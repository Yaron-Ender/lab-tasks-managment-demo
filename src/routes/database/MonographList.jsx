import React from 'react';
import { useState,Fragment } from "react";
import { useFriestore } from "../../hooks/useFirestore";
import  edit from'../../asstes/edit.svg';
const MonographList = ({ document,id }) => {
 const {updateDocument,updateMonograph}=useFriestore("substances",id)
  const[monographfieldText,setMonographfieldText]=useState("");
  const [MonoName,setMonoName]=useState(null)
  const[doesTextHasChnged,setDoesTextHasChanged]=useState(false)
  const [disabled,setdisabled]=useState(true)
  //open and close input
  const openCloseInput=(e)=>{
    const el = window.document.querySelectorAll("span");
   el.forEach((s)=>{ 
 s.classList.remove('open-input')
  })
  e.target.parentElement.classList.add('open-input');
//  setOpenMonoInput(true)
setdisabled(false)
}

//send data to useFirestore
const handleSubmitMonograph=(e)=>{
   e.preventDefault();
  // move inout to the top and make it disabled
  //  setOpenMonoInput(false)
   setdisabled(true)
    e.target.children[0].children[0].classList.remove("open-input");
  if(monographfieldText&&
    doesTextHasChnged){
  updateMonograph(monographfieldText,MonoName,id)
  setDoesTextHasChanged(false)
  }
  }
//handle with the old and the new monograph name
const handleChangeMonoName =(e)=>{
     setMonographfieldText(e.target.value);
     setMonoName(e.target.name);
     setDoesTextHasChanged(true)
}
//send data to fireStore for update the test
const handleSubmitTest =async (e,mono,tech,index)=>{
  e.preventDefault();
 const newTextValue = e.target[0].value;
await updateDocument(id,mono,tech,index,newTextValue)
//  setOpenMonoInput(false);
 setdisabled(true);
 e.target.children[0].children[0].classList.remove('open-input')
}
// --------------------------------------
return (
  <div className="substance-monograph">
    <h2 className="substance-title"> {id}</h2>
    {document &&
      // create the Monograph title
      Object.keys(document).map((mono) => (
        <Fragment key={mono}>
     <div className="mono-title-container">
     <form onSubmit={handleSubmitMonograph}>
 {/* monograph title */}
    <label>
     <span>
      {mono}
    <img src={edit} onClick={openCloseInput} />
    </span>
     <input
      type="text"
       disabled={disabled}
      name={mono}
      onChange={handleChangeMonoName}
      value={monographfieldText}
      />
    </label>
  {/* monograph edition */}
        <label>
          <span>
            {document[mono]['monographEdition']}
            <img src={edit} onClick={openCloseInput} />
          </span>
          <input
        type="text"
        disabled={disabled}
        name={document[mono]['monographEdition']}
        onChange={handleChangeMonoName}
        value={monographfieldText}
      />
    </label>
  {/* efective date */}
        <label>
          <span>
       {document[mono]['effectiveDate']}
       <img src={edit} onClick={openCloseInput} />
      </span>
      <input
        type="text"
        disabled={disabled}
        name={document[mono]['effectiveDate']}
        onChange={handleChangeMonoName}
        value={monographfieldText}
      />
    </label>
    {/* note */}  
     <label>
          <span>
       {document[mono]['note']}
       <img src={edit} onClick={openCloseInput} />
      </span>
      <input
        type="text"
        disabled={disabled}
        name={document[mono]['note']}
        onChange={handleChangeMonoName}
        value={monographfieldText}
      />
    </label>
            </form>
          </div>
   {Object.keys(document[mono]['tests']).map((technology, index) => (
            // create the Test fields
         <div className="single-test-container" key={index}>
        {technology.length>0 && 
        <p>{technology}</p>
        }
        <ul>
      {document[mono]['tests'][technology].map(test=>(
         <li key={test}>test</li>
      ))}
        </ul>

              {/* {document[mono][technology].map((test, index) => (
                <div key={index} className="test-title-container">
                  <form
                    onSubmit={(e) => {
                      handleSubmitTest(e, mono, technology, index);
                    }}
                  >
                    <label>
                      <span>
                        {test}
                        <img src={edit} onClick={openCloseInput} />
                      </span>
                      <input type="text" disabled={disabled} name={test} />
                    </label>
                  </form>
                </div>
              ))} */}
            </div>
          ))} 
        </Fragment>
      ))}
  </div>
);
    }
export default MonographList;