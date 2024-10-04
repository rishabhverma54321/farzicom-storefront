import React, { useContext, useRef, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MenuItem, { Checkbox, FormControlLabel, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material";
import Select from "@mui/material";
import style from "./scss/index.module.scss"
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
import { TypedContactUsCreateMutation } from "../ContactUsForm/queries";
import Link from "next/link";
import { CachedImage } from "../CachedImage";
import { customEventTrigger } from "@utils/misc";
import { useAuthState } from "@saleor/sdk";
// import { TypedContactUsCreateMutation } from "./queries";

const phoneRegex = /^[0-9]{10}$/;

const ValidationSchema = Yup.object().shape({
  name: Yup.string().trim().min(4).max(64).required("Name Required"),
  phone: Yup.string()
    .trim()
    .required("Please enter 10 digits in mobile")
    .matches(phoneRegex, "Please enter 10 digits in mobile"),
  email: Yup.string()
    .trim()
    .email("Please enter valid email")
    .required("Please enter a valid email"),
  queryType: Yup.string().required("Please select a type of query"),
  message: Yup.string().trim().required("Please write about your query"),
  hasAgreed: Yup.boolean().oneOf(
    [true],
    "Please read and accept our privacy policy."
  ),
});

export interface IContactUsFormIkkaiProps {}

export const ContactUsFormIkkai: React.FC<IContactUsFormIkkaiProps> = () => {
  const initialSubmitText = "Send Message";
  const [submitBtnText, setSubmitBtnText] = useState(initialSubmitText);
  const { show } = useContext(OverlayContext);
  const [ShowMessage,setShowMessage] = useState(false);
  const targetref = useRef(null);
  const {user} = useAuthState();

  const closeThankYouPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if( targetref.current &&  !targetref.current.contains(event.target)){
      setShowMessage(false);
    }
  }
  
  return (
    <>
      <S.Container>
        <S.Heading>Contact Us</S.Heading>
        <TypedContactUsCreateMutation
          onCompleted={data => {
            setSubmitBtnText(initialSubmitText);
            customEventTrigger("contact_form_submit", user);
            let contactUsContext: InnerOverlayContextInterface;
            if (data.contactUsCreate?.contactUsErrors.length) {
              contactUsContext = {
                status: "error",
                title: "Error",
                content: data.contactUsCreate?.contactUsErrors[0].message,
              };
              show(OverlayType.message, OverlayTheme.modal, contactUsContext);
            }
            if (data.contactUsCreate?.contactUs) {
              contactUsContext = {
                status: "success",
                title: "Submitted",
                content: <h4>Submitted successfully.</h4>,
              };
              setShowMessage(true);
              show(OverlayType.message, OverlayTheme.modal, contactUsContext);
            }
          }}
        >
          {submit => {
            return (
              <Formik
                initialValues={{
                  name: "",
                  phone: "",
                  email: "",
                  message: "",
                  queryType: "",
                  hasAgreed: false,
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
                        queryType: values.queryType,
                        message: values.message,
                      },
                    },
                  }).then(resp => {
                    formikActions.setSubmitting(false);

                    if (
                      resp &&
                      !resp.data?.contactUsCreate?.contactUsErrors.length &&
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
                        <FormControl variant="outlined" className={style.contact_form}>
                          {!formik.values.queryType && (
                            <InputLabel id="demo-simple-select-outlined-label">
                              Select subject of your query*
                            </InputLabel>
                          )}
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="queryType"
                            value={formik.values.queryType}
                            className={style.contact_selectQuery}
                            // label="Select subject of your query"
                            sx={{
                              background:"#FFFFFF",
                              border: "1px solid #E7E7E7",
                              borderRadius: "8px"
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            MenuProps={{
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                              },
                              getContentAnchorEl: null,
                            }}
                          >
                            {CONTACT_US_OPTIONS.map(option => (
                              <MenuItem value={option.value} key={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <S.ErrorMessage>
                          <ErrorMessage name="queryType" />
                        </S.ErrorMessage>

                        <StyledInput name="name" placeholder="Your name*"  />
                        <S.ErrorMessage>
                          <ErrorMessage name="name" />
                        </S.ErrorMessage>

                        <StyledInput name="phone" placeholder="Mobile number*" />
                        <S.ErrorMessage>
                          <ErrorMessage name="phone" />
                        </S.ErrorMessage>

                        <StyledInput name="email" placeholder="Email address*" />
                        <S.ErrorMessage>
                          <ErrorMessage name="email" />
                        </S.ErrorMessage>

                        <StyledInput
                          name="message"
                          placeholder="Message*"
                          component="textarea"
                          rows="6"
                        />
                        <S.ErrorMessage>
                          <ErrorMessage name="message" />
                        </S.ErrorMessage>

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="hasAgreed"
                              checked={formik.values.hasAgreed}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                          // I agree to the terms and conditions and the privacy policy
                          }
                          label={
                            <Typography>I agree to the 
                              <Link legacyBehavior href="/page/terms-conditions"><a target="_blank"> terms and conditions</a></Link> and the 
                              <Link legacyBehavior href="/page/privacy-policy"><a target="_blank"> privacy policy</a></Link>
                              </Typography>
                            
                          }
                        />
                        <S.ErrorMessage>
                          <ErrorMessage name="hasAgreed" />
                        </S.ErrorMessage>

                        <S.SubmitButtonWrapper>
                          <Button
                            disabled={!formik.isValid || formik.isSubmitting}
                            testingContext="submitQuery"
                            type="submit"
                            size="sm"
                          >
                            {submitBtnText}
                          </Button>
                        </S.SubmitButtonWrapper>
                      </S.FormContainer>
                    </Form>
                  );
                }}
              </Formik>
            );
          }}
        </TypedContactUsCreateMutation>
      </S.Container>
      {ShowMessage && 
      <S.MessagePopup>
        <div className="messagepopup" style={{ width:"100%", height:"100vh" }} onClick={(e)=>closeThankYouPopup(e)}>
          <S.MessagePopupInner>
            <div className="message_inner_popup" style={{ width:"100%", height:"100%" }} ref={targetref}>
              <div className="message_popup_image">
              <CachedImage 
                  url="https://plixlifefc-media.farziengineer.co/hosted/thankyou_banner-9fe76c199cc2.png"
                  isNextImage={true}
                  nextImageLayout="fill"
                  nextImageObjectFit="contain"
                />            
              </div>
              <h2>Query sent successfully.</h2>
              <p>Our team will get back to you in 24 to 48 working hours.</p>
              <Link legacyBehavior href="/page/shop">
                <a>Continue Shopping</a>
              </Link>
            </div>
          </S.MessagePopupInner>
        </div>
      </S.MessagePopup>
      }

    </>
  );
};

ContactUsFormIkkai.displayName = "ContactUsFormIkkai";
export default ContactUsFormIkkai;