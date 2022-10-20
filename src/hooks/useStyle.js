import { useState } from "react"
export const useStyle = ()=>{
const [openDatabaseNavState,setOpenDatabaseNavState] =useState(false)
const openDatabaseNavbar =()=>{
    setOpenDatabaseNavState(true)
}
return { openDatabaseNavbar, openDatabaseNavState };
}