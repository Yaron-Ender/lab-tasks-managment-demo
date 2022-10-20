
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuthContext } from "./useAuthContext";
export const useLogin =()=>{
const { dispatch } = useAuthContext()
const [isPending,setIspending]=useState(null);
const [error,setError]=useState(false)
const login=async(email,password,employeeNum)=>{
    setError(false)
   setIspending(true)
   try{
   const {user} = await signInWithEmailAndPassword(auth,email,password)
 if(!user)return
 dispatch({ type:"LOGIN",payload:{user, employeeNum}});
 setError(false);
 setIspending(null);
   }catch(err){
  setIspending(null);
  setError(err.message);
   }
}
return{login,isPending,error}
}