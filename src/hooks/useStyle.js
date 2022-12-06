import { useState } from "react"
export const useStyle = ()=>{
const [openDatabaseNavState,setOpenDatabaseNavState] =useState(false)
const openDatabaseNavbar =()=>{
    setOpenDatabaseNavState(true)
}
const selectStyle = {
  control: (styles, state) => ({
    ...styles,
    width: "calc(100% + 5rem)",
    fontSize: "2rem",
    padding:'0rem 3rem',
    margin:0,
    borderColor: state.isFocused ? "green" : "",
    border: "0.5px solid #222",
    boxShadow: "none",
    backgroundColor: state.isFocused ? "" : "",
  }),
  // ValueContain:(style)=>({...style,width:'100%'}),
  placeholder: (styles) => ({
    ...styles,
    color: "$nav-color-light",
  }),
  option: (styles, { data, isFocused, isDisable, isSelected }) => {
    return {
      ...styles,
      fontSize: isFocused ? "2.4rem" : "2rem",
      color: isFocused ? "#fff" : data.color,
      backgroundColor: isFocused ? "#9c88ff" : "#fff;",
      boxShadow:isFocused?'inset -0.5rem -1rem 0.5rem -1rem rgba(0,0,0,0.7)':''
    };
  },
dropdownIndicator: (style) => {
return { width: "calc(100% + 5rem)" };
},
};

return { openDatabaseNavbar, openDatabaseNavState,selectStyle };
}