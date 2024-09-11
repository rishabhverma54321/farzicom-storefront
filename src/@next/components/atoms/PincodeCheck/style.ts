import { styled } from "@styles/themes";

export const Div = styled.div`
  display: flex;
  margin: 30px 0;
  align-items: center;
  justify-content: space-between;
  min-width: 320px;
  max-width: 400px;
  width: 60%;
  > input {
    border: none;
    border-bottom: 1px solid black;
    padding: 0;
    height: 30px;
    width: 50%;
    min-width: 60px;
  }
  > button {
    padidng: 0;
  }
`;

export const Input = styled.input`
  text-decoration: none;
  border: none;
  border-bottom: 1px solid black;
  padding: 5px;
  height: 30px;
  outline: none;
  width: 100%;
`;
