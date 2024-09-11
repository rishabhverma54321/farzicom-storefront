import RightArrow from "@components/atoms/CustomInput/RightArrow";
import React, { useState, useRef } from "react";
import { useAuth, useAuthState } from "@saleor/sdk";
import { TypedRequestOTPMutation } from "@temp/components/OverlayManager/MobileNumberInput/queries";
import { useCustomHistory } from "@hooks/useCustomHistory";
import * as S from "./style";
import MemoYarnIcon from "./YarnIcon";
import { CustomInput } from "../../atoms/CustomInput/CustomInput";
import { TypedCreateUserMetaMutation } from "./mutations";
import { TypedCompanyNameListingQuery } from "./queries";
import ResultSection from "./ResultSection";

export interface IYarnLoginProps {}

export const YarnLogin: React.FC<IYarnLoginProps> = () => {
  const [state, setState] = useState(1);
  const [type, setType] = useState("signup");
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [yourName, setYourName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [resultOutput, setResultOutput] = useState<any>([]);
  const [companyList, setCompanyList] = useState<any>("");
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");
  const otp1Ref = useRef();
  const otp2Ref = useRef();
  const otp3Ref = useRef();
  const otp4Ref = useRef();
  const otp5Ref = useRef();
  const otp6Ref = useRef();
  const history = useCustomHistory();
  const { registerAccountV2, confirmAccountV2, user } = useAuth();
  // const disablePhoneBtn = phone.length !== 10 && state === 1;
  const handleValueChange = (e: any, yourRef: any) => {
    const { value, name } = e.nativeEvent.target;
    const isNum = /^\d+$/.test(value);
    switch (name) {
      case "phone": {
        const isNum = /^\d+$/.test(value);
        if (isNum || !value.length) {
          setErrorMsg("");
          setPhone(value);
        } else {
          setErrorMsg("Please enter a valid phone number.");
        }
        break;
      }
      case "yourName": {
        setErrorMsg("");
        setYourName(value);
        break;
      }
      case "companyName": {
        setErrorMsg("");
        if (!companyId) {
          setCompanyName(value);
        }
        if (companyId && companyName) {
          setCompanyName(value);
          setCompanyId("");
        }
        const filteredCompany = companyList.filter(({ node }: { node: any }) =>
          node.companyName.toLowerCase().startsWith(value.toLowerCase())
        );
        if (filteredCompany.length) {
          setResultOutput(filteredCompany);
        }
        break;
      }
      case "otp-1": {
        if (isNum || !value.length) {
          setOtp1(value);
          setErrorMsg("");
        } else {
          setErrorMsg("Enter a valid OTP.");
        }
        if (value.length && isNum) {
          yourRef.current.focus();
        }
        break;
      }
      case "otp-2": {
        if (isNum || !value.length) {
          setOtp2(value);
          setErrorMsg("");
        } else {
          setErrorMsg("Enter a valid OTP.");
        }
        if (value.length && isNum) {
          yourRef.current.focus();
        }
        break;
      }
      case "otp-3": {
        if (isNum || !value.length) {
          setOtp3(value);
          setErrorMsg("");
        } else {
          setErrorMsg("Enter a valid OTP.");
        }
        if (value.length && isNum) {
          yourRef.current.focus();
        }
        break;
      }
      case "otp-4": {
        if (isNum || !value.length) {
          setOtp4(value);
          setErrorMsg("");
        } else {
          setErrorMsg("Enter a valid OTP.");
        }
        if (value.length && isNum) {
          yourRef.current.focus();
        }
        break;
      }
      case "otp-5": {
        if (isNum || !value.length) {
          setOtp5(value);
          setErrorMsg("");
        } else {
          setErrorMsg("Enter a valid OTP.");
        }
        if (value.length && isNum) {
          yourRef.current.focus();
        }
        break;
      }
      case "otp-6": {
        if (isNum || !value.length) {
          setOtp6(value);
          setErrorMsg("");
        } else {
          setErrorMsg("Enter a valid OTP.");
        }
        if (value.length && isNum) {
          yourRef.current.focus();
        }
        break;
      }
      default:
    }
  };
  const handleChange = (e: any, mutation: any, createUserMutation: any) => {
    e.preventDefault();
    switch (state) {
      case 1: {
        const email = `phn${phone}@dummy.com`;
        const phoneVariable = `+91${phone}`;
        if (phone.length === 10) {
          registerAccountV2(email, phoneVariable).then(res => {
            if (res.dataError) {
              // mutation({
              //   variables: { phone: phoneVariable },
              // });
              // setType("login");
              // setErrorMsg(res.dataErr)
            }
            if (res?.data?.user && res?.data?.user?.id) {
              if (res.data.isActiveUser) {
                setType("login");
                setState(prev => prev + 1);
              } else {
                setType("signup");
                setState(prev => prev + 1);
              }
            }
          });
        } else {
          setErrorMsg("Enter a valid 10 digit phone number.");
        }
        break;
      }
      case 2: {
        const phoneVariable = `+91${phone}`;
        const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;
        if (otp.length === 6) {
          confirmAccountV2(otp, phoneVariable).then(res => {
            if (res.dataError) {
              setErrorMsg(res.dataError.error[0].message);
            }
            if (res.data) {
              if (type === "login")
                history.push({
                  pathname: "/",
                  state: {
                    showOnBoardingLogo: true,
                  },
                });
              if (type === "signup") setState(prev => prev + 1);
            }
          });
        }
        if (otp.length === 0) {
          return setErrorMsg("No OTP entered.");
        }
        if (otp.length < 6) {
          return setErrorMsg("Valid OTP of length 6 is required.");
        }

        break;
      }
      case 3: {
        const firstName = yourName.split(" ")[0];
        const lastName = yourName.split(" ")[1];
        const company = companyId;
        if (yourName && company) {
          createUserMutation({
            variables: {
              userId: user?.id,
              input: { firstName, lastName, company },
            },
          });
        } else if (!yourName && !company) {
          return setErrorMsg("Fill the required field.");
        } else if (!company) {
          return setErrorMsg("Select a company from the available one.");
        } else if (!yourName) {
          return setErrorMsg("Enter your name.");
        }

        break;
      }
      default:
    }
  };
  const handleBackspaceCursor = (e: any, yourRef: any) => {
    const { value } = e.target;
    if (value.length === 0 && e.keyCode === 8) {
      yourRef.current.focus();
    }
  };
  const renderSwitch = () => {
    switch (state) {
      case 1:
        return (
          <div className="flex">
            <CustomInput
              ClassName="CountryCode"
              placeholder="+91"
              value="+91"
              readOnly
              name="countryCode"
            />
            <CustomInput
              ClassName="Input"
              name="phone"
              value={phone}
              onChange={(e: any) => handleValueChange(e, "phone")}
            />
          </div>
        );

      case 2:
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomInput
              ClassName="OTPStyle"
              placeholder="-"
              maxLength={1}
              name="otp-1"
              value={otp1}
              inputRef={otp1Ref}
              onKeyDown={(e: any) => handleBackspaceCursor(e, otp1Ref)}
              onChange={(e: any) => handleValueChange(e, otp2Ref)}
            />
            <CustomInput
              ClassName="OTPStyle"
              placeholder="-"
              maxLength={1}
              name="otp-2"
              value={otp2}
              inputRef={otp2Ref}
              onKeyDown={(e: any) => handleBackspaceCursor(e, otp1Ref)}
              onChange={(e: any) => handleValueChange(e, otp3Ref)}
            />
            <CustomInput
              ClassName="OTPStyle"
              placeholder="-"
              maxLength={1}
              name="otp-3"
              value={otp3}
              inputRef={otp3Ref}
              onKeyDown={(e: any) => handleBackspaceCursor(e, otp2Ref)}
              onChange={(e: any) => handleValueChange(e, otp4Ref)}
            />
            <CustomInput
              ClassName="OTPStyle"
              placeholder="-"
              maxLength={1}
              name="otp-4"
              value={otp4}
              inputRef={otp4Ref}
              onKeyDown={(e: any) => handleBackspaceCursor(e, otp3Ref)}
              onChange={(e: any) => handleValueChange(e, otp5Ref)}
            />
            <CustomInput
              ClassName="OTPStyle"
              placeholder="-"
              maxLength={1}
              name="otp-5"
              value={otp5}
              inputRef={otp5Ref}
              onKeyDown={(e: any) => handleBackspaceCursor(e, otp4Ref)}
              onChange={(e: any) => handleValueChange(e, otp6Ref)}
            />
            <CustomInput
              ClassName="OTPStyle"
              placeholder="-"
              maxLength={1}
              name="otp-6"
              value={otp6}
              inputRef={otp6Ref}
              onKeyDown={(e: any) => handleBackspaceCursor(e, otp5Ref)}
              onChange={(e: any) => handleValueChange(e, otp6Ref)}
            />
          </div>
        );

      case 3:
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <CustomInput
              ClassName="InputInfo"
              placeholder="Your Name"
              name="yourName"
              value={yourName}
              onChange={(e: any) => handleValueChange(e, "yourName")}
            />
            <CustomInput
              ClassName="InputInfo"
              placeholder="Company Name"
              name="companyName"
              value={companyName}
              onChange={(e: any) => handleValueChange(e, "companyName")}
              autoComplete="off"
            />
            {resultOutput.length !== 0 && companyName.length !== 0 && (
              <S.Result className="result">
                <div className="result--body">
                  {resultOutput.map(({ node }: { node: any }) => (
                    <ResultSection
                      item={node}
                      key={node.id}
                      selectCompanyFun={setCompanyName}
                      setCompanyId={setCompanyId}
                      undoResultFun={setResultOutput}
                    />
                  ))}
                </div>
              </S.Result>
            )}
          </div>
        );

      default:
        setState(1);
        return (
          <div className="flex">
            <CustomInput
              ClassName="CountryCode"
              placeholder="+91"
              value="+91"
              readOnly
              name="countryCode"
            />
            <CustomInput
              ClassName="Input"
              LeftIcon={<MemoYarnIcon />}
              name="phone"
            />
          </div>
        );
    }
  };
  return (
    <>
      <TypedRequestOTPMutation
        onCompleted={data => {
          if (data.RequestOTP?.otpErrors[0]?.code === "INVALID_PHONE") {
            // setLoading(false);
            setErrorMsg("Valid Phone Number is required");
          } else {
            // setLoading(false);
            setState(2);
          }
        }}
      >
        {mutation => {
          return (
            <TypedCreateUserMetaMutation
              onCompleted={data => {
                if (data.createUserMeta?.userMeta?.id) {
                  history.push({
                    pathname: "/page/select-category",
                    state: {
                      userMetaId: data.createUserMeta?.userMeta?.id,
                    },
                  });
                } else {
                  setErrorMsg("Try Again...");
                }
              }}
            >
              {createUserMutation => (
                <TypedCompanyNameListingQuery>
                  {({ data }) => {
                    if (data && !companyList) {
                      setCompanyList(data?.companies?.edges);
                    }
                    return (
                      <S.Container>
                        <S.LoginSection>
                          <div className="login-position">
                            <S.WelcomeMsg>
                              <p>Explore new ways to trade yarn with </p>
                              <p>The Yarn Bazaar </p>
                            </S.WelcomeMsg>
                            <S.LoginContainer>
                              <S.LoginHeader>
                                {state === 1
                                  ? "Enter Phone Number for verification"
                                  : state === 2
                                  ? "Verify your phone number"
                                  : "Enter your account information"}
                              </S.LoginHeader>
                              <S.LoginDescription>
                                {state === 1 &&
                                  "Please enter your phone number, an OTP will be sent to you, which will allow you to login/signup."}
                                {state === 2 &&
                                  "Please enter your OTP sent to your mobile number."}
                                {state === 3 &&
                                  "Enter your basic profile info so that we can create an account for you, you will have to complete your profile to carry out any actions."}
                              </S.LoginDescription>
                              <form
                                onSubmit={e =>
                                  handleChange(e, mutation, createUserMutation)
                                }
                              >
                                <div className="flexInfo">{renderSwitch()}</div>
                                <S.ErrorMsg>{errorMsg}</S.ErrorMsg>
                                <S.Continue
                                  type="submit"
                                  // disabled={
                                  //   state === 1
                                  //     ? disablePhoneBtn
                                  //     : state === 2
                                  //     ? disableOtpBtn
                                  //     : false
                                  // }
                                  // disableProp={disablePhoneBtn || disableOtpBtn}
                                >
                                  <span>
                                    {state === 1 ? "Continue" : "Next"}
                                  </span>
                                  <span>
                                    <RightArrow className="right-arrow" />
                                  </span>
                                </S.Continue>
                              </form>

                              {/* {state === 1 && (
                                <div className="SocialLogin">
                                  <S.SocialBtn>
                                    <span>
                                      <MemoGoogle />
                                    </span>
                                    <span>Google</span>
                                  </S.SocialBtn>
                                  <S.SocialBtn>
                                    <span>
                                      <MemoFacebook />
                                    </span>
                                    <span>Facebook</span>
                                  </S.SocialBtn>
                                </div>
                              )} */}
                            </S.LoginContainer>
                          </div>
                        </S.LoginSection>
                      </S.Container>
                    );
                  }}
                </TypedCompanyNameListingQuery>
              )}
            </TypedCreateUserMetaMutation>
          );
        }}
      </TypedRequestOTPMutation>
    </>
  );
};
YarnLogin.displayName = "YarnLogin";
export default YarnLogin;
