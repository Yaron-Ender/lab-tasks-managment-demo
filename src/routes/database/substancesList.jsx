import { NavLink } from "react-router-dom";
const SubstancesList = ({ substancesID }) => {
// THIS COMPONENET IS NOT IN USED
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