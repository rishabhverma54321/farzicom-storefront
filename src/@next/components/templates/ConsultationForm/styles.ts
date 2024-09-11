import { styled } from "@styles/themes";

export const Wrapper = styled.div``;

export const FormContainer = styled.div`
  max-width: 500px;
  margin: auto;
  text-align: center;
  box-shadow: 0px 1px 6px #00000029;
  border-radius: 6px;
  background-color: white;
  padding: 20px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 8px 16px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #b3b3b3;
  outline: none;
  text-decoration: none;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    border: 1px solid #b3b3b3 !important;
  }
`;

export const Textarea = styled.textarea`
  outline: none;
  text-decoration: none;
  padding: 16px;
`;

export const Select = styled.select`
  padding: 8px 16px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #b3b3b3 !important;
  outline: none;
  -webkit-text-decoration: none;
  text-decoration: none;
  color: #5f6a7d;
  background-color: white !important;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px;
  background-color: green;
  color: white;
  border-radius: 4px;
`;

export const ResetButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: white;
  border: 1px solid #69df7a;
  color: #69df7a;
`;
