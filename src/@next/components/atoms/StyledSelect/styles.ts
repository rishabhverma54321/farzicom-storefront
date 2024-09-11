import { styled } from "@styles/themes";
import { Field } from "formik";

export const StlyedSelectField = styled(Field)`
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
  padding: 5px;
  outline: none;
  text-decoration: none;
  height: 30px;
  margin-top: 15px;
  background-color: white;
`;

export const StlyedSelectFieldNormal = styled.select`
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
  padding: 5px;
  outline: none;
  text-decoration: none;
  height: 30px;
  margin-top: 15px;
  background-color: white;
`;
