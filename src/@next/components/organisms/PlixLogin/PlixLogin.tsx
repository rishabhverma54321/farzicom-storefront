import React, { useContext, useEffect, useState } from "react";
import { useAuth, useAuthState, useCheckout } from "@saleor/sdk";
import Media from "react-media";
import { mediumScreen } from "@styles/constants";

import { META_DEFAULTS, OTPLESS_WHATSAPP_ID_KEY } from "Themes/config";
import makeClevertap from "Themes/lib/makeClevertap.js";
import { TypedRequestOTPMutation } from "@temp/components/OverlayManager/MobileNumberInput/queries";
import { MutationFn } from "react-apollo";
import { walletUrl, termsConditions, privacyPolicy } from "Themes/config";
import {
  OTPRequest,
  OTPRequestVariables,
} from "@temp/components/OverlayManager/MobileNumberInput/gqlTypes/OTPRequest";
import { getUrlWithParams } from "@utils/misc";
import { Button } from "@components/atoms/Button";
import { Loader } from "@components/atoms/Loader";
import { useCustomLocation } from "@hooks/useCustomLocation";
import { useCustomHistory } from "@hooks/useCustomHistory";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { ShopMetaContext } from "@temp/pages/_app.page";
import Link from "next/link";
import { useRouter } from "next/router";
import { CachedImage } from "@components/molecules/CachedImage";
import {
  FullContainer,
  WebHeading,
  LoginSignBox,
  LoginBox,
  ShowBox,
  InputDiv,
  ButtonDiv,
  Container,
  Form,
  Input,
  Span,
  SignUpBox,
  SignUpText,
  ResendDiv,
  ResendText,
  TimeText,
  LoginContainerDesktop,
  LoginFormContainer,
  LoginImageContainer,
  DescriptionText,
  PolicyText,
  LoaderContainer,
  NewuserSignup,
  NewUser,
  EnterEmailAddress,
  CountryCode,
  Contactwrapper,
  OtpWrapper,
  ErrorMessage,
  OrDivider,
} from "./styles";
import { validatePhoneNumber, validateEmail } from "./validators";
import PlixLoginIcon from "../../../../images/PlixLoginIcon.svg";
import {
  customEventTrigger,
  getMetadataValue,
  isMember,
  parseJson,
} from "@utils/misc";
import { getDBIdFromGraphqlId } from "@utils/core";
import { TruecallerLogin } from "@components/farzicom-ui-kit/TruecallerLogin";
import { MyCustomLink } from "@components/next-react/MyCustomLink";

export interface IPlixLoginProps {}

