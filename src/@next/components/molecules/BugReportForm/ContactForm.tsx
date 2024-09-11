import React, { useContext, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MenuItem from "@mui/material";
import Radio from "@mui/material";
import RadioGroup from "@mui/material";
import FormControlLabel from "@mui/material";
import FormControl from "@mui/material";
import FormLabel from "@mui/material";
import InputLabel from "@mui/material";
import Select from "@mui/material";
import { Button } from "@components/atoms/Button";
import { StyledInput } from "@components/atoms/StyledInput";
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components";
import { CONTACT_US_OPTIONS } from "Themes/config";
import * as S from "./styles";
import { ButtonWrapper } from "../StoreLocatorForm/style";
import { TypedGenericFormCreateMutation } from "./queries";

type field = {
  name: string;
  type: string;
  placeholder: string;
  options: any[];
};
export interface IContactUsFormIkkaiProps {
  fields: fields[];
  title: string;
}


export const ContactForm: React.FC<IContactUsFormIkkaiProps> = ({
  fields,
  title,
}) => {
  const initialSubmitText = "Submit";
  const [submitBtnText, setSubmitBtnText] = useState(initialSubmitText);
  const { show } = useContext(OverlayContext);

  const phoneRegex = /([2-9])+([0-9]){9}/;

  const ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Please enter valid email")
      .required("Please enter a valid email"),
    phone: Yup.string()
      .required("Please enter 10 digits in mobile")
      .matches(phoneRegex, "Please enter valid mobile")
      .max(10, "Please enter 10 digits in mobile"),
    description: Yup.string().required("Please write about your query"),
  });

  return (
    <>
      <S.Container>
        <S.Heading>{title}</S.Heading>
        <TypedGenericFormCreateMutation
          onCompleted={data => {
            setSubmitBtnText(initialSubmitText);
            let contactUsContext: InnerOverlayContextInterface;
            if (data.genericFormCreate?.genericFormErrors.length) {
              contactUsContext = {
                status: "error",
                title: "Error",
                content: data.genericFormCreate?.genericFormErrors[0].message,
              };
              show(OverlayType.message, OverlayTheme.modal, contactUsContext);
            }
            if (data.genericFormCreate?.genericForm) {
              contactUsContext = {
                status: "success",
                title: "Submitted",
                content: <h4>Submitted successfully.</h4>,
              };
              show(OverlayType.message, OverlayTheme.modal, contactUsContext);
            }
          }}
        >
          {submit => {
            return (
              <Formik
                initialValues={{
                  name: "User",
                  phone: "",
                  email: "",
                  formName: title,
                  description: "",
                }}
                validationSchema={ValidationSchema}
                onSubmit={async (values, formikActions) => {
                  formikActions.setSubmitting(true);
                  setSubmitBtnText("Submitting...");
                  submit({
                    variables: {
                      input: {
                        name: values.name,
                        phone: `+91${values.phone}`,
                        email: values.email,
                        formName: values.formName,
                        responseBody: JSON.stringify({
                          description: values.description,
                        }),
                      },
                    },
                  }).then(resp => {
                    formikActions.setSubmitting(false);

                    if (
                      resp &&
                      !resp.data?.genericFormCreate?.genericFormErrors.length &&
                      !resp.errors?.length
                    ) {
                      formikActions.resetForm();
                    }
                  });
                }}
              >
                {formik => {
                  return (
                    <Form>
                      <S.FormContainer>
                        {fields.map(field => (
                          <FormControl variant="outlined" key={field.name}>
                            {field.type === "input" && (
                              <StyledInput
                                name={field.name}
                                placeholder={field.placeholder}
                              />
                            )}
                            {field.type === "text" && (
                              <StyledInput
                                name={field.name}
                                placeholder={field.placeholder}
                                component="textarea"
                                rows="6"
                              />
                            )}

                            <S.ErrorMessage>
                              <ErrorMessage name={field.name} />
                            </S.ErrorMessage>
                          </FormControl>
                        ))}

                        <ButtonWrapper className="error-submit-btn">
                          <Button
                            disabled={!formik.isValid || formik.isSubmitting}
                            testingContext="submitQuery"
                            type="submit"
                            size="md"
                          >
                            {submitBtnText}
                          </Button>
                        </ButtonWrapper>
                      </S.FormContainer>
                    </Form>
                  );
                }}
              </Formik>
            );
          }}
        </TypedGenericFormCreateMutation>
      </S.Container>
    </>
  );
};

ContactForm.displayName = "ContactForm";
export default ContactForm;
