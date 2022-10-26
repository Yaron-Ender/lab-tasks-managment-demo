import { useState,useEffect,useRef,Fragment } from "react";
import { useFriestore } from "../../hooks/useFirestore";
import  edit from'../../asstes/edit.svg';
const MonographList = ({ document,id }) => {
  const initMonograpghDetailsValue = {
    effectiveDate: "",
    monographEdition: "",
    note: "",
  };
  const { updateDocument, updateMonographName } = useFriestore("substances");
  const [monographFields, setMonographFields] = useState(
    initMonograpghDetailsValue
    );
    const [doesTextHasChnged, setDoesTextHasChanged] = useState(false);
    const [disabled, setdisabled] = useState(true);
    const monographName = useRef("")
    const [changeMonoName,setChangeMonoName] = useState("")
    const { effectiveDate, monographEdition, note } = monographFields;
    //create array of objects {id:monographName} and store it in monographName state
    const arrayMono = []
    let newObj ={}
    if(document){
      Object.keys(document).forEach((m)=> {
     let  k = document[m]["id"] 
       arrayMono.push({[k]:m});
     })
     arrayMono.forEach((i)=>{
   newObj  = {...newObj,...i}
   monographName.current=newObj
      })
    }
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
    //  setOpenMonoInput(false)
    setdisabled(true);
    e.target.children[0].children[0].classList.remove("open-input");
    //just if doesTextHasChnged state is true the data will be sent to firestore
    if (doesTextHasChnged) {
    //send object to useFirestore
    updateMonographName(changeMonoName,id)
      setDoesTextHasChanged(false);
    }
  };
  //handle with the old and the new monograph name
  const handleChangeMonographName=()=>{
      
  }
  //handle with the old and the new monograph name
  const handleChangeMonoField = (e,ID) => {
  if(e.target.name==='monographName'){
    setChangeMonoName((prev)=>({...prev,[ID]:e.target.value}))
  }

  const { name, value } = e.target;
  console.log(name)
    setMonographFields((prev) => ({ ...prev, [name]: value }));
    setDoesTextHasChanged(true);
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
      type="number"
      disabled={disabled}
      name={"monographEdition"+document[mono]["id"]}
    onChange={(e)=>handleChangeMonoField(e,document[mono]["id"])}
      value={monographEdition}
    />
    <button type="submit"></button>
      </div>
        </label>
       </form>
              {/* efective date */}
              {/* <label>
          <span>
       {document[mono]['effectiveDate']}
       <img src={edit} onClick={openCloseInput} />
      </span>
      <input
        type="text"
        disabled={disabled}
        name={document[mono]['effectiveDate']}
        onChange={handleChangeMonoField}
        value={monographfieldText}
      />
    </label> */}
              {/* note */}
              {/* <label>
          <span>
       {document[mono]['note']}
       <img src={edit} onClick={openCloseInput} />
      </span>
      <input
        type="text"
        disabled={disabled}
        name={document[mono]['note']}
        onChange={handleChangeMonoField}
        value={monographfieldText}
      />
    </label> */}
            </div>
            {Object.keys(document[mono]["tests"]).map((technology, index) => (
              // create the Test fields
              <div className="single-test-container" key={index}>
                {technology.length > 0 && <p>{technology}</p>}
                <ul>
                  {document[mono]["tests"][technology].map((test) => (
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