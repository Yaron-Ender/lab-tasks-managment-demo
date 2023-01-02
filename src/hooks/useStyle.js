import { useState } from "react"
export const useStyle = ()=>{
const [openDatabaseNavState,setOpenDatabaseNavState] =useState(false)
const openDatabaseNavbar =()=>{
    setOpenDatabaseNavState(true)
}
const selectCompDatabaseStyle = {
  control: (styles, state) => ({
    ...styles,
    width: "calc(100% + 5rem)",
    fontSize: "2rem",
    padding: "0rem 3rem",
    margin: 0,
    borderColor: state.isFocused ? "green" : "",
    border: "0.5px solid #222",
    boxShadow: "none",
    backgroundColor: state.isFocused ? "" : "",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "$nav-color-light",
  }),
  option: (styles, { data, isFocused,}) => {
    return {
      ...styles,
      fontSize: isFocused ? "2.4rem" : "2rem",
      color: isFocused ? "#fff" : data.color,
      backgroundColor: isFocused ? "#9c88ff" : "#fff;",
      boxShadow: isFocused
        ? "inset -0.5rem -1rem 0.5rem -1rem rgba(0,0,0,0.7)"
        : "",
    };
  },
  dropdownIndicator: () => {
    return { width: "calc(100% + 5rem)" };
  },
};
const selectCompCreateSunstanceStyle = {
  control: (styles) => {
    return {
      ...styles,
      fontSize: "2rem",
      width: "100%",
      backgroundColor: "",
    };
  },
  option: (styles, {isFocused}) => ({
    ...styles,
    fontSize: isFocused ? "2rem" : "1.5rem",
  }),
};
const selectCompSupervisor = {
  control: (styles, state) => ({
    ...styles,
    padding: "0rem",
    fontSize: state.isFocused ? "2rem" : "1rem",
    transition: "all .5s",
    border: "0",
    boxShadow: "none",
  }),
  option: (styles, state) => ({
    ...styles,
    fontSize: state.isFocused ? "1.3rem" : "1.5rem",
  }),
};
return {
  openDatabaseNavbar,
  openDatabaseNavState,
  selectCompDatabaseStyle,
  selectCompCreateSunstanceStyle,
  selectCompSupervisor,
};
}
