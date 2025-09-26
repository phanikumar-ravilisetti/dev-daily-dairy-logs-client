import {useState} from 'react'
import {useHistory} from 'react-router-dom'

import {SignupContainer, FormContainer, Title, Label, Input, Button, ButtonContainer} from './StyledComponents'

const SignupPage = () => {
    const history = useHistory()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setemailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setconfirmPasswordError] = useState('')

  const handleChange = (event) => {
    setFormData({
      ...formData, 
      [event.target.name]: event.target.value
    });
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{5,}$/.test(username);
    if (!usernameRegex) {
        if (username.length < 5) {
            setUsernameError("Username must be at least 5 characters long")
            return false
        }
        if (!(/^[a-zA-Z0-9]+$/.test(username))){
            setUsernameError("Only letters and numbers allowed")
            return false
        }
    } else {
        setUsernameError('');
        return true
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailRegex) {
        setemailError('Invalid Email')
        return false;
    } else {
        setemailError('')
        return true;
    }
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
    if (!passwordRegex) {
        setPasswordError('Invalid Password')
        return false 
    } else {
        setPasswordError('')
        return true
    }
  }

  const validateConfirmPassword = (confirmPassword) => {
    if (formData.password === confirmPassword) {
        setconfirmPasswordError('')
        return true;
    } else {
        setconfirmPasswordError('Password not Matched');
        return false;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newUser;
    if (validateUsername(formData.name) && validateEmail(formData.email) && validatePassword(formData.password) && validateConfirmPassword(formData.confirmPassword)) {
         newUser = {
            username: formData.name,
            email: formData.email,
            password: formData.password
        }

         try {
      const response = await fetch("https://dev-daily-dairy-logs-server.onrender.com/api/users",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      const data = await response.json();
      if (response.ok) {
        alert("User Registered Successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }

        setFormData({
            name: '', email: '', password: '', confirmPassword: ''
        })
        history.replace('/login')
    }
  };

  return (
    <SignupContainer>
      <FormContainer>
        <Title>Sign Up</Title>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
            {usernameError && <p>{usernameError}</p>}
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {emailError && <p>{emailError}</p>}

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {passwordError && <p>{passwordError}</p>}

          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {confirmPasswordError && <p>{confirmPasswordError}</p>}
            <ButtonContainer>
          <Button type="submit" variant="primary">Sign Up</Button>
          <Button type="button" onClick={() => {history.push("/login")}}>Login</Button>
          </ButtonContainer>
        </form>
      </FormContainer>
    </SignupContainer>
  );
};

export default SignupPage;

