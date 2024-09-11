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
import { validatePhoneNumber } from "../../organisms/Login/PhoneNumberValidation";
import { customEventTrigger } from "@utils/misc";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import { useAuthState } from "@saleor/sdk";

export interface IMobileNumberInputWithButtonProps {
  buttonText: string;
  overlay: OverlayContextInterface;
}

export const MobileNumberInputWithButton: React.FC<IMobileNumberInputWithButtonProps> = ({
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
  const {user} = useAuthState();
  return (
    <>
      <TypedRequestOTPMutation
        onCompleted={data => {
          if (data?.RequestOTP?.otpErrors[0]?.code === "INVALID_PHONE") {
            setErrorMsg(
              "User doesn't exist. Please sign up or continue with guest checkout."
            );
          } else if (data?.RequestOTP?.otpErrors[0]?.code === "INVALID_OTP"){
            setErrorMsg(data?.RequestOTP?.otpErrors[0]?.message);
          } else {
            if (gtmConfig.loginFlow.enable) {
              customEventTrigger(gtmConfig.loginFlow.value, user);
            }
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
MobileNumberInputWithButton.displayName = "MobileNumberInputWithButton";
export default MobileNumberInputWithButton;
