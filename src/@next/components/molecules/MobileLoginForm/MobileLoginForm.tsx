import { Button } from "@components/atoms/Button";
import {
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components/Overlay";
import React, { useContext } from "react";

export interface IMobileLoginFormProps {}

export const MobileLoginForm: React.FC<IMobileLoginFormProps> = () => {
  const overlay = useContext(OverlayContext);
  const { show } = overlay;

  // const { user, signInMobile } = useAuth();

  // const handleSignInMobile = async (otp: string) => {
  //   const res = await signInMobile(mobileNumber, otp);
  //
  //
  //   hide();
  // };

  // const otpContext: InnerOverlayContextInterface = {
  //   data: {
  //     handlesubmit: handleSignInMobile,
  //   },
  // };
  return (
    <>
      {/* {!otpRequested ? (
        <>
          {" "}
          {show(
            OverlayType.mobileNumberInput,
            OverlayTheme.modal,
            mobileContext
          )}{" "}
        </>
      ) : (
        <>{show(OverlayType.otpInput, OverlayTheme.modal, otpContext)}</>
      )} */}
      <div>Hey</div>
      <Button
        testingContext="try"
        onClick={() => show(OverlayType.mobileNumberInput, OverlayTheme.modal)}
      >
        {" "}
        yo{" "}
      </Button>
    </>
  );
};

MobileLoginForm.displayName = "MobileLoginForm";
export default MobileLoginForm;
