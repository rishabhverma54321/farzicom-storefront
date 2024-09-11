import React, { useEffect, useState } from "react";
import { MutationFn } from "react-apollo";
import { TypedRequestOTPMutation } from "@temp/components/OverlayManager/MobileNumberInput/queries";
import { useAuth, useCheckout, useWallet, useAuthState } from "@saleor/sdk";

import {
  OTPRequest,
  OTPRequestVariables,
} from "@temp/components/OverlayManager/MobileNumberInput/gqlTypes/OTPRequest";
import { useCustomHistory } from "@hooks/useCustomHistory";
// import { history } from "../../../../history";
import { Loader } from "@components/atoms/Loader";
import { Button } from "@components/atoms/Button";

import { META_DEFAULTS } from "Themes/config";
import makeClevertap from "Themes/lib/makeClevertap.js";
import { validatePhoneNumber } from "./PhoneNumberValidation";
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
} from "./styles";
import { useCustomLocation } from "@hooks/useCustomLocation";

// @ts-ignore
// @ts-check
export interface ILoginProps {}

export const Login: React.FC<ILoginProps> = ({}) => {
  const [number, setNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [type, setType] = useState("number");
  const { signInMobile } = useAuth();
  const { checkout } = useCheckout();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useCustomLocation();
  const history = useCustomHistory();

  const { authenticated, authenticating, user } = useAuthState();

  const { url } = location.state ? location.state : "/";

  // const { getWalletAmount } = useWallet();

  // useEffect(() => {
  //   if (user && location.pathname === "/page/login" && !loading) {
  //     if (url && url === "/order-placed") history.push("/");
  //     else history.goBack();
  //   }
  // }, [user, loading]);

  const handleSubmit = async (
    mutation?: MutationFn<OTPRequest, OTPRequestVariables>
  ) => {
    if (!validatePhoneNumber(number)) {
      setErrorMsg("Enter Valid Phone number");
      return;
    }
    setLoading(true);
    if (type === "number" && mutation) {
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
      const { data, dataError } = await signInMobile(otp, `+91${number}`);
      if (dataError && dataError.error && dataError.error.length > 0) {
        setErrorMsg(dataError.error[0].message);
      }

      if (data && data.id) {
        setErrorMsg("");
        // const walletAmount = await getWalletAmount();
        const walletAmount = { data: 0 };
        const clevertap = makeClevertap();
        const ctp = {
          Name: `${data.firstName} ${data.lastName}`,
          Email: data.email,
          Phone: `+91${number}`,
          Identity: `+91${number}`,
          "Net Cashback": walletAmount.data,
        };
        //
        clevertap.onUserLogin.push({
          Site: ctp,
        });
      }

      setLoading(false);
      // history.goBack();
    }
  };
  const handleInputChange = (e: any) => {
    if (errorMsg) setErrorMsg("");
    const { value } = e.nativeEvent.target;
    if (type === "number") {
      setNumber(/^\d*$/.test(value) ? value : number);
    } else {
      setOtp(curr => (/^\d*$/.test(value) ? value : curr));
    }
  };

  const renderForm = (
    mutation?: MutationFn<OTPRequest, OTPRequestVariables>
  ) => (
    <FullContainer>
      <Container>
        <WebHeading>
          {type === "number"
            ? `Login With ${META_DEFAULTS.name}`
            : "Verify Your Mobile"}
        </WebHeading>
        <LoginSignBox>
          <LoginBox>
            <ShowBox>
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  if (type === "number") handleSubmit(mutation);
                  else handleSubmit();
                }}
              >
                <InputDiv>
                  <Input
                    type="text"
                    inputMode="tel"
                    name={type === "number" ? "mobile" : "otp"}
                    value={type === "number" ? number : otp}
                    onChange={(e: any) => handleInputChange(e)}
                    placeholder={type === "number" ? "Mobile" : "OTP"}
                  />
                  <Span>{errorMsg}</Span>
                </InputDiv>
                <ButtonDiv>
                  <div style={{ display: "flex" }}>
                    <Button
                      type="submit"
                      color="secondary"
                      testingContext="loginButton"
                    >
                      {type === "number" ? "Login with OTP" : "Submit"}
                    </Button>
                  </div>
                </ButtonDiv>
              </Form>
            </ShowBox>
          </LoginBox>
        </LoginSignBox>
      </Container>
    </FullContainer>
  );

  if (loading) return <Loader />;

  return type === "number" ? (
    <TypedRequestOTPMutation
      onCompleted={data => {
        if (data.RequestOTP?.otpErrors[0]?.code === "INVALID_PHONE") {
          setLoading(false);
          setErrorMsg("Valid Phone Number is required");
        } else {
          setLoading(false);
          setType("otp");
        }
      }}
    >
      {mutation => {
        return renderForm(mutation);
      }}
    </TypedRequestOTPMutation>
  ) : (
    renderForm()
  );
};
Login.displayName = "Login";
export default Login;
