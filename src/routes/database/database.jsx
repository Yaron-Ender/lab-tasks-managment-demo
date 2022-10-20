import { useState,useEffect} from "react";
import { Routes, Route,useNavigate} from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useStyle } from '../../hooks/useStyle'
import Button from "../../component/button/button";
import SubstancesList from "./substancesList";
import Substance from './Substance';
import Search from "../../component/input/Search";
import CreateSubstance from "./CreateSubstance";
const Database = () => {
const { openDatabaseNavbar,openDatabaseNavState } = useStyle();
const [open,setOpen]=useState(false)
const [resultOfCollection,setResultOfCollection]=useState(null)
const [openCreateNewSub,setOpenCreateNewSub]=useState(false)
const { arrayOfDocID,error } =useCollection('substances')
const navigate=useNavigate()
 useEffect(() => {
   if (openDatabaseNavState) {
   setTimeout(() => {setOpen(true)}, 10);
   }
   openDatabaseNavbar()
 }, [openDatabaseNavState,open]);
 //functions
const seeAllDoc=()=>{
setOpenCreateNewSub(false)
setResultOfCollection(arrayOfDocID)
}
const createNewSubstance=()=>{
navigate('/database')
setOpenCreateNewSub(true)
}
  return (
    <div className="database">
      <nav className={`database-navbar ${open ? "open" : ""}`}>
        <Button
          children="new substanca"
          buttontype="substance"
          onClick={createNewSubstance}
        />

        <Button
          children="All substance"
          onClick={seeAllDoc}
          buttontype="substance"
        />
        <Search />
      </nav>
      <div className="database-substances-container">
        {error && <p>{error}</p>}
        {!error && !openCreateNewSub &&<SubstancesList substancesID={resultOfCollection} />}
      </div>
      {openCreateNewSub && <CreateSubstance />}
      <Routes>
        <Route path=":id" element={<Substance />} />
      </Routes>
    </div>
  );
};

export default Database;