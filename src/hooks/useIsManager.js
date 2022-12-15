import { workersID } from "../asstes/workers-ID-Numbers"
import { useRef } from "react"
export const useISManager = ()=>{
  const initObj = {
   manager:false,
   HPLC:false,
   WET:false,
   GC:false,
   supervisor:false 
  }  
  const position = useRef({});
  const manager = (employeeNum) => {
    const findManager = workersID.find((num) => num === employeeNum);
    position.current=initObj
  switch (findManager) {
    case "000000":
    case "100000":
    return position.current={...position.current,manager:true}
    case "111111":
    case "222222":
    case "333333":
    return   position.current = { ...position.current,HPLC: true };
    case "444444":
    case "555555":
    case "666666":
    return   position.current = { ...position.current,WET: true };
    case "777777":
    case "888888":
    return   position.current = { ...position.current,GC: true };
    case "999999":
    case "123123":
    return (position.current = { ...position.current, supervisor:true });    
    default:
    return (position.current = initObj);
          }
        };
return{ manager,position }
}