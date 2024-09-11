import React from "react";
import pick from "lodash/pick";
import { Formik } from "formik";

import { IAddressWithEmailAndTypes } from "@types";
import * as Yup from "yup";
// @ts-ignore
import { CLIENT } from "Themes/config";

import {
  AddressTypes,
  useCheckout,
  useAuthState,
  useCheckoutState,
} from "@saleor/sdk";
// import { IAddressWithEmailAndTypes } from "@types/IAddressWithEmailAndTypes";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { LotusAddressFormContent } from "./LotusAddressFormContent";
import { AddressFormContent } from "./AddressFormContent";
import { IProps } from "./types";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";
import { PlixAddressFormContent } from "./PlixAddressFormContent";

const ADDRESS_FIELDS = [
  "city",
  "companyName",
  "countryArea",
  "firstName",
  "lastName",
  "country",
  "phone",
  "postalCode",
  "streetAddress1",
  "streetAddress2",
  "email",
];
const phoneRegex = /^[0-9]{10}$/;
const pincodeRegex = /^[0-9]{6}$/;
const nameRegex = /^[A-Za-z]+$/;
const namelengthRegex = /^[A-Za-z]{2}/;
const emptyStringRegex = /^(?!\s*$).+/;

const addressSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Required")
    .matches(nameRegex, "Name can only contain alphabets without spaces")
    .matches(namelengthRegex, "Minimum 2 characters are required"),
  lastName: Yup.string()
    .required("Required")
    .matches(nameRegex, "Name can only contain alphabets without spaces")
    .matches(namelengthRegex, "Minimum 2 characters are required"),
  email: Yup.string().email("Please enter valid email").required("Required"),
  phone: Yup.string()
    .required("Required")
    .matches(phoneRegex, "Please enter 10 digits"),
  city: Yup.string()
    .required("Required")
    .matches(emptyStringRegex, "Cannot be empty"),
  countryArea: Yup.string()
    .required("Required")
    .matches(emptyStringRegex, "Cannot be empty"),
  postalCode: Yup.string()
    .required("Required")
    .matches(pincodeRegex, "Please enter 6 digits"),

  streetAddress1: Yup.string()
    .required("Required")
    .matches(emptyStringRegex, "Cannot be empty"),
  country: Yup.string().default("India"),
});

export const AddressForm: React.FC<IProps> = React.memo(
  ({
    // address,
    handleSubmit,
    formId,
    defaultValue,
    countriesOptions,
    ...props
  }: IProps) => {
    const { checkout } = useCheckoutState();

    const { user } = useAuthState();

    let addressWithPickedFields: Partial<IAddressWithEmailAndTypes> = {
      city: "",
      companyName: "",
      countryArea:
        CLIENT === "lotus-new" || CLIENT === "lotus-stage" ? "" : "State",
      firstName: "",
      lastName: "",
      country: {
        code: "",
        country: "",
      },
      phone: "",
      postalCode: "",
      streetAddress1: "",
      streetAddress2: "",
      email: "",
      type: AddressTypes?.HOME,
      // addressLabel: ""
    };
    // debugger;
    //

    if (checkout?.email !== "dummy@dummy.com") {
      let selectedAddress;
      try {
        selectedAddress = JSON.parse(localStorage.getItem("selectedAddress")!);
      } catch (e) {
        //
      }
      // addressWithPickedFields = pick(
      //   selectedAddress,
      //   ADDRESS_FIELDS
      // );

      if (addressWithPickedFields?.phone?.length! > 10) {
        addressWithPickedFields.phone = addressWithPickedFields?.phone?.slice(
          3
        );
      }
      addressWithPickedFields = {
        ...addressWithPickedFields,
        email: checkout?.email?.toString().includes("@example.com")
          ? // @ts-ignore
            user?.metadata.filter(meta => meta?.key === "alt_email")[0]
              ?.value || ""
          : checkout?.email,
        type: AddressTypes?.HOME,
      };
    }

    const { setValue } = useLocalStorage("email");

    return (
      <Formik
        initialValues={addressWithPickedFields}
        validationSchema={addressSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          //
          // debugger;
          //
          setValue(values.email);
          if (handleSubmit) {
            // debugger;
            handleSubmit({ ...values });
          }
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          setFieldValue,
          setFieldTouched,
          errors,
          touched,
          validateForm,
          setValues,
          // isValid,
          submitCount,
        }) => {
          if (
            CLIENT === "lotus-new" ||
            CLIENT === "lotus-stage" ||
            CLIENT == clients.WOW_HEALTH_NEW ||
            CLIENT === clients.WOWFC_NEW ||
            CLIENT === clients.BUY_WOW
          ) {
            return (
              <LotusAddressFormContent
                {...{
                  countriesOptions,
                  defaultValue,
                  formId,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldTouched,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                  validateForm,
                  setValues,
                  // isValid
                  submitCount,
                }}
                {...props}
              />
            );
          }
          if (CLIENT === clients.PLIXLIFEFC || CLIENT === clients.BODY_FIRST) {
            return (
              <PlixAddressFormContent
                {...{
                  countriesOptions,
                  defaultValue,
                  formId,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldTouched,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                  validateForm,
                  setValues,
                  // isValid
                  submitCount,
                }}
                {...props}
              />
            );
          }
          return (
            <AddressFormContent
              {...{
                countriesOptions,
                defaultValue,
                formId,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldTouched,
                setFieldValue,
                values,
                errors,
                touched,
                validateForm,
                setValues,
                // isValid
                submitCount,
              }}
              {...props}
            />
          );
        }}
      </Formik>
    );
  }
);
