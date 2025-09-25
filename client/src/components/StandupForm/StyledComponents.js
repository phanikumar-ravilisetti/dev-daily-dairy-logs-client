import styled, {css} from "styled-components";

export const StandupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f7fa;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const FormContainer2 = styled.div`
width: 400px;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

export const Label = styled.label`
  display: block;
  margin-top: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #444;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
  }
`;

export const ButtonContainer = styled.div`
display: flex;
justify-content: end;
`;

export const Button = styled.button`
  width: 110px;
  align-self: center;
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  ${(props) =>
    props.variant === "primary" ?
      css`
      background-color: #ffffff;`
      : css`
        background-color: green;
        color: #ffffff;
        margin-left: 12px;`
  }

  &:hover {
    background: #0056b3;
    color: #ffffff;
  }
`;
