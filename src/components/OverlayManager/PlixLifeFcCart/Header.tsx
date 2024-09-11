import MemoNewCartcloseIcon from "@components/atoms/SvgIcons/NewCartcloseIcon";
import * as React from "react";

import { FormattedMessage } from "react-intl";
import CloseImg from "../../../images/lotus-new/CartClose";
//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

const Empty: React.FC<{ overlayHide(): void }> = ({ overlayHide }) => (
  <>
    <div className="overlayFarzicom__header">
      <div className="overlayFarzicom__header__text">
        <FormattedMessage id="shopping-cart" defaultMessage="Shopping Cart" />
      </div>
      {/* <CloseImg
        className="overlayFarzicom__header__close-icon"
        onClick={overlayHide}
      /> */}
      <div className="cart_closebutton" onClick={overlayHide}>
        <MemoNewCartcloseIcon width={16} height={16} />
      </div>
    </div>
  </>
);

export default Empty;
