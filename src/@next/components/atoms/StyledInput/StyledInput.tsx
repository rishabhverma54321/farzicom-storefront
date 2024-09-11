import { Field } from "formik";
import { styled } from "@styles/themes";

export const StyledInput = styled(Field)`
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  background-color: white;
  margin-top: 20px;
  text-decoration: none;
  outline: none;
  font-size: 1rem;
`;

export const StyledInputReview = styled(Field)`
  width: 100%;
  border: 1px solid #ccc;
  padding: 0.5rem;
  background-color: white;
  text-decoration: none;
  outline: none;
  font-size: 1.1rem;
  ${({ updateStyle }) =>
    updateStyle &&
    `
      font-family: CocoSharp XL !important;
      width: 100%;
      padding: 0.5rem;
      text-decoration: none;
      outline: none;
      font-size: 1.1rem;
      background: #FFFFFF;
      border: 1px solid #E7E7E7;
      border-radius: 8px;
      font-family: 'CocoSharp XL';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      color: #000;
      &::placeholder{
        color: #808080;

      }
      &::-moz-placeholder{
        color: #808080;
      }
    `}
`;

export const StyledInputNormal = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  background-color: white;
  margin-top: 20px;
  text-decoration: none;
  outline: none;
  font-size: 1rem;
`;
