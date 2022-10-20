import { useEffect } from "react";
const Button = ({children,...otherProps}) => {

useEffect(()=>{

},[])
    const{buttontype}= {...otherProps}
    let btnStyle = {
      login: "login",
      substance: "substance",
      createSubstance:"create-Substance",
      addTest: "add-test-btn",
      openTextarea:'open-textarea-btn'
    };

    return (
      <button
      {...otherProps}
      className={`btn ${btnStyle[buttontype]}`}
      >
        {children}
      </button>
    );
};

export default Button;