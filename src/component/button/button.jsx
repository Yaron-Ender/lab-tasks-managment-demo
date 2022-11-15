import { useEffect } from "react";
const Button = ({...otherProps}) => {
  const{buttontype,children}= {...otherProps}

    let btnStyle = {
      login: "login",
      substance: "substance",
      createSubstance:"create-Substance",
      addTest: "add-test-btn",
      openTextarea:'open-textarea-btn',
      addProject:'addProject'
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