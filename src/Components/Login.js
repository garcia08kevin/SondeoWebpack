import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CurrentUser } from '../Services/UserService';
import { loginUser } from '../Services/UserService';

export default function Login({ setToken }) {

    let [message, setMessage] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

  
    const handleSubmit = async e => {
      e.preventDefault();
      const token = await loginUser({
        email,
        password
      });
      if(!token.result){
        message = token.errors[0];        
        setMessage(message);
      }else{
        const userData = await CurrentUser(email)
        localStorage.setItem('name', JSON.stringify(userData.name));
        localStorage.setItem('lastname', JSON.stringify(userData.lastname));
        localStorage.setItem('role', JSON.stringify(userData.role));    
        setToken(token);
      }
    }
  
    return(
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
            <button type="submit">Submit</button>
            <p>{message}</p>
          </div>
        </form>        
      </div>
    )
  }
  
  Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };
