import { NavLink } from "react-router-dom";
const SubstancesList = ({ substancesID }) => {

  return (
    <div className="substancesList">
     {substancesID&&(
      <>
      <nav>
       {substancesID.map((subID)=>(
        <NavLink 
        key={subID}
         to={subID}
         >{subID}</NavLink>
        ))}
      </nav>
      </>
    
     )}   
    </div>
  )
};

export default SubstancesList;