import React, { useContext } from "react";
import { useAuth, useAuthState } from "@saleor/sdk";
import { Loader } from "@components/atoms/Loader";
import { TextWithIcon } from "@components/atoms/TextWithIcon";
import { ClientCollectionHeading } from "@components/atoms/ClientCollectionHeading";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { TextWithIconWrapper } from "@app/pages/CheckoutPage/style";
import { useIsMobile } from "@hooks/useIsMobile";
import { CLIENT } from "Themes/config";
import { ImageCard } from "@components/atoms/ImageCard";
import Media from "react-responsive";
import { mediumScreen } from "@styles/constants";
import {
  OverlayType,
  OverlayTheme,
  OverlayContext,
} from "../../../../components/Overlay";
import BackButton from "./assets/BackButton.svg";
import FreeShipping from "./assets/FreeShipping.svg";
import CODAvailable from "./assets/CODAvailable.svg";
import PlixCheckout1 from "./assets/PlixCheckout1.svg";
import PlixCheckout2 from "./assets/PlixCheckout2.svg";
import PlixCheckout3 from "./assets/PlixCheckout3.svg";
import * as S from "./styles";
import { IProps } from "./types";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";

/**
 * Template for checkout page.
 */
const Checkout: React.FC<IProps> = ({
  loading,
  checkout,
  cartSummary,
  totalPrice,
  button,
  showPrepaidOffer,
}: IProps) => {
  const history = useCustomHistory();
  const overlay = useContext(OverlayContext);
  const { show } = overlay;
  const { user } = useAuthState();
  const isMobile = useIsMobile();
  const handleClick = () => {
    show(OverlayType.mobileNumberInput, OverlayTheme.modal);
  };
  return (
    <>
      {CLIENT === clients.PLIXLIFEFC || CLIENT === clients.BODY_FIRST ? (
        <>
          {loading && (
            <S.Loader>
              <Loader fullScreen />
            </S.Loader>
          )}
          <Media maxWidth={mediumScreen}>
            <S.CheckoutContainer>
              <S.TopTitleSection>
                <S.TopTitleSubSection>
                  <button
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    <img src={BackButton} />
                  </button>
                  &nbsp; <S.SectionTitle>Order Summary</S.SectionTitle>
                </S.TopTitleSubSection>
              </S.TopTitleSection>
              <S.Wrapper>
                <S.CartSummarySection>
                  <S.CartSummary>{cartSummary}</S.CartSummary>
                </S.CartSummarySection>
                <S.Checkout>
                  <S.TopTitleSection>
                    <S.TopTitleSubSection>
                      <S.SectionTitle>Contact Information</S.SectionTitle>
                    </S.TopTitleSubSection>

                    {!user && (
                      <S.LoginSection>
                        <span>Already have an account?</span>
                        {/* <S.StyledButton
                        testingContext="login"
                        onClick={() => handleClick()}
                        size="sm"
                        color="secondary"
                      >
                        Login
                      </S.StyledButton> */}
                        <S.LoginButton
                          testingContext="login"
                          onClick={() => handleClick()}
                          size="sm"
                          color="secondary"
                        >
                          Login
                        </S.LoginButton>
                      </S.LoginSection>
                    )}
                  </S.TopTitleSection>
                  {checkout}
                  <S.CheckoutButtons>
                    <S.CheckoutButton>{button}</S.CheckoutButton>
                  </S.CheckoutButtons>
                </S.Checkout>
              </S.Wrapper>
            </S.CheckoutContainer>
            <S.CheckoutBottomSection>
              <img src={PlixCheckout1} className="CheckoutBottomDesign1" />
              <S.CheckoutBottomCardSection>
                <ImageCard
                  src={FreeShipping}
                  title="Free Shipping"
                  description="On orders above Rs.450"
                  className="checkoutBottomCard"
                />
                <ImageCard
                  src={CODAvailable}
                  title="COD Available"
                  description="No Minimum Order Value"
                  className="checkoutBottomCard"
                />
                <img src={PlixCheckout3} className="CheckoutBottomDesign3" />
              </S.CheckoutBottomCardSection>
              <S.CheckoutBottomContactSection />
            </S.CheckoutBottomSection>
          </Media>
          <Media minWidth={mediumScreen}>
            <S.CheckoutContainer>
              <S.Wrapper>
                <S.Checkout>
                  <S.TopTitleSection>
                    <S.TopTitleSubSection>
                      <button
                        onClick={() => {
                          history.goBack();
                        }}
                      >
                        <img src={BackButton} />
                      </button>

                      <S.SectionTitle>
                        &nbsp; Contact Information
                      </S.SectionTitle>
                    </S.TopTitleSubSection>

                    {!user && (
                      <S.LoginSection>
                        <span>Already have an account?</span>
                        {/* <S.StyledButton
                        testingContext="login"
                        onClick={() => handleClick()}
                        size="sm"
                        color="secondary"
                      >
                        Login
                      </S.StyledButton> */}
                        <S.LoginButton
                          testingContext="login"
                          onClick={() => handleClick()}
                          size="sm"
                          color="secondary"
                        >
                          Login
                        </S.LoginButton>
                      </S.LoginSection>
                    )}
                  </S.TopTitleSection>
                  {checkout}
                  <S.StickyBottom>
                    <S.CheckoutButtons>
                      <S.CheckoutPrice testingContext="checkout price">
                        {`₹ ${totalPrice?.net?.amount?.toFixed(2)}`}
                      </S.CheckoutPrice>
                      <S.CheckoutButton>{button}</S.CheckoutButton>
                    </S.CheckoutButtons>
                  </S.StickyBottom>
                </S.Checkout>
                <S.CartSummarySection>
                  <S.CartSummary>{cartSummary}</S.CartSummary>
                </S.CartSummarySection>
              </S.Wrapper>
            </S.CheckoutContainer>
            <S.CheckoutBottomSection>
              <img src={PlixCheckout1} className="CheckoutBottomDesign1" />
              <S.CheckoutBottomCardSection>
                <ImageCard
                  src={FreeShipping}
                  title="Free Shipping"
                  description="On orders above Rs.450"
                  className="checkoutBottomCard"
                />
                <ImageCard
                  src={CODAvailable}
                  title="COD Available"
                  description="No Minimum Order Value"
                  className="checkoutBottomCard"
                />
                <img src={PlixCheckout3} className="CheckoutBottomDesign3" />
              </S.CheckoutBottomCardSection>
            </S.CheckoutBottomSection>
          </Media>
        </>
      ) : (
        <S.CheckoutContainer>
          {!isMobile && (
            <ClientCollectionHeading client={CLIENT} heading="Checkout" />
          )}
          {!user && (
            <div className="container">
              <S.LoginSection>
                <span>Already a registered user?</span>
                <S.StyledButton
                  testingContext="login"
                  onClick={() => handleClick()}
                  size="sm"
                  color="secondary"
                >
                  Login
                </S.StyledButton>
              </S.LoginSection>
            </div>
          )}

          {loading && (
            <S.Loader>
              <Loader fullScreen />
            </S.Loader>
          )}
          <S.Wrapper>
            <S.Checkout>{checkout}</S.Checkout>
            <S.CartSummarySection>
              <S.CartSummary>{cartSummary}</S.CartSummary>
              <S.StickyBottom>
                {showPrepaidOffer && (
                  <TextWithIconWrapper borderType="dashed">
                    <TextWithIcon
                      isLink={false}
                      item={{
                        text: "",
                        path: undefined,
                        url: undefined,
                        title: undefined,
                      }} // item={{ text: "Applied: Extra 5% Off with Your Order" }}
                    />
                  </TextWithIconWrapper>
                )}

                <S.CheckoutButtons>
                  <S.CheckoutPrice testingContext="checkout price">
                    {`₹ ${totalPrice?.net?.amount?.toFixed(2)}`}
                  </S.CheckoutPrice>
                  <S.ButtonCheckout>{button}</S.ButtonCheckout>
                </S.CheckoutButtons>
              </S.StickyBottom>
            </S.CartSummarySection>
          </S.Wrapper>
        </S.CheckoutContainer>
      )}
    </>
  );
};

export { Checkout };
