import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../Button";
import * as S from "./style";
import LocationPin from "../../../../images/locationPin.png";

export interface IPincodeCheckProps {}

const pincodeValidationSchema = Yup.object({
  pincode: Yup.number().required("Please enter 6 digits in pincode").positive(),
  // .test("len", "Please enter 6 digits in pincode", (val) => {
  //   if (val) return val.toString().length === 6;
  // }),
});
export const PincodeCheck: React.FC<IPincodeCheckProps> = () => {
  return (
    <>
      <Formik
        initialValues={{ pincode: "" }}
        onSubmit={values => {
          //
        }}
        validationSchema={pincodeValidationSchema}
      >
        <Form>
          <S.Div>
            <img src={LocationPin} width="64px" height="64px" alt="location" />
            <Field name="pincode" type="text" placeholder="Enter Pincode" />
            <Button
              testingContext="Check Pincode"
              type="submit"
              color="tertiary"
              size="none"
            >
              Check
            </Button>
          </S.Div>
          <ErrorMessage name="pincode" />
        </Form>
      </Formik>
    </>
  );
};
PincodeCheck.displayName = "PincodeCheck";
export default PincodeCheck;
