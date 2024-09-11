import * as React from "react";
// import { FormattedMessage } from "react-intl";
import Cart from "../../../images/lotus-new/EmptyCart";

// import { Button } from "../..";

const Empty: React.FC = () => (
  <div className="cart__empty">
    <Cart width="5rem" height="5rem" margin="auto" />
    <span>Your Shopping Cart is Empty!</span>
    {/* <h4>
      <FormattedMessage defaultMessage="Your bag is empty" />
    </h4>
    <p>
      <FormattedMessage defaultMessage="You haven’t added anything to your bag. We’re sure you’ll find something in our store" />
    </p>
    <div className="cart__empty__action">
      <Button
        testingContext="emptyCartHideOverlayButton"
        secondary
        onClick={overlayHide}
      >
        <FormattedMessage defaultMessage="Continue Shopping" />
      </Button>
    </div> */}
  </div>
);

export default Empty;
