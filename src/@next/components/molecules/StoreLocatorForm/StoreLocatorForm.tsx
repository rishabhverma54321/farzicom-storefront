import { Button } from "@components/atoms/Button";
import { StyledSelect } from "@components/atoms/StyledSelect";
import { RowWithThreeCells } from "@components/organisms/AddressForm/styles";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import * as S from "./style";

export interface IStoreLocatorFormProps {}
export interface IFormData {
  state: string;
  address: string;
  area: string;
}

const options = [
  { value: "", lable: "Select", __typename: "StateDisplay" },
  { value: "Red", lable: "Red", __typename: "StateDisplay" },
  { value: "Blue", lable: "Blue", __typename: "StateDisplay" },
  { value: "Yellow", lable: "Yellow", __typename: "StateDisplay" },
  { value: "Green", lable: "Green", __typename: "StateDisplay" },
];

const validationSchema = Yup.object().shape({
  state: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  area: Yup.string().required("Required"),
});

export const StoreLocatorForm: React.FC<IStoreLocatorFormProps> = () => {
  const handleSubmit = (values: IFormData) => {
    //
  };
  return (
    <>
      <Formik
        initialValues={{
          state: "",
          address: "",
          area: "",
        }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, handleBlur, handleChange }) => {
          return (
            <Form>
              <S.Wrapper>
                <RowWithThreeCells>
                  <StyledSelect name="state" options={options} />
                  <StyledSelect name="address" options={options} />
                  <StyledSelect name="area" options={options} />
                </RowWithThreeCells>
                <S.ButtonWrapper>
                  <Button
                    testingContext="submitStoreLocator"
                    size="sm"
                    type="submit"
                  >
                    {" "}
                    Submit{" "}
                  </Button>
                </S.ButtonWrapper>
              </S.Wrapper>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
StoreLocatorForm.displayName = "StoreLocatorForm";
export default StoreLocatorForm;
