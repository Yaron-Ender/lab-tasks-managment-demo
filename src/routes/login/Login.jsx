import { useState } from "react";   
import Button from "../../component/button/button";
import FormInput from "../../component/input/input.comp";
import { useLogin } from "../../hooks/useLogin";
const Login = () => {
const { login,isPending,error } = useLogin();
  const defaultInput = {
    email:"",
    employeeNumber:"",
    password: "",
  };
  const [inputFields, setInputFields] = useState(defaultInput);
  const { employeeNumber, email, password } = inputFields;
  const handleInput =(e)=>{
     const{name,value}=e.target
     setInputFields(prev=>({...prev,[name]:value}))
  }
  const handleSubmit = (e)=>{
  e.preventDefault()
  login(email,password,employeeNumber)
  setInputFields(defaultInput)
  }
    return (
      <div className="login-container">
        <h2>log in</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <FormInput
            id="email"
            label="email"
            type="email"
            name="email"
            value={email}
            onChange={handleInput}
            required
          />
          <FormInput
            id="Employee Number"
            label="Employee Number"
            type="number"
            name="employeeNumber"
            value={employeeNumber}
            onChange={handleInput}
            required
          />
          <FormInput
            id="password"
            label="password"
            type="password"
            name="password"
            value={password}
            onChange={handleInput}
            required
          />
          <p>
            forgot password ? click <span>here</span>
          </p>
          {!isPending && <Button children="Login" buttontype="login" />}
          {isPending && (
            <Button
              disabled={"disabled"}
              children="loading..."
              buttontype="login"
            />
          )}
          {error && <p>{error}</p>}
        </form>
      </div>
    );
};

export default Login;