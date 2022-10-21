import { workersID } from "../asstes/workers-ID-Numbers"
import { useState } from "react"
export const useISManager = ()=>{  
  const [isManager,setIsManager] = useState(null);
  const manager = (employeeNum) => {
    const findManager = workersID.find((num) => num === employeeNum);
  console.log(findManager)
    switch (findManager) {
      case "000000":
      case "123123":
        return setIsManager(true);
      default:
        setIsManager(false);
    }
  };
return{ isManager,manager }
}