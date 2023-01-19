import { createContext,useReducer } from "react";

export const DeleteAssignmentIDContex = createContext();

const idReducer = (state, action) => {
switch(action.type){
case "EMPTY":
return { ...state };
case "UPDATE_ID":
return {...state,id:action.payload};
default:
return state;
}
};

export const IDProvider = ({ children }) => {
  const [state, dispatch] = useReducer(idReducer, {id:'shalom'});
  const passID = (id) => {
    if(id){
      dispatch({type:'UPDATE_ID',payload: id });
    }else{
      dispatch({type:'EMPTY'})
    }
  };
  return (
    <DeleteAssignmentIDContex.Provider value={{ state, passID,dispatch }}>
      {children}
    </DeleteAssignmentIDContex.Provider>
  );
};