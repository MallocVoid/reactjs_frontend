import React from "react";
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Login({ setToken }) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginUsernameChange = (event) => {
    setLoginUsername(event.target.value);
  }
  const handleRegisterUsernameChange = (event) => {
    setRegisterUsername(event.target.value);
  }
  const handleLoginPasswordChange = (event) => {
    setLoginPassword(event.target.value);
  }
  const handleRegisterPasswordChange = (event) => {
    setRegisterPassword(event.target.value);
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    axios.post("http://127.0.0.1:3001/login",
      `{ "username": "${loginUsername}", "userpassword": "${loginPassword}" }`,
      { headers: { 'Content-Type': 'application/json' } })
      .then(({ data }) => {
        console.log(data);
        setToken(data);
        navigate("/");
      });

  };
  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    axios.post("http://127.0.0.1:3001/register",
      `{ "username": "${registerUsername}", "userpassword": "${registerPassword}" }`,
      { headers: { 'Content-Type': 'application/json' } })
      .then(({ data }) => {
        console.log(data);
        setToken(data);
        navigate("/");
      });

    

  };

  return (
    <div>
      <div className="LoginBox">
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="login" title="Login">
            <form onSubmit={handleLoginSubmit}>
              <div className="UserLogin">
                <label htmlFor="userName" className="control-Element">
                  Username
                </label>
                <input type="text" id="loginUserName" onChange={handleLoginUsernameChange} />
              </div>
              <div className="UserLogin">
                <label htmlFor="userpassword" className="control-Element">
                  Password
                </label>
                <input type="password" className="login-control" id="loginUserpassword" onChange={handleLoginPasswordChange} />
              </div>
              <input type="submit" className="submitLogin" value="Login" />
            </form>
          </Tab>
          <Tab eventKey="register" title="Register">
          <form onSubmit={handleRegisterSubmit}>
              <div className="UserLogin">
                <label htmlFor="userName" className="control-Element">
                  Username
                </label>
                <input type="text" id="registerUserName" onChange={handleRegisterUsernameChange} />
              </div>
              <div className="UserLogin">
                <label htmlFor="userpassword" className="control-Element">
                  Password
                </label>
                <input type="password" className="login-control" id="registerUserpassword" onChange={handleRegisterPasswordChange} />
              </div>
              <input type="submit" className="submitLogin" value="Login" />
            </form>
          </Tab>
        </Tabs>
        <div className="clear" />
      </div >
    </div >
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default Login;
