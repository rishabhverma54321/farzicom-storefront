import React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { Button } from "@components/atoms/Button";
import { IconButton } from "@components/atoms/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
import CouponCodeImg from "@temp/images/couponCode.png";
import { FormattedMessage } from "react-intl";
import { Overlay, OverlayContextInterface } from "../..";
//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

interface ICouponCodeProps {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const CouponCode: React.FunctionComponent<ICouponCodeProps> = ({
  overlay,
  testingContext,
}) => {
  const { hide } = overlay;
  const discountAmount = "5% OFF";
  const discountCode = "EXTRA";

  const altText = `Get ${discountAmount}. Use code ${discountCode}`;
  return (
    <Overlay
      context={overlay}
      testingContext={testingContext}
      className="cc__overlay"
    >
      <div className="cc__conatiner">
        <div className="cc__conatiner__wrapper">
          <div className="cc__conatiner__wrapper__image">
            <img src={CouponCodeImg} alt={altText} />
          </div>
          <div className="cc__conatiner__wrapper__body">
            <div className="cc__conatiner__wrapper__body__line1">
              <FormattedMessage defaultMessage="Wait, you forgot your Coupon Code!" />
            </div>
            <p className="cc__conatiner__wrapper__body__line2">
              <FormattedMessage
                defaultMessage={`Extra ${discountAmount} expecially for you!`}
              />
            </p>
            <p className="cc__conatiner__wrapper__body__line3">
              <FormattedMessage defaultMessage={`Use Code: ${discountCode}`} />
            </p>
          </div>
          <MyCustomLink href="/" className="cc__conatiner__wrapper__link">
            <Button testingContext="continueShopping" size="sm">
              <FormattedMessage defaultMessage="Continue Shopping" />
            </Button>
          </MyCustomLink>
        </div>
        <div className="cc__conatiner__close">
          {/* <CloseIcon onClick={hide} /> */}
          <IconButton onClick={hide} name="x" testingContext="closeModal" />
        </div>
      </div>
    </Overlay>
  );
};

export default CouponCode;
