import { useState,useContext} from 'react';
import { Outlet,NavLink } from "react-router-dom";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { useStyle } from '../../hooks/useStyle';  
const Navbar = () => {
const { openDatabaseNavbar } = useStyle()
   const { logout,error} = useLogout()
  const { user,manager } = useAuthContext()
    return (
      <div>
        <nav className="main-navbar">
          {!error&&(
           <>
            <NavLink to="database"
            onClick={()=>{openDatabaseNavbar()}}
            >database</NavLink>
            <NavLink to="/"
            >assign job</NavLink>
            <NavLink to="workers">workers</NavLink>
            {user&&<span>hello {user.displayName}</span>}
           </>
          )}
          <p onClick={logout} className='login-link'>Logout</p>
          {error&&<p>{error}</p>}
        </nav>
        <Outlet />
      </div>
    );
};

export default Navbar;