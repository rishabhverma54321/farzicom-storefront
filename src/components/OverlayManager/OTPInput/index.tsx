import { Button } from "@components/atoms/Button";
import { IconButton } from "@components/atoms/IconButton";
import { Overlay, OverlayContextInterface } from "@temp/components/Overlay";
import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
// import CloseIcon from "@material-ui/icons/Close";
import {
  useAuth,
  useAuthState,
  useCheckout,
  useCheckoutState,
  useWallet,
} from "@saleor/sdk"; // FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";
import makeClevertap from "Themes/lib/makeClevertap.js";
import { Header } from "../WriteAReview/styles";
import { TypedRequestOTPMutation } from "../MobileNumberInput/queries";
import { ShopMetaContext } from "@temp/pages/_app";
import { getMetadataValue, isMember, parseJson } from "@utils/misc";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import { getDBIdFromGraphqlId } from "@utils/core";
import MemoSideNavCloseIcon from "@components/atoms/SvgIcons/SideNavCloseIcon";

export interface IOTPInputProps {
  buttonText: string;
  testingContext: string;
  overlay: OverlayContextInterface;
}

export const OTPInput: React.FC<IOTPInputProps> = ({
  buttonText,
  overlay,
  testingContext,
}) => {
  const {
    hide,
    context: { data },
  } = overlay;

  const [errorMsg, setErrorMsg] = useState("");
  const [otp, setOtp] = useState("");
  const [timerId, setTimerId] = useState<number | undefined>(undefined);
  const [showResend, setShowResend] = useState(true);
  const [timeCount, setTimeCount] = useState<number>(30);
  const { checkout } = useCheckoutState();
  const { signInMobile } = useAuth();
  const { getWalletAmount, checkoutRecalculation } = useCheckout();
  const {user} = useAuthState();
  
  const ShopMetaContextValue = useContext(ShopMetaContext);
  
  const loginAutofill =
    getMetadataValue(ShopMetaContextValue, "login_autofill") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "login_autofill"));

  useEffect(() => {
    if (typeof window !== "undefined" && loginAutofill) {
      handleWebOtp();
    }
    return () => {
      // In case the user manually enters an OTP and submits the form the get() call cancel by using an AbortController
      const ac = new AbortController();
      ac.abort;
    };
  }, []);

  const handleWebOtp = async () => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      try {
        if (navigator.credentials) {
          try {
            await navigator.credentials
              .get({
                signal: ac.signal,
                otp: { transport: ["sms"] },
              })
              .then(item => {
                const autofill = item?.code;
                setOtp(autofill?.length === 4 ? autofill : otp);
                ac.abort();
              });
          } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
              // Handle cancellation or interruption
              console.log("OTP retrieval was cancelled");
            } else {
              // Handle other errors
              console.log("Error: ", error);
            }
            ac.abort();
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };


  const recalculation_toggle =
    getMetadataValue(ShopMetaContextValue, "recalculation_toggle") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "recalculation_toggle"));

  const handleSubmit = async (otp: string, mobileNumber: string) => {
    if (!otp) {
      setErrorMsg("Valid OTP is required");
      return;
    }

    const { data } = await signInMobile(
      otp,
      mobileNumber,
      null,
      false,
      false,
      recalculation_toggle
    );
    const dataError = data.CreateTokenOTP?.otpErrors;
    if (dataError && dataError.length > 0) {
      setErrorMsg(dataError[0].message);
    }

    if (data && data.CreateTokenOTP?.user?.id) {
       // Datalayer Event for otp verify
       const user =  data.CreateTokenOTP?.user;
       if (
        typeof window !== "undefined" &&
        window.dataLayer &&
        gtmConfig.otpVerifyClick.enable
      ) {
        window.dataLayer.push({
          event: gtmConfig.otpVerifyClick.value,
          eventCategory: gtmConfig.otpVerifyClick.value,
          eventAction: "otp_submit_click",
          user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
          user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
          membership_status: isMember(user)
            ? "plix_club_member"
            : "not_a_plix_club_member",
        });
      }

      hide();
      setErrorMsg("");
      const walletAmount = await getWalletAmount();

      const clevertap = makeClevertap();
      const ctp = {
        Name: `${data.CreateTokenOTP.user.firstName} ${data.CreateTokenOTP.user.lastName}`,
        Email: data.CreateTokenOTP.user.email,
        Phone: mobileNumber,
        Identity: data.CreateTokenOTP.user.id,
        "Net Cashback": walletAmount.data,
      };
      //
      clevertap.onUserLogin.push({
        Site: ctp,
      });
    }

    //
    //
  };

  useEffect(() => {
    if (timeCount <= 0) {
      setShowResend(true);
      if (timerId) clearInterval(timerId);
      setTimerId(undefined);
      setTimeCount(30);
    }
  }, [timeCount]);
  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, []);

  const handleOtpResend = (mutation?: any) => {
    if (mutation && data?.mobileNumber) {
      setErrorMsg("");
      mutation({
        variables: { phone: data?.mobileNumber },
      }).then((res)=>{
        if(res?.data?.RequestOTP?.otpErrors &&
          res?.data?.RequestOTP?.otpErrors?.length
          ){
            setErrorMsg(res?.data?.RequestOTP?.otpErrors[0]?.message);
          }else{
            setShowResend(false);
            setTimerId(
              setInterval(() => {
                setTimeCount(prevCount => prevCount - 1);
              }, 1000)
            );
          }
      });
      // Datalayer event for Resend click
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.otpResendClick.enable
    ) {
      window.dataLayer.push({
        event: "Custom Event",
        eventCategory: "Custom Event",
        eventAction: "OTP Resend",
        eventLabel: "NA",
        user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        user_type: user ? "logged_in" : "logged_out",
        membership_status: isMember(user)
          ? "plix_club_member"
          : "not_a_plix_club_member",
      });
    }
    } else {
      setErrorMsg("Something went wrong.");
    }
  };
  return (
    <>
      <Overlay testingContext={testingContext} context={overlay}>
        <div className="mobileLogin">
          <Header className="WriteAReviewContainer__header">
            <div className="WriteAReviewContainer__header__text">Enter OTP</div>

            <div onClick={hide} className="WriteAReviewContainer__header__close">
              {/* <IconButton
                name="x"
                size={16}
                testingContext="closeModal"
                onClick={hide}
                color="white"
              /> */}
              <MemoSideNavCloseIcon/>
            </div>
          </Header>
          <div className="body">
            <Formik
              initialValues={{
                otp: "",
              }}
              onSubmit={value => handleSubmit(otp, data.mobileNumber)}
            >
              <Form className="otp-form">
                <input
                  name="otp"
                  placeholder="OTP"
                  className="mobile-otp-field"
                  inputMode="numeric"
                  value={otp}
                  onChange={val => {
                    setErrorMsg("");
                    setOtp(val.target.value);
                  }}
                />
                {errorMsg && <div className="error-message">{errorMsg}</div>}
                <TypedRequestOTPMutation onCompleted={data => {}}>
                  {mutation => {
                    return (
                      <div
                        onClick={() => {
                          if (showResend) {
                            handleOtpResend(mutation);
                            loginAutofill && handleWebOtp();
                          }
                        }}
                        className={`resend-button ${
                          showResend ? "" : "disabled-resend"
                        }`}
                        color="secondary"
                      >
                        {showResend
                          ? "Resend OTP"
                          : `Resend OTP in ${timeCount} secs`}
                      </div>
                    );
                  }}
                </TypedRequestOTPMutation>

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
          </div>
        </div>
      </Overlay>
    </>
  );
};
OTPInput.displayName = "OTPInput";
export default OTPInput;
