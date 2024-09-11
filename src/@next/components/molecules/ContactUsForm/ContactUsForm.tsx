import { Formik, Form } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { StyledInput } from "@components/atoms/StyledInput";
import { Button } from "@components/atoms/Button";
import { StyledSelect } from "@components/atoms/StyledSelect";

// import { mailUrl, phoneUrl } from "@components/templates";
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components";
import * as S from "./styles";
import { ButtonWrapper } from "../StoreLocatorForm/style";
import { TypedContactUsCreateMutation } from "./queries";
import { mailUrl, phoneUrl } from "@components/templates/PdfInvoiceTemplate";

export interface IContactUsFormProps {}

export const ContactUsForm: React.FC<IContactUsFormProps> = () => {
  const options = [
    { value: "", lable: "Type of Query", __typename: "queryType" },
    {
      value: "General/Product Enquiry",
      lable: "General/Product Enquiry",
      __typename: "queryType",
    },
    {
      value: "Export Enquiry",
      lable: "Export Enquiry",
      __typename: "queryType",
    },
    {
      value: "Institutional Enquiry",
      lable: "Institutional Enquiry",
      __typename: "queryType",
    },
    {
      value: "Order/Payment/Logistics Enquiry",
      lable: "Order/Payment/Logistics Enquiry",
      __typename: "queryType",
    },
    {
      value: "Dealer/Distribution Enquiry",
      lable: "Dealer/Distribution Enquiry",
      __typename: "queryType",
    },
    {
      value: "Product Complaint/Replacement",
      lable: "Product Complaint/Replacement",
      __typename: "queryType",
    },
  ];

  const phoneRegex = /^[0-9]{10}$/;

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    phone: Yup.string()
      .required("Please enter 10 digits in mobile")
      .matches(phoneRegex, "Please enter 10 digits in mobile"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter a valid email"),
    queryType: Yup.string().required("Please select a type of query"),
    message: Yup.string().required("Please write about your query"),
  });

  const { show } = useContext(OverlayContext);

  const [buttonText, setButtonText] = useState("Submit");

  return (
    <>
      <S.Container>
        <S.Text>
          Write to us at{" "}
          <a
            style={{ textDecoration: "underline", color: "blue" }}
            href={mailUrl}
          >
            care@lotus-organics.com
          </a>{" "}
          <br />
          OR
          <br />
          <a href={phoneUrl}>Call us at +91 8810685354</a>
        </S.Text>
        <TypedContactUsCreateMutation
          onCompleted={data => {
            setButtonText("Submit");

            let contactUsContext: InnerOverlayContextInterface;
            if (data.contactUsCreate?.contactUsErrors.length) {
              contactUsContext = {
                title: "Contact Us From Error Occured",
                status: "error",
                content: data.contactUsCreate?.contactUsErrors[0].message,
              };
              show(OverlayType.message, OverlayTheme.modal, contactUsContext);
            }
            if (data.contactUsCreate?.contactUs) {
              contactUsContext = {
                title: "Your query was successfully submitted!",
                status: "success",
                content: "Thank you for reaching out to us",
              };
              show(OverlayType.message, OverlayTheme.modal, contactUsContext);
            }
          }}
        >
          {mutation => {
            return (
              <Formik
                initialValues={{
                  name: "",
                  phone: "",
                  email: "",
                  queryType: "",
                  message: "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  setButtonText("Submitting...");
                  const res = await mutation({
                    variables: {
                      input: { ...values, phone: `+91${values.phone}` },
                    },
                  });
                  if (
                    res &&
                    !res.data?.contactUsCreate?.contactUsErrors.length &&
                    !res.errors?.length
                  ) {
                    resetForm();
                  }
                }}
                validationSchema={ValidationSchema}
              >
                {({ values, errors, touched }) => {
                  return (
                    <Form>
                      <S.FormContainer>
                        <StyledInput name="name" placeholder="Name" />
                        {errors.name && touched.name && (
                          <S.ErrorMessage>{errors.name}</S.ErrorMessage>
                        )}

                        <StyledInput name="phone" placeholder="Phone" />
                        {errors.phone && touched.phone && (
                          <S.ErrorMessage>{errors.phone}</S.ErrorMessage>
                        )}

                        <StyledInput name="email" placeholder="Email" />
                        {errors.email && touched.email && (
                          <S.ErrorMessage>{errors.email}</S.ErrorMessage>
                        )}

                        <StyledSelect name="queryType" options={options} />
                        {errors.queryType && touched.queryType && (
                          <S.ErrorMessage>{errors.queryType}</S.ErrorMessage>
                        )}

                        <StyledInput
                          name="message"
                          placeholder="Message"
                          component="textarea"
                          rows="6"
                        />
                        {errors.message && touched.message && (
                          <S.ErrorMessage>{errors.message}</S.ErrorMessage>
                        )}

                        <ButtonWrapper>
                          <Button testingContext="submitQuery" type="submit">
                            {buttonText}
                          </Button>
                        </ButtonWrapper>
                      </S.FormContainer>
                    </Form>
                  );
                }}
              </Formik>
            );
          }}
        </TypedContactUsCreateMutation>
      </S.Container>
    </>
  );
};
ContactUsForm.displayName = "ContactUsForm";
export default ContactUsForm;
