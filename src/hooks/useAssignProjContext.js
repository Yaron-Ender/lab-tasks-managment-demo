import { AssignProjContext } from "../context/AssignProjContext";
import { useContext } from "react";
export const useAssignProjContext = ()=>{
const context = useContext(AssignProjContext)
if(!context){
 throw new Error(
   "useAssignProjContext must be inside an AssignProjContextProvider"
 );
}
return context
}