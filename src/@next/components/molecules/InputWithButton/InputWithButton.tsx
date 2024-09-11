import { Button } from "@components/atoms/Button";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { TypedRequestOTPMutation } from "@temp/components/OverlayManager/MobileNumberInput/queries";
import {
  InnerOverlayContextInterface,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from "@temp/components/Overlay";
// FIXME: NextJS Make it a css module
//import "./scss/index.scss";
import { validatePhoneNumber } from "../../organisms/Login/PhoneNumberValidation";

export interface IMobileNumberInputWithButtonProps {
  buttonText: string;
  overlay: OverlayContextInterface;
}

export const InputWithButton: React.FC<IMobileNumberInputWithButtonProps> = ({
  buttonText,
  overlay,
}) => {
  const [mobileNumber, setmobileNumber] = useState("");
  const otpContext: InnerOverlayContextInterface = {
    data: {
      mobileNumber,
    },
  };
  const { hide, show } = overlay;
  const [errorMsg, setErrorMsg] = useState("");
  const [mobile, setMobile] = useState("");
  return (
    <>
      <TypedRequestOTPMutation
        onCompleted={data => {
          if (data?.RequestOTP?.otpErrors[0]?.code === "INVALID_PHONE") {
            setErrorMsg("Valid Phone Number is required");
          } else {
            hide();
            show(OverlayType.otpInput, OverlayTheme.modal, otpContext);
          }
        }}
      >
        {mutation => {
          return (
            <Formik
              initialValues={{
                mobileNumber: "",
              }}
              onSubmit={value => {
                if (!validatePhoneNumber(mobile)) {
                  setErrorMsg("Enter Valid Phone number");
                  return;
                }
                //
                setmobileNumber(`+91${mobile}`);
                mutation({
                  variables: { phone: `+91${mobile}` },
                });
              }}
            >
              <Form className="login-checkout-form">
                <input
                  name="mobileNumber"
                  placeholder="Mobile No."
                  className="mobile-login-field"
                  inputMode="numeric"
                  onChange={val => {
                    setMobile(val.target.value);
                    setErrorMsg("");
                  }}
                />
                {errorMsg && <div className="error-message">{errorMsg}</div>}
                <Button
                  testingContext="Login"
                  size="sm"
                  type="submit"
                  className="otp-button"
                  color="secondary"
                >
                  {buttonText}
                </Button>
              </Form>
            </Formik>
          );
        }}
      </TypedRequestOTPMutation>
    </>
  );
};
InputWithButton.displayName = "MobileNumberInputWithButton";
export default InputWithButton;
