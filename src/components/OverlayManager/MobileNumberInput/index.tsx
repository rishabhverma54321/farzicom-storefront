import React from "react";
// import CloseIcon from "@material-ui/icons/Close";

import { IconButton } from "@components/atoms/IconButton";
import { MobileNumberInputWithButton } from "@components/molecules/MobileNumberInputWithButton";
import MemoSideNavCloseIcon from "@components/atoms/SvgIcons/SideNavCloseIcon";
import { Overlay, OverlayContextInterface } from "../..";

// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";
import { Header } from "../WriteAReview/styles";

export interface IMobileNumberInput {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
  buttonText: string;
}

const MobileNumberInput: React.FC<IMobileNumberInput> = ({
  overlay,
  testingContext,
  buttonText,
}) => {
  const { hide } = overlay;

  return (
    <Overlay testingContext={testingContext} context={overlay}>
      <div className="MobileNumberInput">
        <Header className="WriteAReviewContainer__header">
          <div className="WriteAReviewContainer__header__text">
            Enter Mobile No.
          </div>

          <div onClick={hide} className="WriteAReviewContainer__header__close">
            {/* <IconButton
              name="x"
              size={32}
              testingContext="closeModal"
              onClick={hide}
              color="white"
            /> */}
            <MemoSideNavCloseIcon/>
          </div>
        </Header>
        <div className="body">
          <MobileNumberInputWithButton overlay={overlay} buttonText="Get OTP" />
        </div>
      </div>
    </Overlay>
  );
};

export default MobileNumberInput;
