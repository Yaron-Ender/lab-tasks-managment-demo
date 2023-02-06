import { Route,Routes,Link} from "react-router-dom";
import { useState } from "react";
import Login from "../login/Login";
import Signup from "../signup/signup";
const Home = () => {
const [signupNote,setSginupNote] = useState(false)

    return (
      <div className="homepage">
        <div className="login-page-effect">
          <h1 className="top-half">analitical laboratory</h1>
          <h1 className="bottom-half">analitical laboratory</h1>
        </div>
      {/* {signupNote&&
      
        <div className="signup-note">
          <h2>Welcome to Lab Task Managment Project</h2>
          <h3>becuase it's Demo version continue via Login Button</h3>
        </div>
      } */}
        <nav className="login-navbar">
          <div className="login-navbar-container">
            <Link className="login-link" to="login" onClick={()=>{setSginupNote(false)}} >
              login
            </Link>
            <Link className="signup-link" to="signup" onClick={()=>{setSginupNote(true)}}>
              signup
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    );
};

export default Home;