import { createContext,useReducer,useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from '../firebase/firebase'
export const AuthContext=  createContext()

const authReducer =(state,action)=>{
    const {type,payload}=action
    switch(type){
       case 'LOGIN':
    return {...state,user:payload.user,employeeNum:payload.employeeNum,
      position:payload.position.current};
    case 'AUTH_IS_READY':
      return { ...state,AuthIsReady:true, user: payload };
   case 'LOGOUT':
      return{...state,user:null}
    default:
        return state
 }
}

export const AuthContextProvider=({children})=>{
 const[state,dispatch]=useReducer(authReducer,{
    user:null,
    AuthIsReady:null,
    employeeNum:null,
    position:null
 })
  useEffect(()=>{
  const unsub = onAuthStateChanged(auth,(user)=>{
 dispatch({ type: "AUTH_IS_READY", payload: user });
 //cleanup function
 return unsub();
  })
},[dispatch])
    return(
 <AuthContext.Provider value={{...state,dispatch}}>
    {children}
 </AuthContext.Provider>
    )
}