import { useState } from "react";
import { Route,Routes,Link,Outlet} from "react-router-dom";
import Button from "../../component/button/button";
import Login from "../login/Login";
import laboratory from '../../asstes/laboratory.jpg'
import Signup from "../signup/signup";
const Home = () => {

    return (
      <div className="homepage">
        <nav className="login-navbar">
          <div className="login-navbar-container">
            <Link className="signup-link" to="signup">
              signup
            </Link>
            <Link className="login-link" to="login">login</Link>
          </div>
        </nav>
        <div className="hero-img">
        <h1>home</h1>
        <Outlet/>
          <img src={laboratory} />
          {/* <img src="https://via.placeholder.com/550X350" /> */}
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    );
};

export default Home;