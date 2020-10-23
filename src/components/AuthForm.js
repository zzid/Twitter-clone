import React, {useState}from 'react';
import { authService } from "../firebaseAPI";

const AuthForm = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ newAccount, setNewAccount ] = useState(false);
  const [ error, setError ] = useState("");
  const onChange = (event) =>{
    const {
        target: { name, value }
    } = event;
    if(name === "email"){
        setEmail(value);
    } else if(name==="password"){
        setPassword(value);
    }
  }
  const onSubmit = async (event) => {
      event.preventDefault(); // to customize event
      try {
          let data;
          if(newAccount) {
              data = await authService.createUserWithEmailAndPassword(
                  email, password
              )
          } else {
              data = await authService.signInWithEmailAndPassword(
                  email, password
              )
          }
          console.log(data)
      } catch(error) {
          console.log(error.message)
          setError(error.message);
      }
  };
  const toggleAccount = () => setNewAccount(prev=> !prev);
  return(
    <>
    <form onSubmit={onSubmit}>
      <input 
          name="email"
          type="email" 
          placeholder="Email" 
          value={email} 
          required
          onChange={onChange}
      />
      <input 
          name="password"
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={onChange}
          required
      />
      <input type="submit" value={ newAccount ? "Create Account": "Sign in" } />
      {error}
    </form>
    <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account" }</span>
    </>
  )
}

export default AuthForm;