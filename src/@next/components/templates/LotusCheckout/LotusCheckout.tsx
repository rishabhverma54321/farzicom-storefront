import React, { useContext, useEffect } from "react";
import { useAuthState, useCartState } from "@saleor/sdk";
import { Loader } from "@components/atoms/Loader";
import Media from "react-media";
import ReactSVG from "react-svg";
import { largeScreen } from "@styles/constants";
import { continueShoppingButton } from "@components/organisms/NewThankYou";
import UserIcon from "../../../../images/lotus-new/UserIcon";
import PaymentOption from "../../../../images/lotus-new/pay.svg";

// import { TextWithIconWrapper } from "@app/pages/CheckoutPage/style";
import {
  OverlayType,
  OverlayTheme,
  OverlayContext,
} from "../../../../components/Overlay";

import * as S from "./styles";
import { IProps } from "./types";
import { CLIENT } from "Themes/config";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";
/**
 * Template for checkout page.
 */
const LotusCheckout: React.FC<IProps> = ({
  loading,
  checkout,
  cartSummary,
  totalPrice,
  button,
  showPrepaidOffer,
}: IProps) => {
  const overlay = useContext(OverlayContext);
  const { show } = overlay;
  const { user } = useAuthState();
  const { items } = useCartState();

  const handleClick = () => {
    show(OverlayType.mobileNumberInput, OverlayTheme.modal);
  };
  // Hide navbar in address screen
  useEffect(() => {
    const header = document.getElementsByClassName("headerNav")[0];
    header.classList.add("lotus-checkout-navbar-unsticky");
    return () => {
      header.classList.remove("lotus-checkout-navbar-unsticky");
    };
  }, []);

  return (
    <S.CheckoutContainer>
      {/* {!isMobile && (
      <ClientCollectionHeading client={CLIENT} heading="Checkout" />
    )} */}

      {loading && (
        <S.Loader>
          <Loader fullScreen />
        </S.Loader>
      )}
      {items?.length ? (
        <S.Wrapper>
          <div>
            {CLIENT == clients.WOW_HEALTH_NEW ? (
              <></>
            ) : (
              <>
                {!user && (
                  <S.LoginSection>
                    <S.LoginContent>
                      <UserIcon />
                      <span>Already a member?</span>
                    </S.LoginContent>
                    <S.StyledButton
                      testingContext="login"
                      onClick={() => handleClick()}
                      size="sm"
                    >
                      Login Now
                    </S.StyledButton>
                  </S.LoginSection>
                )}
              </>
            )}

            <S.Checkout>{checkout}</S.Checkout>
          </div>

          <S.CartSummarySection>
            <Media
              query={{ minWidth: largeScreen }}
              render={() => (
                <>
                  <S.CartSummary>{cartSummary}</S.CartSummary>

                  <S.OrderButton
                    style={{
                      marginBottom: "40px",
                    }}
                  >
                    {button}
                  </S.OrderButton>
                </>
              )}
            />
            <Media
              query={{ maxWidth: largeScreen }}
              render={() => (
                <>
                  <S.StickyBottom>
                    <S.CheckoutButtons>
                      <div className="priceContainer">
                        <S.PriceWrapper>
                          <S.CheckoutPrice>
                            {`₹ ${totalPrice?.net?.amount?.toFixed(2)}`}
                          </S.CheckoutPrice>
                          <S.CheckoutPriceLabel>Total</S.CheckoutPriceLabel>
                        </S.PriceWrapper>
                      </div>

                      <S.ButtonCheckout>{button}</S.ButtonCheckout>
                    </S.CheckoutButtons>
                  </S.StickyBottom>
                </>
              )}
            />

            <S.SecurePaymentWrapper>
              <S.SecurePaymentTag>100% secure payment</S.SecurePaymentTag>
              <ReactSVG path={PaymentOption} />
            </S.SecurePaymentWrapper>
          </S.CartSummarySection>
        </S.Wrapper>
      ) : (
        <div style={{ marginTop: "100px" }}>{continueShoppingButton()}</div>
      )}
    </S.CheckoutContainer>
  );
};

export { LotusCheckout };
