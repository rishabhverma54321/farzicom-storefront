//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

import React, { useContext } from "react";
import { Redirect } from "react-router";

import { useAuth, useAuthState } from "@saleor/sdk";

import { Offline, OfflinePlaceholder, Online, OverlayContext } from "..";

import CheckoutAsGuest from "./CheckoutAsGuest";
import SignInForm from "./SignInForm";
import { OverlayType, OverlayTheme } from "../Overlay";

const CheckoutLogin: React.FC<{}> = () => {
  const overlay = useContext(OverlayContext);
  const { user } = useAuthState();
  const { show } = overlay;

  const showPasswordResetOverlay = () => {
    show(OverlayType.password, OverlayTheme.right);
  };

  if (user) {
    return <Redirect to="/checkout/" />;
  }
  return (
    <div className="container">
      <Online>
        <div className="checkout-login">
          <CheckoutAsGuest overlay={overlay} checkoutUrl="/checkout/" />
          <div className="checkout-login__user">
            <SignInForm onForgottenPasswordClick={showPasswordResetOverlay} />
          </div>
        </div>
      </Online>
      <Offline>
        <OfflinePlaceholder />
      </Offline>
    </div>
  );
};

export default CheckoutLogin;
