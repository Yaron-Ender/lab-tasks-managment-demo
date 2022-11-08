import { useState } from 'react'
import { auth,db,storage } from '../firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc,setDoc, getDoc } from "firebase/firestore";
import { ref,getDownloadURL } from "firebase/storage";
import { useAuthContext } from './useAuthContext';
export const useSignup = ()=>{
    const { dispatch } = useAuthContext()
const [error, setError] = useState(null);
const [isPending, setIsPending] = useState(false);
 const signup = async(email,password,userName,employeeNum,position)=>
 {
  setIsPending(true)
  setError(null)
 try{
 const { user } = await createUserWithEmailAndPassword(auth, email, password);
 if(!user){
     throw new Error('"could not complete sinup"');
 }

 //download the user profile img from storage firestore
 const photoRef =  ref(storage,`profile-image/${employeeNum}.jpg`);
 const photoURL = await getDownloadURL(photoRef);
 //update the user obj
 await updateProfile(user,{displayName:userName,photoURL})
 
 //creat users collection
 const docRef = doc(db,'users',user.uid)
 const getDocument =await getDoc(docRef)
 if(!getDocument.exists()){
   await setDoc(docRef,{id:user.uid,userName,photoURL,employeeNum,assignments:[],position:position.current})
 }
 //update AuthContext
 dispatch({ type: "LOGIN", payload:{user,employeeNum,position}});
 
 setIsPending(false);
 setError(null);
 }catch(err){
setIsPending(false);
if (err.code === "auth/email-already-in-use"){
    setError("email already in use");
}else{
     setError("error, email or password are not valid");
     console.log(err.message)
}
 }
 }
 return { error,isPending,signup }
}