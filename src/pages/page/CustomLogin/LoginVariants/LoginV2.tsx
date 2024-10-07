import Input from "@components/farzicom-ui-kit/Input";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { useAuth, useAuthState } from "@saleor/sdk";
import React, { useState } from "react";
import PlixLogin from "@components/organisms/PlixLogin";
import MemoLeftArrowSVG from "../../../../images/profileSvg/LeftArrowSVG";
import styles from "../../index.module.scss";
import * as S from "../../styles";

const LoginV2 = () => {
  const initialState = {
    phone: {
      value: "",
      touched: false,
      hasError: true,
      error: "",
    },
    otp: {
      value: "",
      touched: false,
      hasError: true,
      error: "",
    },
    isFormValid: false,
  };
  const { signInMobile, requestOTP } = useAuth();
  const { authenticated } = useAuthState();
  const [formState, setformState] = useState(initialState);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const history = useCustomHistory();

  const validateInput = ({ name, value }) => {
    let hasError = false;
    let error = "";

    switch (name) {
      case "phone":
        if (value.trim() === "") {
          hasError = true;
          error = "Mobile cannot be empty";
        } else if (!/^[0-9]{10}$/.test(value)) {
          hasError = true;
          error = "Invalid Mobile Number. Use 10 digits only";
        } else {
          hasError = false;
          error = "";
        }
        break;

      case "otp":
        if (value.trim() === "") {
          hasError = true;
          error = "OTP cannot be empty";
        } else if (!/^[0-9]{6}$/.test(value)) {
          hasError = true;
          error = "Invalid OTP. Use 6 digits only";
        } else {
          hasError = false;
          error = "";
        }
        break;
    }

    return { hasError, error };
  };
  const handleOnChange = (event: any) => {
    const { name, value } = event.target;
    let isFormValid = true;

    const { hasError, error } = validateInput({ name, value });

    if (hasError) {
      isFormValid = false;
    }

    setformState(prevState => ({
      ...prevState,
      [name]: { ...prevState[name], value, hasError, error, touched: true },
      isFormValid: !hasError,
    }));
  };

  const handleNumberSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    let hasError = false;
    let error = "";
    switch (step) {
      case 0:
        if (!formState.phone.hasError) {
          const phone = `+91${formState.phone.value}`;
          const res = await requestOTP(phone);

          if (
            res.data &&
            !res.data.RequestOTP.otpErrors.length &&
            res.data.RequestOTP.message
          ) {
            setStep(1);
          }

          if (
            res.data.RequestOTP.otpErrors &&
            res.data.RequestOTP.otpErrors.length
          ) {
            hasError = true;
            error = res.data.RequestOTP.otpErrors[0].message;
            setformState(prevState => ({
              ...prevState,
              phone: {
                ...prevState.phone,
                hasError,
                error,
                touched: true,
              },
              isFormValid: false,
            }));
          }
        }
        break;
      case 1:
        if (!formState.otp.hasError) {
          const phone = `+91${formState.phone.value}`;
          const otp = formState.otp.value;
          const res = await signInMobile(otp, phone);

          if (
            res.data &&
            !res.data.CreateTokenOTP.otpErrors.length &&
            res.data.CreateTokenOTP.token
          ) {
            history.push("/");
          }

          if (
            res.data.CreateTokenOTP.otpErrors &&
            res.data.CreateTokenOTP.otpErrors.length
          ) {

            hasError = true;
            error = res.data.CreateTokenOTP.otpErrors[0].message;
            setformState(prevState => ({
              ...prevState,
              otp: {
                ...prevState.otp,
                hasError,
                error,
                touched: true,
              },
              isFormValid: false,
            }));
          }
        }
        break;
    }
    setLoading(false);
  };

  const current = step === 0 ? "phone" : "otp";

  // if (authenticated) {
  //   history.push("/");

  //   <div style={{ minHeight: "700px", position: "relative" }} />;
  // }
  return (
    <div style={{ minHeight: "700px", position: "relative" }}>
      <PlixLogin />
    </div>
  );
};
LoginV2.displayName = "LoginV2";
export default React.memo(LoginV2);
