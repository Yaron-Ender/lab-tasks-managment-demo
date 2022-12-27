import { useEffect } from "react";
import { Outlet,NavLink,useNavigate } from "react-router-dom";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useDocument } from '../../hooks/useDocument';
import { useLogout } from '../../hooks/useLogout';
import { useStyle } from '../../hooks/useStyle';  
const Navbar = () => {
  const { openDatabaseNavbar } = useStyle()
  const { logout,error} = useLogout()
  const { user } = useAuthContext()
  const { document,error:errorFromFirestore } =useDocument('users',user.uid)
  const navigate = useNavigate();
  useEffect(()=>{
  //supervisor immediatly direct to supervisor
  if(document&&document['position']['supervisor']){
    navigate('/workers/supervisor')
  }
//workers immediatly direct to Workers comp
  if (document && !document["position"]["manager"] && !document["position"]['supervisor']) {
    navigate("/workers");
  }

},[document])
    return (
      <div>
    <nav className="main-navbar">
    {!error&&document&&(
      <>
      {/* only manager can see the database and the "/" and workers links */}
    {document['position']['manager']&&  
    <>   
    <NavLink to="database"
    onClick={()=>{openDatabaseNavbar()}}
    >database</NavLink>
    <NavLink to="assignment"
    >assign job</NavLink>

    <NavLink to="workers">workers</NavLink>
    </>
    }
    {user&&<p className="welcome-user">hello <span>{user.displayName}</span></p>}
      </>
    )}
  <p onClick={logout} className='login-link'>Logout</p>
  {error&&<p>{error}</p>}
  {/* if we didn't get docuemnt */}
  {errorFromFirestore&&<h3>user not found</h3>}
  </nav>
  <Outlet />
      </div>
    );
};

export default Navbar;