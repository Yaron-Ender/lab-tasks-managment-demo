import './App.scss';
import {useEffect} from 'react';
import { Routes,Route,useNavigate} from "react-router-dom";
import Navbar from './routes/navbar/navbar';
import Home from './routes/home/home';
import Database from './routes/database/database';
import Workers from './routes/workers/workers';
import Assignment from './routes/dashboard/Assignment';
import Welcome from './routes/welcome/welcome';
import { useAuthContext } from'./hooks/useAuthContext';
function App() {
const navigate = useNavigate();
const { user,AuthIsReady}=useAuthContext()
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
    {/* <Route path="/" element={<Navigate to="/Assignment "/>} /> */}
    <Route index  path='/' element={<Welcome />} />
    <Route path='/*' element={<Assignment />} />
    <Route path="/database/*" element={<Database />} />
    <Route path="/workers/*" element={<Workers />} />
  </Route>
  </Routes>
)}
{/* {user

} */}
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

