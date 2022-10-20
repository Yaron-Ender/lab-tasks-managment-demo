
const FormInput = ({...otherProps}) => {
 const{label} = otherProps

  return (
    <div className="input-unit">
      <input className="form-input" {...otherProps}
      />
      <label htmlFor={label} className={`${otherProps.value ? "shrink" : ""}`}>
        {label}
      </label>
    </div>
  );
};

export default FormInput;