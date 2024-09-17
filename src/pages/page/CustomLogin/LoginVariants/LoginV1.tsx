import Input from "@components/farzicom-ui-kit/Input";
import { useCustomHistory } from "@hooks/useCustomHistory";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth, useAuthState } from "@saleor/sdk";
import MemoLeftArrowSVG from "../../../../images/profileSvg/LeftArrowSVG";
import React, { useState } from "react";
import styles from "../../index.module.scss";
import * as S from "../../styles";

const LoginV1 = () => {
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
    let hasError = false,
      error = "";

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
    // console.log(name, value);
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
    let hasError = false,
      error = "";
    switch (step) {
      case 0:
        if (!formState.phone.hasError) {
          const phone = `+91${formState.phone.value}`;
          const res = await requestOTP(phone);
          // console.log(res);

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
            // console.log("res signInMobile error", res);

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

  if (authenticated) {
    history.push("/");

    return <></>;
  }
  return (
    <S.MainContainer className={styles.mainContainer} loading={loading}>
      {loading && (
        <div className={styles.loader}>
          <CircularProgress color="inherit" />
        </div>
      )}
      <div className={styles.loginHeader}> Login </div>
      <div className={styles.formContainer}>
        <form className={styles.login} onSubmit={handleNumberSubmit}>
          <Input
            variant={1}
            type="text"
            customStyles={styles}
            onChange={handleOnChange}
            name={step === 0 ? "phone" : "otp"}
            placeholder={step === 0 ? "Phone" : "OTP"}
            value={step === 0 ? formState.phone.value : formState.otp.value}
            inputMode="tel"
          />

          <div className={styles.errorMessage}>
            {formState[current].touched && formState[current].hasError && (
              <>{formState[current].error}</>
            )}
          </div>

          <Input
            variant={2}
            type="submit"
            value="Submit"
            customStyles={styles}
            customStylesName="loginButton"
          />

          {step === 1 ? (
            <div
              className={styles.additionalOptions}
              onClick={() => setStep(0)}
            >
              <div className={styles.backContainer}>
                <MemoLeftArrowSVG />
                <span className={styles.backText}> Back </span>
              </div>
            </div>
          ) : (
            <> </>
          )}
        </form>
      </div>
    </S.MainContainer>
  );
};
LoginV1.displayName = "LoginV1";
export default React.memo(LoginV1);
