import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from "js-cookie";

import {LoginContainer, FormContainer, FormTitle, Label, Input, Button, ButtonContainer} from './StyledComponents'
const SignUpSpan = styled.span`
color: green;
cursor: pointer;
`

const LoginPage = () => {
   const history = useHistory() 
  const [loginData, setLoginData] = useState({username: '', password: ''});
  const [error, setError] = useState('')
  
 const onChangeInput = (event) => {
    setLoginData({
    ...loginData, [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch("https://dev-daily-dairy-logs-server.onrender.com/api/login", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(loginData)})
      
      const data = await response.json();
      if (response.ok) {
      localStorage.setItem("userId", data.user._id);
      
      Cookies.set("jwt_token", data.token, {expires: 1});
        console.log(Cookies.get("jwt_token"));
      alert("Login Successful");
        history.replace("/home");
      } else {
        setError(data.error);
      }
    } catch(error) {
        console.error("Error:", error);
    }
  };

  return (
    <LoginContainer>
      <FormContainer>
        <FormTitle>Login</FormTitle>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            value={loginData.username}
            name="username"
            onChange={onChangeInput}
          />

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={loginData.password}
            name="password"
            onChange={onChangeInput}
          />
          <ButtonContainer>
          <Button type="submit">Login</Button>
          </ButtonContainer>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p>Not a Member? <SignUpSpan onClick={() => {history.push('/signup')}}>Signup Now!</SignUpSpan></p>
        </form>
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginPage;