import React, { useContext, useEffect, useState } from "react";
import { Button } from "@components/atoms/Button";
import { Form, Formik } from "formik";

import { TypedRequestOTPMutation } from "@temp/components/OverlayManager/MobileNumberInput/queries";
import { useAuth, useAuthState, useCheckout, UserFragment } from "@saleor/sdk";
import makeClevertap from "Themes/lib/makeClevertap.js";
import { useRouter } from "next/router";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import { validatePhoneNumber } from "@components/organisms/PlixLogin/validators";
import MemoEditPenIcon from "@components/atoms/SvgIcons/EditPenIcon";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import { CircularProgress } from '@mui/material';
import { OTPLESS_WHATSAPP_ID_KEY } from "@temp/themes/plixlifefc/config";
import styles from "./index.module.scss";
import * as S from "./styles";
import { TruecallerLogin } from "../TruecallerLogin";
import { ShopMetaContext } from "@temp/pages/_app";
import { getMetadataValue, isMember, parseJson } from "@utils/misc";
import { getDBIdFromGraphqlId } from "@utils/core";

export interface IUserLoginProps {
  notifyBox?: React.ReactNode;
  onLogin?: (user?: UserFragment) => void;
  onSignUp?: (user: UserFragment) => void;
  onlyLoginScreen?: boolean;
}

export const UserLogin: React.FC<IUserLoginProps> = ({
  notifyBox,
  onLogin,
  onSignUp,
  onlyLoginScreen,
}) => {
  // const [mobileNumber, setmobileNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>("");
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [otptext, setotptext] = useState(new Array(4).fill(""));
  const [timeCount, setTimeCount] = useState<number>(15);
  const [timerId, setTimerId] = useState<number | undefined>(undefined);
  const [showResend, setShowResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputClicked, setInputClicked] = useState(false);

  const {
    signInMobile,
    registerAccountV2,
    confirmAccountV2,
    otpLessLogin,
  } = useAuth();
  const { user, authenticating, authenticated } = useAuthState();
  const { getWalletAmount } = useCheckout();
  const router = useRouter();

  const ShopMetaData = useContext(ShopMetaContext);

  const otplessEnabled =
    ShopMetaData &&
    getMetadataValue(ShopMetaData, "otpless") &&
    parseJson(getMetadataValue(ShopMetaData, "otpless"));

  const truecaller_config =
    ShopMetaData &&
    getMetadataValue(ShopMetaData, "truecaller_config") &&
    parseJson(getMetadataValue(ShopMetaData, "truecaller_config"));

  const loginAutofill =
    getMetadataValue(ShopMetaData, "login_autofill") &&
    parseJson(getMetadataValue(ShopMetaData, "login_autofill"));

  useEffect(() => {
    if (otplessEnabled?.enable) {
      if (window.otplessInit) {
        window.otplessInit();
      }
      window.otpless = otpless_user => otpless(otpless_user);
    }
  }, []);

  const otpless = otpless_user => {
    // @ts-ignore

    const waId = window.otplessWaId?.();
    console.log("waId-userlogin", otpless_user);
    if (otpless_user?.token) {
      setLoading(true);
      otpLessLogin(otpless_user?.token)
        .then(async res => {
          if (
            res?.data?.CreateTokenWithoutOtp?.otpErrors &&
            res?.data?.CreateTokenWithoutOtp?.otpErrors?.length
          ) {
            setErrorMsg(
              res?.data?.CreateTokenWithoutOtp?.otpErrors[0]?.message
            );
          }

          // Datalayer Event for otp verify
          // if (
          //   typeof window !== "undefined" &&
          //   window.dataLayer &&
          //   gtmConfig.otpVerifyClick.enable
          // ) {
          //   window.dataLayer.push({
          //     event: gtmConfig.otpVerifyClick.value,
          //     eventCategory: gtmConfig.otpVerifyClick.value,
          //     eventAction: "otp_submit_click",
          //   });
          // }
          // Clevertap message

          if (res?.data && res?.data?.CreateTokenWithoutOtp?.user?.id) {
            setErrorMsg("");

            const walletAmount = await getWalletAmount();

            const clevertap = makeClevertap();
            const ctp = {
              Name: `${res?.data?.CreateTokenWithoutOtp.user.firstName} ${res?.data?.CreateTokenWithoutOtp.user.lastName}`,
              Email: res?.data?.CreateTokenWithoutOtp?.user.email,
              Phone: `+91${mobile}`,
              Identity: `+91${mobile}`,
              "Net Cashback": walletAmount.data,
            };
            //
            clevertap.onUserLogin.push({
              Site: ctp,
            });

            if (onLogin && typeof onLogin === "function") {
              onLogin(res.data.CreateTokenWithoutOtp.user);
            }
            // if (onLogin && typeof onLogin === "function") {
            //   onLogin(res?.data?.confirmAccountV2?.user);
            // }
            // const clevertap = makeClevertap();
            // const ctp = {
            //   Name: `${res?.data?.confirmAccountV2.user.firstName} ${res?.data?.confirmAccountV2.user.lastName}`,
            //   Email: res?.data?.confirmAccountV2.user.email,
            //   Phone: `+91${mobile}`,
            //   Identity: `+91${mobile}`,
            // };
            //
            // clevertap.onUserLogin.push({
            //   Site: ctp,
            // });

            // Signup Event
            // if (clevertapEvents.userSignUp.enable && isNewUser) {
            //   clevertap.event.push(clevertapEvents.userSignUp.value, {
            //     email,
            //     phone_no: phoneVariable,
            //   });
            // }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setErrorMsg("Something went wrong, please try to login via OTP");
    }

    // Once you signup/sign a user, you can redirect the user to your signup/signin flow.
  };

  const handleSubmit = async (otp: string, mobileNumber: string) => {
    if (!otp) {
      setErrorMsg("Valid OTP is required");
      return;
    }
    setLoading(true);
    const { data } = await signInMobile(otp, mobileNumber, undefined, false);
    const dataError = data.CreateTokenOTP?.otpErrors;
    if (dataError && dataError.length > 0) {
      setErrorMsg(dataError[0].message);
    }

    if (data && data.CreateTokenOTP?.user?.id) {
      setErrorMsg("");
      const walletAmount = await getWalletAmount();

      const clevertap = makeClevertap();
      const ctp = {
        Name: `${data.CreateTokenOTP.user.firstName} ${data.CreateTokenOTP.user.lastName}`,
        Email: data.CreateTokenOTP.user.email,
        Phone: `+91${mobile}`,
        Identity: `+91${mobile}`,
        "Net Cashback": walletAmount.data,
      };
      //
      clevertap.onUserLogin.push({
        Site: ctp,
      });

      // Datalayer Event for otp verify
      if (
        typeof window !== "undefined" &&
        window.dataLayer &&
        gtmConfig.otpVerifyClick.enable
      ) {
        window.dataLayer.push({
          event: gtmConfig.otpVerifyClick.value,
          eventCategory: gtmConfig.otpVerifyClick.value,
          eventAction: "otp_submit_click",
          user_ID: data.CreateTokenOTP?.user?.id
            ? getDBIdFromGraphqlId(data.CreateTokenOTP?.user?.id, "User")
            : undefined,
          user_type: data.CreateTokenOTP?.user ? "logged_in" : "logged_out", // Guest user or Loggedin user
          membership_status: isMember(data.CreateTokenOTP?.user)
            ? "plix_club_member"
            : "not_a_plix_club_member",
        });
      }
      if (onLogin && typeof onLogin === "function") {
        onLogin(data?.CreateTokenOTP?.user);
      }
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    if (
      user?.phone &&
      !authenticating &&
      (user?.phone === `+91${mobile}` || user?.phone === mobile)
    ) {
      onLogin(user);
      return;
    }
    setLoading(true);
    registerAccountV2(`phn${mobile}@example.com`, `+91${mobile}`)
      .then(res => {
        if (
          res?.data?.accountRegisterV2?.errors &&
          res?.data?.accountRegisterV2?.errors?.length
        ) {
          setErrorMsg(res?.data?.accountRegisterV2?.errors[0].message);
          return;
        }
        if (res.data?.accountRegisterV2?.isActiveUser && isNewUser) {
          setErrorMsg("Account already exists, please login");
          return;
        }
        if (res.data?.accountRegisterV2.errors.length === 0) {
          setShowOtp(true);
          setTimerId(
            setInterval(() => {
              setTimeCount(prevCount => prevCount - 1);
            }, 1000)
          );
        }
      })
      .catch(err => {
        setErrorMsg("Something went wrong, please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const confirmUserSignUp = otpVal => {
    setLoading(true);
    confirmAccountV2(otpVal, `+91${mobile}`, false)
      .then(async res => {
        if (
          res?.data?.confirmAccountV2?.errors &&
          res?.data?.confirmAccountV2?.errors?.length
        ) {
          setErrorMsg(res?.data?.confirmAccountV2?.errors[0]?.message);
        }

        if (
          typeof window !== "undefined" &&
          window.dataLayer &&
          gtmConfig.otpVerifyClick.enable
        ) {
          window.dataLayer.push({
            event: gtmConfig.otpVerifyClick.value,
            eventCategory: gtmConfig.otpVerifyClick.value,
            eventAction: "otp_submit_click",
          });
        }

        // Datalayer Event for otp verify
        // if (
        //   typeof window !== "undefined" &&
        //   window.dataLayer &&
        //   gtmConfig.otpVerifyClick.enable
        // ) {
        //   window.dataLayer.push({
        //     event: gtmConfig.otpVerifyClick.value,
        //     eventCategory: gtmConfig.otpVerifyClick.value,
        //     eventAction: "otp_submit_click",
        //   });
        // }
        // Clevertap message

        if (res?.data && res?.data?.confirmAccountV2?.user?.id) {
          setErrorMsg("");

          const walletAmount = await getWalletAmount();

          const clevertap = makeClevertap();
          const ctp = {
            Name: `${res?.data?.confirmAccountV2.user.firstName} ${res?.data?.confirmAccountV2.user.lastName}`,
            Email: res?.data?.confirmAccountV2.user.email,
            Phone: `+91${mobile}`,
            Identity: `+91${mobile}`,
            "Net Cashback": walletAmount.data.wallet?.amount,
          };
          //
          clevertap.onUserLogin.push({
            Site: ctp,
          });

          // Datalayer Event for otp verify
          if (
            typeof window !== "undefined" &&
            window.dataLayer &&
            gtmConfig.otpVerifyClick.enable
          ) {
            window.dataLayer.push({
              event: gtmConfig.otpVerifyClick.value,
              eventCategory: gtmConfig.otpVerifyClick.value,
              eventAction: "otp_submit_click",
              user_ID: res?.data?.confirmAccountV2?.user?.id
                ? getDBIdFromGraphqlId(
                    res?.data?.confirmAccountV2?.user?.id,
                    "User"
                  )
                : undefined,
              user_type: res?.data?.confirmAccountV2?.user
                ? "logged_in"
                : "logged_out", // Guest user or Loggedin user
              membership_status: isMember(res?.data?.confirmAccountV2?.user)
                ? "plix_club_member"
                : "not_a_plix_club_member",
            });
          }

          // Signup Event
          if (clevertapEvents.userSignUp.enable && isNewUser) {
            clevertap.event.push(clevertapEvents.userSignUp.value, {
              phone_no: `+91${mobile}`,
            });
          }

          if (onLogin && typeof onLogin === "function") {
            onLogin(res.data.confirmAccountV2.user);
          }

          // if (onLogin && typeof onLogin === "function") {
          //   onLogin(res?.data?.confirmAccountV2?.user);
          // }
          // const clevertap = makeClevertap();
          // const ctp = {
          //   Name: `${res?.data?.confirmAccountV2.user.firstName} ${res?.data?.confirmAccountV2.user.lastName}`,
          //   Email: res?.data?.confirmAccountV2.user.email,
          //   Phone: `+91${mobile}`,
          //   Identity: `+91${mobile}`,
          // };
          //
          // clevertap.onUserLogin.push({
          //   Site: ctp,
          // });

          // Signup Event
          // if (clevertapEvents.userSignUp.enable && isNewUser) {
          //   clevertap.event.push(clevertapEvents.userSignUp.value, {
          //     email,
          //     phone_no: phoneVariable,
          //   });
          // }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loginAutofill) {
      return () => {
        // In case the user manually enters an OTP and submits the form the get() call cancel by using an AbortController
        if (showOtp) {
          const ac = new AbortController();
          ac.abort();
        }
      };
    }
  }, []);

  const handleWebOtp = async () => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      try {
        await navigator.credentials
          .get({
            otp: { transport: ["sms"] },
            signal: ac.signal,
          })
          .then(otp => {
            const autofill = otp?.code?.trim()?.split("");
            setotptext(autofill?.length === 4 ? autofill : otptext);
            // if (isNewUser && !mutation) {
            //   handleSubmitNew(type,otp?.code);
            // } else if (mutation) {
            //   handleSubmit(mutation,type,otp?.code);
            // }
          });
      } catch (err) {
        console.log("!! WebOTP api is not supported");
      }
    }
  };

  // Handle pasted OTP
  const handleOnPaste = (element: any, mutation: any) => {
    element?.preventDefault();
    const pasteData = element?.clipboardData
      .getData("text/plain")
      .toString()
      .slice(0, 4)
      .split("");

    if (Array.isArray(pasteData) && pasteData?.length === 4) {
      const finalData = [...pasteData];
      // alert(finalData);
      setotptext([...finalData]);
      if (isNewUser && !mutation && finalData?.length === 4) {
        confirmUserSignUp(finalData.join(""));
      } else if (mutation && finalData?.length === 4) {
        handleSubmit(finalData.join(""), `+91${mobile}`);
      }
    }
  };

  //  OTP Handler
  const handleChange = (
    element: EventTarget & HTMLInputElement,
    index: number,
    mutation: any
  ) => {
    const value = element?.target?.value;
    if (isNaN(element?.target?.value)) return false;
    if (value && value?.trim()?.length > 1) {
      // This is a workaround for dealing mobile chrome does not fire onPaste event from sms auto-populate.
      element.clipboardData = {
        getData: () => value.trim(),
      };
      handleOnPaste(element, mutation);
    } else {
      setotptext([
        ...otptext.map((d: any, idx: number) =>
          idx === index ? element?.target?.value : d
        ),
      ]);
      // Focus next input
      if (element?.target?.nextSibling) {
        element?.target?.nextSibling.focus();
      }
    }
  };

  useEffect(() => {
    if (otptext[3]?.length > 0) {
      const otpAlltext: any = otptext.join("");
      setOtpValue(otpAlltext);
      if (isNewUser) {
        confirmUserSignUp(otpAlltext);
        return;
      }
      handleSubmit(otpAlltext, `+91${mobile}`);
    }
  }, [otptext]);

  useEffect(() => {
    if (timeCount === 0) {
      setShowResend(true);
      if (timerId) clearInterval(timerId);
      setTimerId(undefined);
      router.prefetch(
        `${window?.location?.pathname}${
          window?.location?.search === ""
            ? "?checkout_varaint=v3"
            : `${window.location.search}&checkout_varaint=v3`
        }`
      );
    }
  }, [timeCount]);

  const handleOtpResend = (mutation?: any) => {
    const user_email = `phn${mobile}@example.com`;
    const phoneVariable = `+91${mobile}`;
    if (loginAutofill) {
      handleWebOtp();
    }
    // Datalayer event for Resend click
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.otpResendClick.enable
    ) {
      window.dataLayer.push({
        event: gtmConfig.otpResendClick.value,
        phone: mobile,
      });
    }
    setLoading(true);
    if (mutation && !isNewUser) {
      mutation({
        variables: { phone: `+91${mobile}` },
      });
    } else {
      setTimeCount(15);
      if (!timerId) {
        setTimerId(
          setInterval(() => {
            setTimeCount(prevCount => prevCount - 1);
          }, 1000)
        );
      }
      registerAccountV2(user_email, phoneVariable)
        .then(res => {
          if (
            res?.data.accountRegisterV2.errors &&
            res?.data.accountRegisterV2.errors?.length
          ) {
            setErrorMsg(res?.data.accountRegisterV2.errors[0].message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
        user_id: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        user_type: user ? "logged_in" : "logged_out",
        membership_status: isMember(user)
          ? "plix_club_member"
          : "not_a_plix_club_member",
      });
    }
  };
  return (
    <div className={styles.userLoginWrapper}>
      {!user && !authenticated && inputClicked && truecaller_config?.enabled ? (
        <TruecallerLogin onLogin={onLogin} />
      ) : (
        <></>
      )}
      <div className={styles.backgroundDiv} />
      <div className={styles.loginContentWrapper}>
        {loading && (
          <div className={styles.loader}>
            <CircularProgress color="inherit" />
          </div>
        )}
        <div className="body">
          <>
            <TypedRequestOTPMutation
              onCompleted={data => {
                if (data?.RequestOTP?.otpErrors[0]?.code === "INVALID_PHONE") {
                  setIsNewUser(true);
                  handleSignUp();
                  // setErrorMsg(
                  //   "User doesn't exist. Please sign up or continue with guest checkout."
                  // );
                } else {
                  setShowOtp(true);
                  if (loginAutofill) {
                    handleWebOtp();
                  }
                  setTimeCount(15);
                  setTimerId(
                    setInterval(() => {
                      setTimeCount(prevCount => prevCount - 1);
                    }, 1000)
                  );
                }
                setLoading(false);
              }}
              onError={() => {
                setLoading(false);
              }}
            >
              {mutation => {
                return (
                  <Formik
                    initialValues={{
                      mobileNumber: "",
                    }}
                    onSubmit={value => {
                      if (
                        user?.phone &&
                        !authenticating &&
                        (user?.phone === `+91${mobile}` ||
                          user?.phone === mobile)
                      ) {
                        onLogin(user);
                        return;
                      }
                      if (showOtp) {
                        if (!otpValue || otpValue?.length !== 4) {
                          setErrorMsg("Valid OTP is required");
                          return;
                        }
                        if (isNewUser) {
                          confirmUserSignUp(otpValue);
                          return;
                        }

                        handleSubmit(otpValue, `+91${mobile}`);
                      } else {
                        if (!validatePhoneNumber(mobile)) {
                          setErrorMsg("Enter Valid Phone number");
                          return;
                        }
                        (window.dataLayer = window.dataLayer || []).push({
                          event: "login_flow",
                          eventCategory: "login",
                          eventAction: "login_flow",
                          user_ID: user?.id
                            ? getDBIdFromGraphqlId(user?.id, "User")
                            : "NA",
                          user_type: user ? "logged_in" : "logged_out",
                        });
                        // setmobileNumber(`+91${mobile}`);
                        setLoading(true);
                        mutation({
                          variables: { phone: `+91${mobile}` },
                        });
                      }
                    }}
                  >
                    <Form
                      className={`${styles.form} ${
                        onlyLoginScreen ? styles.onlyLoginScreenForm : ""
                      }`}
                    >
                      <>
                        <div className={styles.header}>
                          {showOtp
                            ? "Verify Mobile Number"
                            : "Enter Mobile Number"}
                        </div>
                      </>
                      <>
                        {showOtp && (
                          <div className={styles.otpRecievedText}>
                            <div>Enter the OTP received on</div>
                            <div
                              className={styles.mobileNoWithEdit}
                              onClick={() => {
                                if (timerId) clearInterval(timerId);
                                setErrorMsg("");
                                setShowOtp(false);
                              }}
                            >
                              <span>+91-{mobile}</span>
                              <MemoEditPenIcon width={12} height={12} />
                            </div>
                          </div>
                        )}
                      </>
                      {showOtp ? (
                        <S.OtpWrapper>
                          {otptext.map((data, index) => {
                            return (
                              <input
                                onPaste={e => {
                                  // Get clipboard data and set it to state if user pastes otp
                                  if (typeof window !== "undefined") {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    const clipboardData =
                                      e.clipboardData || window.clipboardData;
                                    const pastedData = clipboardData.getData(
                                      "text/plain"
                                    );
                                    if (
                                      pastedData &&
                                      typeof pastedData === "string" &&
                                      pastedData?.length === 4
                                    ) {
                                      setotptext(pastedData.split(""));
                                    }
                                  }
                                }}
                                className={`${
                                  errorMsg.length > 0 ? "errormsg" : ""
                                }`}
                                type="tel"
                                name="otp"
                                maxLength={index === 3 ? 1 : 4}
                                key={index}
                                value={data}
                                placeholder=""
                                onChange={e => {
                                  setErrorMsg("");
                                  handleChange(e, index, mutation);
                                }}
                                onKeyDown={e => {
                                  if (e.keyCode === 8) {
                                    e.preventDefault();
                                    setotptext([
                                      ...otptext.map((d: any, idx: number) =>
                                        idx === index ? "" : d
                                      ),
                                    ]);
                                  }
                                  if (
                                    e.keyCode === 8 &&
                                    e.target?.previousSibling &&
                                    typeof e.target?.previousSibling?.focus ===
                                      "function"
                                  ) {
                                    e.target.previousSibling.focus();
                                  }
                                }}
                                onFocus={e => e.target.select()}
                              />
                            );
                          })}
                        </S.OtpWrapper>
                      ) : (
                        <S.InputDiv errorstate={!!errorMsg}>
                          <S.CountryCode errorstate={!!errorMsg}>
                            +91
                          </S.CountryCode>
                          <S.Input
                            type="text"
                            inputMode="tel"
                            name="mobileNumber"
                            value={mobile}
                            maxLength={10}
                            placeholder="XXXXX XXXXX"
                            onClick={e => {
                              if (!inputClicked && truecaller_config?.enabled) {
                                setInputClicked(true);
                                // e.target.blur();
                              }
                            }}
                            onChange={(e: any) => {
                              setErrorMsg("");
                              setMobile(
                                /^\d*$/.test(e.target.value)
                                  ? e.target.value
                                  : mobile
                              );
                            }}
                          />
                        </S.InputDiv>
                      )}
                      {errorMsg && (
                        <div className={styles.errorMsg}>{errorMsg}</div>
                      )}
                      <>
                        {showOtp && (
                          <>
                            {showResend ? (
                              <div className={styles.resendContainer}>
                                <div
                                  className={styles.resend}
                                  onClick={() => {
                                    setShowResend(false);
                                    if (timerId) clearInterval(timerId);
                                    if (mutation && !isNewUser) {
                                      handleOtpResend(mutation);
                                    } else {
                                      handleOtpResend();
                                    }
                                  }}
                                >
                                  <span> Resend OTP</span>
                                </div>
                                <div
                                  onClick={() => {
                                    (window.dataLayer =
                                      window.dataLayer || []).push({
                                      event: "guest_checkout_click",
                                      eventCategory: "guest_checkout",
                                      eventAction: "guest_checkout_click",
                                      user_ID: user?.id
                                        ? getDBIdFromGraphqlId(user?.id, "User")
                                        : "NA",
                                      user_type: user
                                        ? "logged_in"
                                        : "logged_out",
                                    });
                                    router.push({
                                      pathname: router?.pathname,
                                      query: {
                                        ...router?.query,
                                        checkout_variant: "V3",
                                      },
                                    });
                                  }}
                                  className={styles.resend}
                                >
                                  <span>Continue as guest</span>
                                </div>
                              </div>
                            ) : timeCount !== 0 ? (
                              <span className={styles.resend}>
                                Resend OTP in{" "}
                                <span className={styles.timer}>
                                  (0:{timeCount})
                                </span>
                              </span>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </>

                      {!showOtp && notifyBox}
                      <button className={styles.submitButton} type="submit">
                        Continue
                      </button>
                      {otplessEnabled?.enable ? (
                        <>
                          <div className="or-Divider">
                            <span />
                            <strong>OR</strong>
                            <span />
                          </div>
                          <div
                            className="whatsappLoginButtonWrapper"
                            id="otpless"
                          />{" "}
                        </>
                      ) : (
                        <></>
                      )}
                    </Form>
                  </Formik>
                );
              }}
            </TypedRequestOTPMutation>
          </>
        </div>
      </div>
    </div>
  );
};
UserLogin.displayName = "UserLogin";
export default UserLogin;
