import { createContext } from "react";
import { useReducer } from "react";
export const MonoGraphContext = createContext();

const initObj={
 HPLC:['ass','imp'],
 WET:['kf','ir'],
 GC:[]
}
const monoReducer=(state,action)=>{

}

export const MonoGraphContextProvider=({children})=>{
    const [state,dispatch]=useReducer(monoReducer,initObj)
 return(
  <MonoGraphContext.Provider value={{...state,dispatch}}>
{children}
  </MonoGraphContext.Provider>
    )
}

