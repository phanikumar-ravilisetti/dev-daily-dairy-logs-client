import styled, { css } from "styled-components";

export const PageContainer = styled.div`
  max-width: 720px;
  margin: 24px auto;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
  border: 1px solid #eee;
  width: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const FormContainer = styled.div`
width: 400px;
margin: 25px 0 25px;
`;

export const Title = styled.h2`
  margin: 0 0 16px;
  color: #222;
  font-size: 22px;
  font-weight: 700;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #444;
`;

export const sharedInput = css`
  padding: 10px 12px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  background: #fafafa;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: #6a5acd;
    background: #fff;
  }
`;

export const Input = styled.input`
  ${sharedInput}
  height: 40px;
`;

export const Textarea = styled.textarea`
  ${sharedInput}
  resize: vertical;
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

export const Button = styled.button`
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  ${(props) => 
    props.variant === "secondary"
      ? css`
          background-color: #ffffff;
          `
          : css`
          background-color: green;
          `  
          }
`;

export const ErrorText = styled.p`
  color: #c0392b;
  background: #fdecea;
  border: 1px solid #f5c6cb;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 13px;
`;
