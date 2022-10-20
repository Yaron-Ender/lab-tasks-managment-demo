import { useState } from "react";
import { auth } from "../firebase/firebase"
import { signOut } from "firebase/auth"
import { useAuthContext } from "./useAuthContext"
export const useLogout =()=>{
const [error, setError] = useState(null);

 const{ dispatch } = useAuthContext()
    const logout=async()=>{
    setError(null);
    try{
   await signOut(auth)
    dispatch({type:"LOGOUT"})
      setError(null);
    }
    catch(err){
     console.log(err.message);
     setError(err.message);
    }
    }
return{logout,error}
}