import { createContext,useReducer } from "react";
export const AssignProjContext = createContext();

const monoReducer=(state,action)=>{
  const { payload }= action;

switch(action.type){
case 'PROJECT_NAME':
return {...state,projectName:payload};
case 'MONO_TITLE':
return { ...state,projMonographs:[...state.projMonographs,payload]};
case 'MONO_FIELDS':
return{ ...state,projMonographs:{...payload}};
case 'UPDATE_COMMENTS':

case 'BUILD':
state.builsObj();
default:
  return state;
}
}
const initObj={
obj:{},
projectName:'',
comments:'',
projMonographs:[],
projMonoFields:{},
builsObj(){
// console.log(this.projectName,this.projMonographs);
this.projMonographs.forEach((mono)=>{
mono:{}
}) 
}
}

export const AssignProjContextProvider=({children})=>{
  const [state,dispatch]=useReducer(monoReducer,initObj)
 return(
  <AssignProjContext.Provider value={{...state,dispatch}}>
{children}
  </AssignProjContext.Provider>
    )
}

