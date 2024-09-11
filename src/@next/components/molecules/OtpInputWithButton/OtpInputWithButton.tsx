import { Button } from "@components/atoms/Button";
import { IconButton } from "@components/atoms/IconButton";

import { Overlay, OverlayContextInterface } from "@temp/components/Overlay";
import { Field, Form, Formik } from "formik";
import React from "react";
// import CloseIcon from "@material-ui/icons/Close";

export interface IOtpInputWithButtonProps {
  handleSubmit: (otp: string) => Promise<void>;
  buttonText: string;
  testingContext: string;
  overlay: OverlayContextInterface;
  setOTPRequested: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OtpInputWithButton: React.FC<IOtpInputWithButtonProps> = ({
  handleSubmit,
  buttonText,
  overlay,
  testingContext,
  setOTPRequested,
}) => {
  // const { hide } = overlay;
  return (
    <>
      <Overlay testingContext={testingContext} context={overlay}>
        <div className="mobileLogin">
          <div className="header">
            <span> Enter OTP. </span>
            <IconButton
              name="x"
              size={24}
              testingContext="closeModal"
              onClick={() => setOTPRequested(false)}
            />
          </div>
          <div className="body">
            <Formik
              initialValues={{
                otp: "",
              }}
              onSubmit={value => handleSubmit(value.otp)}
            >
              <Form>
                <Field name="otp" placeholder="OTP" />
                <Button testingContext="Login" size="sm" type="submit">
                  {buttonText}
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
      </Overlay>
    </>
  );
};
OtpInputWithButton.displayName = "OtpInputWithButton";
export default OtpInputWithButton;
