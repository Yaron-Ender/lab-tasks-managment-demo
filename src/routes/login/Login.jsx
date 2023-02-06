import { useState,useEffect } from "react";   
import Button from "../../component/button/button";
import FormInput from "../../component/input/input.comp";
import { useLogin } from "../../hooks/useLogin";
import { workersID } from "../../asstes/workers-ID-Numbers";
import { useISManager } from "../../hooks/useIsManager";
const Login = () => {
const { login,isPending,error } = useLogin();
const { manager,position } = useISManager();
  const defaultInput = {
    email:"",
    employeeNumber:"",
    password: "",
  };
   const [employeeNum, setEmployeeNum] = useState(null);
  const [inputFields, setInputFields] = useState(defaultInput);
  const { employeeNumber, email, password } = inputFields;
 useEffect(()=>{
   if(employeeNumber.length===6){
    setEmployeeNum(prev=>(prev=workersID.find(num => num==employeeNumber)))
    manager(employeeNum)
}
},[employeeNumber,position,password])
const handleInput =(e)=>{
  const{name,value}=e.target
  setInputFields(prev=>({...prev,[name]:value}))
}
const handleSubmit = (e)=>{
  e.preventDefault()
  login(email,password,employeeNumber,position)
  setInputFields(defaultInput)
  }
  const handleDemoSubmision =(e)=>{
  const id = e.target.id
  switch(id){
  case 'manager':
  login('yona@y.com','123123','100000',position); 
  break;
  case 'worker':
  login('lisa@l.com','123123','222222',position);
  break;
  case 'supervisor':
  login('brad@b.com','123123','999999',position);
  break;
  default:
  return
  }
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
          {!isPending && <Button id='manager' type='button' onClick={handleDemoSubmision} children="Login As Manager" buttontype="login" />}
          {!isPending && <Button id='supervisor' type='button' onClick={handleDemoSubmision} children="Login As Supervisor" buttontype="login" />}
          {!isPending && <Button id='worker' type='button' onClick={handleDemoSubmision}  children="Login As HPLC Worker" buttontype="login" />}
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