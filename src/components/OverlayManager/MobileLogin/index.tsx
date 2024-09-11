//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

import React from "react";
// import CloseIcon from "@material-ui/icons/Close";

import { OverlayContextInterface } from "../..";
// import { useAuth, useAuthState } from "@saleor/sdk";
// import {
//   MobileNumberInputWithButton,
//   OtpInputWithButton,
// } from "@components/molecules";

export interface IMobileLogin {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const MobileLogin: React.FC<IMobileLogin> = ({ overlay, testingContext }) => {
  //
  // const { hide } = overlay;
  // const [otpRequested, setotpRequested] = useState(false);
  // const [mobileNumber, setmobileNumber] = useState("");

  // const { user, signInMobile } = useAuth();

  // const handleSignInMobile = async (otp: string) => {
  //   const res = await signInMobile(mobileNumber, otp);
  //
  //
  //   hide();
  //   setotpRequested(false);
  // };
  return <> </>;

  // if (!otpRequested) {
  //   return (
  //     <Overlay testingContext={testingContext} context={overlay}>
  //       <div className="mobileLogin">
  //         <div className="header">
  //           <span> ENTER MOBILE NO.</span>
  //           <CloseIcon onClick={hide} className="modal-close-btn" />
  //         </div>
  //         <div className="body">
  //           <MobileNumberInputWithButton
  //             buttonText="Send OTP"
  //           />
  //         </div>
  //       </div>
  //     </Overlay>
  //   );
  // } else if (otpRequested) {
  //   return (
  //     <OtpInputWithButton
  //       handleSubmit={handleSignInMobile}
  //       buttonText="Verify OTP"
  //       testingContext={testingContext}
  //       overlay={overlay}
  //       setOTPRequested={setotpRequested}
  //     />
  //   );
  // }
};

export default MobileLogin;
