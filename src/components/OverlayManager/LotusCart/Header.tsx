import * as React from "react";

import { FormattedMessage } from "react-intl";
import CartImg from "../../../images/lotus-new/CartPageIcon";
import CloseImg from "../../../images/lotus-new/CartClose";
import MemoCartIcon from "@components/atoms/SvgIcons/CartIcon";
import MemoCartLotus from "@components/atoms/SvgIcons/CartLotus";
//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

const Empty: React.FC<{ overlayHide(): void }> = ({ overlayHide }) => (
  <>
    <div className="overlayFarzicom__header">
      {/* <CartImg className="overlayFarzicom__header__cart-icon" /> */}
      <MemoCartIcon
        fontSize="24px"
        className="overlayFarzicom__header__cart-icon"
      />
      <div className="overlayFarzicom__header__text">
        <FormattedMessage defaultMessage="Your Shopping Cart" />
      </div>
      <CloseImg
        className="overlayFarzicom__header__close-icon"
        onClick={overlayHide}
      />
    </div>
    <div className="overlayFarzicom__offer-shipping">
      <span className="overlayFarzicom__offer-shipping__strip">
        Free shipping on all orders
      </span>
    </div>
  </>
);

export default Empty;
