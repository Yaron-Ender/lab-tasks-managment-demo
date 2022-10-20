import './App.scss';
import { Routes,Route,useNavigate} from "react-router-dom";
import Navbar from './routes/navbar/navbar';
import Home from './routes/home/home';
import Database from './routes/database/database';
import Workers from './routes/workers/workers';
import Arragment from './routes/work-arragment/Arragment';
import { useAuthContext } from'./hooks/useAuthContext';
import {useEffect} from 'react';
function App() {
   const navigate = useNavigate();
const { user,AuthIsReady,manager }=useAuthContext()
useEffect(()=>{
  (user) ? navigate("/") : navigate("home/*");
},[user])
return (
  <div className="App">
    {AuthIsReady && (
      <>
        {user && (
          <Routes>
            <Route path="/" element={<Navbar />}>
               <Route index  element={<Arragment />} />
           
              <Route path="/database/*" element=
              {<Database />}
              />
            
              <Route path="workers" element={<Workers />} />
            </Route>
          </Routes>
        )}
        {!user && (
          <Routes>
            <Route path="/home/*" element={<Home />} />
          </Routes>
        )}
      </>
    )}
  </div>
);
}

export default App;

