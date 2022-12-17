import { useState,useEffect} from "react";
import { useNavigate,useSearchParams} from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useStyle } from '../../hooks/useStyle';
import Substance from './Substance';
import CreateSubstance from "./CreateSubstance";
import Select from "react-select";
const Database = () => {
const [searchParams,setSearchParams] = useSearchParams()
const { openDatabaseNavbar,openDatabaseNavState,selectCompDatabaseStyle } = useStyle();
const [open,setOpen]=useState(false)
const [substanceIdOptions,setSubstanceIdOptions]=useState([])
const [openCreateNewSub,setOpenCreateNewSub]=useState(false)
const { arrayOfDocID,error } =useCollection('substances')
const navigate=useNavigate()
 useEffect(() => {
   if (openDatabaseNavState)//from usestyle
    {
   setTimeout(() => {setOpen(true)}, 10);
   }
   openDatabaseNavbar()//from useStyle
   if(arrayOfDocID){
  arrayOfDocID.forEach((substance)=>{
setSubstanceIdOptions((prev) => [
  ...prev,
  { value: substance, label: substance, color: "#742fcd" },
]);
})
   }
 },[openDatabaseNavState,open,arrayOfDocID ]);
 //functions
 const handleOption =(option)=>{
  setSearchParams({filter:option.value})
 }
const createNewSubstance=()=>{
navigate('/database')
setOpenCreateNewSub(true)
}
//function that get called in createSustance component and turn openCreateSub state to falls in order to close the createSubstabce comp. after push the "save monograph" button
const closeCreateSubstanceComp =()=>{
  setOpenCreateNewSub(false)
  
}
  return (
    <div className="database">
      <nav className={`database-navbar ${open ? "open" : ""}`}>
    <div>
    <h4>Select Substance to Modify</h4>
    <Select
    styles={selectCompDatabaseStyle}//from useStyle
    placeholder="substances list"
    onChange={(option) => {
      handleOption(option);
    }}
    options={substanceIdOptions}
    onMenuOpen={()=>{setOpenCreateNewSub(false)}}
    />
    </div>
     <h4 onClick={createNewSubstance}>Create New Substance</h4>
   </nav>
    {openCreateNewSub && (
      <CreateSubstance closeCreateSubstanceComp={closeCreateSubstanceComp} />
    )}
    {error && <p className="error">{error}</p>}
    {!error && searchParams.get("filter") && (
    <Substance
    substanceId={searchParams.get("filter")}
    closeCreateSubstanceComp={closeCreateSubstanceComp}
    />
   )}
  </div>
  );
};

export default Database;