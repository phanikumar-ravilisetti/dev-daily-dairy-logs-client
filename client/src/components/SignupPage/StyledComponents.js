import styled, {css} from 'styled-components'

export const SignupContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eef2f7;
`;

export const FormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  width: 350px;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
`;

export const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ButtonContainer = styled.div`
width: 100%;
display: flex;
justify-content: center;
`

export const Button = styled.button`
  width: 90px;
  padding: 10px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  ${(props) => 
    props.variant === "primary" ?
      css`
        margin-right: 12px;
        background-color: #4cafef;
        color: white;
        `
        : 
      css`
        background-color: #ffffff;
        border: 1px solid black;
        `  
  }

  &:hover {
    background-color: green;
    color: white;
  }
`;