export const PlixLogin: React.FC<IPlixLoginProps> = () => {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [number, setNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showResend, setShowResend] = useState(false);
  const [timeCount, setTimeCount] = useState<number>(15);
  const [timerId, setTimerId] = useState<number | undefined>(undefined);
  const [otp, setOtp] = useState<string>("");
  const [type, setType] = useState("form");
  const [inputClicked, setInputClicked] = useState(false);
  // const { signInMobile, user } = useAuth();
  const {
    registerAccountV2,
    confirmAccountV2,
    signInMobile,
    otpLessLogin,
  } = useAuth();
  const { user, authenticated } = useAuthState();
  const [otptext, setotptext] = useState(new Array(4).fill(""));

  const { checkout, getWalletAmount, checkoutRecalculation } = useCheckout();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [routeQuery, setRouteQuery] = useState<any>("");
  const location = useCustomLocation();
  const history = useCustomHistory();
  const Router = useRouter();
  const ShopMetaContextValue = useContext(ShopMetaContext);

  const loginAutofill =
    getMetadataValue(ShopMetaContextValue, "login_autofill") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "login_autofill"));

  const { url } = location.state ? location.state : "/";

  const ShopMetaData = useContext(ShopMetaContext);

  const otplessEnabled =
    ShopMetaData &&
    getMetadataValue(ShopMetaData, "otpless") &&
    parseJson(getMetadataValue(ShopMetaData, "otpless"));

  const recalculation_toggle =
    getMetadataValue(ShopMetaData, "recalculation_toggle") &&
    parseJson(getMetadataValue(ShopMetaData, "recalculation_toggle"));
  
  const isRecalculate =
    getMetadataValue(ShopMetaContextValue, "atc_recalculation") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "atc_recalculation"));

  const truecaller_config =
    ShopMetaData &&
    getMetadataValue(ShopMetaData, "truecaller_config") &&
    parseJson(getMetadataValue(ShopMetaData, "truecaller_config"));

  // useEffect(() => {
  //   if (user && location.pathname === "/page/login" && !loading) {
  //     if (location.state?.fromCart) {
  //       if (timerId) clearInterval(timerId);
  //       history.push("/cart");
  //       return;
  //     }
  //     if (location.state?.toWallet) history.push("/wallet");
  //     else if (url && url === "/order-placed") history.push("/");
  //     else history.goBack();
  //   }
  // }, [user, loading]);

  const [show, setShow] = useState(false);
  useEffect(() => {
    setRouteQuery(Router?.query);
    setShow(true);
    if (otplessEnabled?.enable) {
      if (window.otplessInit) {
        window.otplessInit();
      }
      window.otpless = otpless_user => otpless(otpless_user);
    }
  }, []);

  const otpless = otpless_user => {
    // @ts-ignore

    // const waId = window.otplessWaId?.();
    console.log("waId-loginpage", otpless_user);
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

          const walletAmount = await getWalletAmount();

          const clevertap = makeClevertap();
          const ctp = {
            Name: `${res?.data?.CreateTokenWithoutOtp.user.firstName} ${res?.data?.CreateTokenWithoutOtp.user.lastName}`,
            Email: res?.data?.CreateTokenWithoutOtp?.user.email,
            Phone: `+91${number}`,
            Identity: `91${number}`,
            "Net Cashback": walletAmount.data,
          };
          //
          clevertap.onUserLogin.push({
            Site: ctp,
          });

          if (res?.data && res?.data?.CreateTokenWithoutOtp?.user?.id) {
            setErrorMsg("");
            Router.push(getUrlWithParams("/"));
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
  };
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      Router?.query?.redirect_from === "checkout"
    ) {
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
        window.history.go(1);
        Router.push(getUrlWithParams("/checkout/address"));
      };
    }

    return () => {
      // In case the user manually enters an OTP and submits the form the get() call cancel by using an AbortController
      if (
        routeQuery?.redirect_from === "checkout"
      ) {
        window.onpopstate = null;
      }
      if (type !== "form" && loginAutofill) {
        const ac = new AbortController();
        ac.abort();
      }
    };
  }, []);

  const handleWebOtp = async (mutation: any, type: string) => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      try {
        await navigator.credentials
          .get({
            otp: { transport: ["sms"] },
            signal: ac.signal,
          })
          .then(otp => {
            const autofill = otp?.code?.trim().split("");
            setotptext(autofill?.length === 4 ? autofill : otptext);
            if (isNewUser && !mutation) {
              handleSubmitNew(type, otp?.code);
            } else if (mutation) {
              handleSubmit(mutation, type, otp?.code);
            }
          });
      } catch (err) {
        console.log("!! WebOTP api is not supported");
      }
    }
  };

  const handleSubmitNew = async (type: string, otp?: any) => {
    if (!validatePhoneNumber(number)) {
      setErrorMsg("Enter Valid Phone number");
      return;
    }
    if (isNewUser && !validateEmail(email)) {
      setErrorMsg("Enter Valid Email Address");
      return;
    }
    setLoading(true);
    if (type === "form") {
      const user_email = isNewUser ? email : `phn${number}@dummy.com`;
      const phoneVariable = `+91${number}`;
      registerAccountV2(user_email, phoneVariable)
        .then(res => {
          if (
            res?.data?.accountRegisterV2?.errors &&
            res?.data?.accountRegisterV2?.errors?.length
          ) {
            setErrorMsg(res?.data?.accountRegisterV2?.errors[0].message);
            setLoading(false);
            return;
          }
          if (res.data?.accountRegisterV2?.isActiveUser && isNewUser) {
            setErrorMsg("Account already exists, please login");
            setLoading(false);
            return;
          }
          if (res.data?.accountRegisterV2.errors.length === 0) {
            if (gtmConfig.loginFlow.enable) {
              customEventTrigger(gtmConfig.loginFlow.value, user);
            }
            setType("otp");
            setTimerId(
              setInterval(() => {
                setTimeCount(prevCount => prevCount - 1);
              }, 1000)
            );
          }
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
        });
    } else {
      if (!otp || otp.length !== 4) {
        setLoading(false);

        setErrorMsg("Valid OTP is required");
        return;
      }
      // const id = checkout ? checkout.id : undefined;
      const phoneVariable = `+91${number}`;
      confirmAccountV2(
        otp,
        phoneVariable,
        false,
        false,
        recalculation_toggle,
        !isRecalculate
      ).then(async res => {
        if (
          res?.data?.confirmAccountV2?.errors &&
          res?.data?.confirmAccountV2?.errors?.length
        ) {
          setErrorMsg(res?.data?.confirmAccountV2?.errors[0]?.message);
        }
        // Clevertap message

        if (res?.data && res?.data?.confirmAccountV2?.user?.id) {
          setErrorMsg("");
          const walletAmount = await getWalletAmount();

          const clevertap = makeClevertap();
          const ctp = {
            Name: `${res?.data?.confirmAccountV2.user.firstName} ${res?.data?.confirmAccountV2.user.lastName}`,
            Email: res?.data?.confirmAccountV2.user.email,
            Phone: `+91${number}`,
            Identity: `91${number}`,
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
              email,
              phone_no: phoneVariable,
            });
          }
          if (routeQuery?.redirect_from === "checkout") {
            Router.push(getUrlWithParams("/checkout/address"));
          }
          else if (routeQuery?.redirect_from === "pledge-a-tree") {
            Router.push(getUrlWithParams("/page/pledge-a-tree"));
          }
          else if (routeQuery?.redirect_to === "wallet") {
            Router.push(getUrlWithParams(walletUrl));
          } else if(!!routeQuery?.redirect_to){
            Router.push(getUrlWithParams(routeQuery?.redirect_to))
          }
          else{
            Router.push(getUrlWithParams("/?signin=true"));
          }
        }
      });

      setLoading(false);
    }
  };

  const handleSubmit = async (
    mutation?: MutationFn<OTPRequest, OTPRequestVariables>,
    type?: string,
    otp?: any
  ) => {
    if (!validatePhoneNumber(number)) {
      setErrorMsg("Enter Valid Phone number");
      return;
    }
    setLoading(true);
    if (type === "form" && mutation) {
      if (!number) {
        setLoading(false);

        setErrorMsg("Valid Phone Number is required");
        return;
      }
      mutation({
        variables: { phone: `+91${number}` },
      });
    } else {
      if (!otp) {
        setLoading(false);

        setErrorMsg("Valid OTP is required");
        return;
      }
      const id = checkout ? checkout.id : undefined;
      const { data } = await signInMobile(
        otp,
        `+91${number}`,
        null,
        false,
        false,
        recalculation_toggle,
        !isRecalculate
      );

      if (
        data?.CreateTokenOTP?.otpErrors &&
        data?.CreateTokenOTP?.otpErrors.length > 0
      ) {
        setErrorMsg(data?.CreateTokenOTP?.otpErrors[0].message);
      }
      if (data && data.CreateTokenOTP?.user?.id) {
        setErrorMsg("");

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
            user_ID: data.CreateTokenOTP?.user?.id ? getDBIdFromGraphqlId(data.CreateTokenOTP?.user?.id, "User") : undefined,
            user_type: data.CreateTokenOTP?.user ? "logged_in" : "logged_out", // Guest user or Loggedin user
            membership_status: isMember(data.CreateTokenOTP?.user)
              ? "plix_club_member"
              : "not_a_plix_club_member",
          });
        }

        const walletAmount = await getWalletAmount();

        const clevertap = makeClevertap();
        const ctp = {
          Name: `${data.CreateTokenOTP.user.firstName} ${data.CreateTokenOTP.user.lastName}`,
          Email: data.CreateTokenOTP.user.email,
          Phone: `+91${number}`,
          Identity: `91${number}`,
          "Net Cashback": walletAmount.data,
        };
        //
        clevertap.onUserLogin.push({
          Site: ctp,
        });
        if (routeQuery?.redirect_from === "checkout") {
          Router.push(getUrlWithParams("/checkout/address"));
        } if (routeQuery?.redirect_from === "pledge-a-tree") {
          Router.push(getUrlWithParams("/page/pledge-a-tree"));
        } else if (routeQuery?.redirect_to === "wallet") {
          Router.push(getUrlWithParams(walletUrl));
        }else if(!!routeQuery?.redirect_to){
          Router.push(getUrlWithParams(routeQuery?.redirect_to))
        }  else {
          Router.push(getUrlWithParams("/"));
        }
      }

      setLoading(false);
    }
  };

  const handleOtpResend = (mutation?: any) => {
    const user_email = isNewUser ? email : `phn${number}@dummy.com`;
    const phoneVariable = `+91${number}`;
    loginAutofill && handleWebOtp(mutation, "otp");

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
    if (mutation && !isNewUser) {
      mutation({
        variables: { phone: `+91${number}` },
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
      registerAccountV2(user_email, phoneVariable).then(res => {
        if (
          res?.data.accountRegisterV2.errors &&
          res?.data.accountRegisterV2.errors?.length
        ) {
          setErrorMsg(res?.data.accountRegisterV2.errors[0].message);
        }
        // setShowResend(false);
        // if (res?.data?.user && res?.data?.user?.id) {
        //   setType("otp");
        // }
      });
    }
  };

  useEffect(() => {
    if (timeCount === 0) {
      setShowResend(true);
      if (timerId) clearInterval(timerId);
      setTimerId(undefined);
    }
  }, [timeCount]);

  // Handle pasted OTP
  const handleOnPaste = (element: any, mutation: any) => {
    element?.preventDefault();
    const pasteData = element?.clipboardData
      .getData("text/plain")
      .toString()
      .slice(0, 4)
      .split("");

    const finalData = [...pasteData];
    // alert(finalData);
    setotptext([...finalData]);
    if (isNewUser && !mutation && finalData?.length === 4) {
      handleSubmitNew(type, finalData.join(""));
    } else if (mutation && finalData?.length === 4) {
      handleSubmit(mutation, type, finalData.join(""));
    }
  };

  const handleInputChange = (e: any) => {
    if (errorMsg) setErrorMsg("");
    const { value, name } = e.nativeEvent.target;
    if (type === "form") {
      if (name === "mobile") {
        setNumber(/^\d*$/.test(value) ? value : number);
      } else if (name === "email") {
        setEmail(value);
      }
    } else {
      setOtp(curr => (/^\d*$/.test(value) ? value : curr));
    }
  };
  //  OTP Handler
  const handleChange = (
    element: Event & HTMLInputElement,
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
    if (otptext[3].length > 0) {
      const otpAlltext: any = otptext.join("");
      setOtp(otpAlltext);
    }
  }, [otptext]);

  const getFormContent = (mutation?: any) => {
    return (
      <>
        <WebHeading>
          {type === "form"
            ? isNewUser
              ? `Login/Register`
              : `Login/Register`
            : "Verify Your Mobile Number"}
        </WebHeading>
        <DescriptionText margin="0px 0px 30px 0px">
          Get access to your orders, track previous order & Redeem Plixlife Cash
        </DescriptionText>

        {type === "form" && isNewUser && (
          <NewuserSignup>
            <NewUser>Looks like you don't have an account. </NewUser>
            <EnterEmailAddress>
              Please enter your email below to continue
            </EnterEmailAddress>
          </NewuserSignup>
        )}

        {type === "form" && (
          <LoginSignBox>
            <LoginBox>
              <ShowBox>
                <Form
                  onSubmit={e => {
                    e.preventDefault();
                    loginAutofill && handleWebOtp(mutation, "otp");
                    if (isNewUser && !mutation) {
                      handleSubmitNew(type, otp);
                    } else if (mutation) {
                      handleSubmit(mutation, type, otp);
                    }
                  }}
                >
                  <InputDiv>
                    {/* <DescriptionText margin="5px 0px">
                    {type === "form" ? "Phone number" : "OTP"}
                  </DescriptionText> */}
                    <CountryCode>+91</CountryCode>
                    <Input
                      type="text"
                      inputMode="tel"
                      name={type === "form" ? "mobile" : "otp"}
                      value={type === "form" ? number : otp}
                      placeholder="Phone XXXXX XXXXX"
                      onClick={e => {
                        if (!inputClicked && truecaller_config?.enabled) {
                          setInputClicked(true);
                          e.target.blur();
                        }
                      }}
                      onChange={(e: any) => {
                        e.target.value.length > 10
                          ? false
                          : handleInputChange(e);
                      }}
                      // placeholder={type === "form" ? "Mobile" : "OTP"}
                    />
                  </InputDiv>
                  {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
                  {type === "form" && isNewUser ? (
                    <InputDiv>
                      {/* <DescriptionText margin="5px 0px">E-mail</DescriptionText> */}
                      <Input
                        type="email"
                        inputMode="email"
                        name="email"
                        value={email}
                        placeholder="Email Address"
                        onChange={(e: any) => handleInputChange(e)}
                        // placeholder="Email"
                      />
                    </InputDiv>
                  ) : (
                    <></>
                  )}

                  <ButtonDiv>
                    <Button
                      fullWidth
                      type="submit"
                      testingContext="loginButton"
                      disabled={loading}
                      // endIcon={PlixLoginIcon}
                    >
                      {type === "form" && isNewUser
                        ? "Sign Up"
                        : type === "form"
                        ? "Login"
                        : "Verify"}
                    </Button>
                  </ButtonDiv>
                  {otplessEnabled?.enable ? (
                    <>
                      <OrDivider className="or-Divider">
                        <span />
                        <strong>OR</strong>
                        <span />
                      </OrDivider>
                      <div
                        className="whatsappLoginButtonWrapper-loginpage"
                        id="otpless"
                      ></div>
                    </>
                  ) : (
                    <></>
                  )}
                  {type === "form" && !isNewUser ? (
                    <PolicyText margin="16px 0px">
                      By continuing, you agree to{" "}
                      <MyCustomLink href={termsConditions}>
                        <span>Plixlife's terms</span> &<span> conditions</span>
                      </MyCustomLink>{" "}
                      and{" "}
                      <MyCustomLink href={privacyPolicy}>
                        <span>Privacy policy</span>
                      </MyCustomLink>
                    </PolicyText>
                  ) : (
                    <></>
                  )}

                  <Contactwrapper>
                    <span>Need Help?</span>
                    <button
                      onClick={() => {
                        customEventTrigger("contact_us_cta_click", user);
                      }}
                    >
                      <Link href="/page/contact-us">
                        <a>Contact Us</a>
                      </Link>
                    </button>
                  </Contactwrapper>
                </Form>
              </ShowBox>
            </LoginBox>
          </LoginSignBox>
        )}
        {type !== "form" && (
          <>
            <LoginBox>
              <ShowBox>
                <Form
                  onSubmit={e => {
                    e.preventDefault();
                    if (isNewUser && !mutation) {
                      handleSubmitNew(type, otp);
                    } else if (mutation) {
                      handleSubmit(mutation, type, otp);
                    }
                  }}
                >
                  <Span>{errorMsg}</Span>
                  <OtpWrapper>
                    {otptext.map((data, index) => {
                      return (
                        <input
                          className={`${errorMsg.length > 0 ? "errormsg" : ""}`}
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
                          type="tel"
                          name="otp"
                          maxLength={index === 3 ? 1 : 4}
                          key={index}
                          value={data}
                          placeholder="X"
                          onChange={e => handleChange(e, index, mutation)}
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
                  </OtpWrapper>
                  {type === "otp" ? (
                    <ResendDiv>
                      {showResend ? (
                        <ResendText
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
                          Resend OTP
                        </ResendText>
                      ) : timeCount !== 0 ? (
                        <span>
                          Resend OTP in <TimeText>(0:{timeCount})</TimeText>
                        </span>
                      ) : (
                        <></>
                      )}
                    </ResendDiv>
                  ) : (
                    <></>
                  )}
                  <ButtonDiv>
                    <Button
                      fullWidth
                      type="submit"
                      testingContext="loginButton"
                      disabled={loading}
                      // endIcon={PlixLoginIcon}
                    >
                      {type === "form" && isNewUser
                        ? "Sign Up"
                        : type === "form"
                        ? "Login"
                        : "Verify"}
                    </Button>
                  </ButtonDiv>
                  <PolicyText margin="16px 0px">
                    By continuing, you agree to <span>Plixlife's terms</span> &
                    <span> conditions</span> and <span>Privacy policy</span>
                  </PolicyText>
                </Form>
              </ShowBox>
            </LoginBox>
          </>
        )}
      </>
    );
  };

  const trueCallerLogin = (user:any) =>{
     if(user?.id){
      if (routeQuery?.redirect_from === "checkout") {
        Router.push(getUrlWithParams("/checkout/address"));
      }
      else if (routeQuery?.redirect_from === "pledge-a-tree") {
        Router.push(getUrlWithParams("/page/pledge-a-tree"));
      }
      else if (routeQuery?.redirect_to === "wallet") {
        Router.push(getUrlWithParams(walletUrl));
      } else if(!!routeQuery?.redirect_to){
        Router.push(getUrlWithParams(routeQuery?.redirect_to))
      }
      else if(isNewUser){
        Router.push(getUrlWithParams("/?signin=true"));
      }else{
        Router.push(getUrlWithParams("/"))
      }
     }
  }

  const renderForm = (mutation?: any) => (
    <FullContainer>
      <Container>
        {/* <Media
          query={{ maxWidth: mediumScreen }}
          render={() => getFormContent(mutation)}
        />
        <Media
          query={{ minWidth: mediumScreen }}
          render={() => (
          )}
        /> */}
        {inputClicked && truecaller_config?.enabled && <TruecallerLogin onLogin={trueCallerLogin}/>}
        <LoginContainerDesktop>
          <LoginFormContainer>{getFormContent(mutation)}</LoginFormContainer>
          <LoginImageContainer>
            <CachedImage url="https://plixlifefc-media.farziengineer.co/hosted/login_banner_image-3f14433690ab-edd03c5435b8.png" />
          </LoginImageContainer>
        </LoginContainerDesktop>
      </Container>
    </FullContainer>
  );

  if (show) {
    return (
      <>
        {loading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          <> </>
        )}
        {!isNewUser ? (
          <TypedRequestOTPMutation
            onCompleted={data => {
              if (data.RequestOTP?.otpErrors[0]?.code === "INVALID_PHONE") {
                setLoading(false);
                setErrorMsg("User doesn't exist, please sign up.");
                setTimeout(() => {
                  setIsNewUser(true);
                  setErrorMsg("");
                }, 1500);
              } else if (
                data.RequestOTP?.otpErrors[0]?.code === "INVALID_OTP"
              ) {
                setLoading(false);
                setTimeCount(0);
                setErrorMsg(data.RequestOTP?.otpErrors[0]?.message);
                setTimeout(() => {
                  setShowResend(true);
                  setErrorMsg("");
                }, 3000);
              } else {
                setTimeCount(15);
                setTimerId(
                  setInterval(() => {
                    setTimeCount(prevCount => prevCount - 1);
                  }, 1000)
                );
                setType("otp");
                setLoading(false);
                if (gtmConfig.loginFlow.enable) {
                  customEventTrigger(gtmConfig.loginFlow.value, user);
                }
              }
            }}
          >
            {mutation => {
              return renderForm(mutation);
            }}
          </TypedRequestOTPMutation>
        ) : (
          renderForm()
        )}
      </>
    );
  }

  return <> </>;
};
PlixLogin.displayName = "PlixLogin";
export default PlixLogin;
