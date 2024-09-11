import { media } from "@styles/media";
import { styled } from "@styles/themes";
import { Button } from "@components/atoms/Button";

export const CheckoutContainer = styled.div`
  padding-top: 20px;
  width: 85%;
  margin: auto;
  font-weight: ${props => props.theme.typography.baseFontFamily};

  ${media.xLargeScreen`
    width: 95%;
  `}

  ${media.xLargeScreen`
    width: 95%;
  `}
`;

export const CheckoutBottomSection = styled.div`
  position: relative;
  background-color: #eefdeb;
`;

export const CheckoutBottomCardSection = styled.div`
  padding: 43px 211px 43px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  ${media.mediumScreen`
    padding: 60px 20px 0;
  `}
`;

export const CheckoutBottomContactSection = styled.div`
  padding: 80px 211px 43px;
  display: flex;
  flex-direction: column;
  ${media.mediumScreen`
    padding: 50px 20px 20px;
  `}
`;

export const CheckoutBottomContactTitle = styled.h2`
  font-weight: 700;
  margin: 0 auto 28px;
  font-size: 32px;
  ${media.mediumScreen`
    font-size:18px;
  `}
`;

export const CheckoutBottomContactButton = styled.button`
  margin: 0 auto 82px;
  padding: 15px 70px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 2px;
  width: 330px;
  ${media.mediumScreen`
  width: auto;
    padding: 10px 3vw;
    flex-direction: column;
    align-items: center;
  `}
`;

export const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: 10;
`;

export const Wrapper = styled.div`
  margin: 24px 0 45px 0;
  display: flex;
  width: 100%;
  ${media.largeScreen`
    flex-direction: column;
    margin: 20px 0;
  `}

  ${media.mediumScreen`
    margin: 0;
  `}
`;

export const CartSummarySection = styled.div`
  width: 40%;
  padding: 0.5rem 0;
  ${media.largeScreen`
    width: 100%;
  `}
`;

export const Navigation = styled.div`
  border-bottom: 1px solid
    ${props => props.theme.colors.baseFontColorTransparent};
  padding-bottom: 43px;
  height: 85px;
`;
export const Checkout = styled.div`
  width: 60%;
  padding: 0 10px 30px 10px;
  ${media.largeScreen`
    width: 100%;
  `}
`;
export const PaymentGateways = styled.div<{ hide: boolean }>`
  ${props => props.hide && "display: none;"}
`;
export const CartSummary = styled.div`
  width: 100%;
`;
export const ButtonCheckout = styled.div`
  margin: auto;
  ${media.largeScreen`
    width: 50%;
  `};
`;

export const CheckoutButton = styled.div`
  margin: auto;
  width: 100%;
  background-color: #02262a !important;
  color: #fff !important;
  ${media.largeScreen`
    width: 100%;
  `};
`;

export const TopTitleSection = styled.div`
  padding: 3vh 4vh;
  ${media.mediumScreen`
    padding: 1vw 1vw;
  `}
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const TopTitleSubSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${media.mediumScreen`
    margin: 0 0 3vw;
  `}
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  padding: 0 2px;
`;

export const LoginSection = styled.div`
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
`;
export const StyledButton = styled(Button)`
  padding: 0.5rem 1rem 0.3rem 1rem;
  margin: 8px;
`;

export const LoginButton = styled.button`
  font-weight: 600;
  margin: 0 5px;
  padding-bottom: 2px;
  border-bottom: 2px solid #8ded7b;
`;

export const CheckoutPrice = styled(Button)`
  display: none;
  background: white;
  border: 1px solid ${props => props.theme.colors.checkoutButtonColor};
  color: ${props => props.theme.colors.primaryDark};
  ${media.largeScreen`
      display: block;
      width: 50%;
  `}

  &:hover {
    background: white;
    color: ${props => props.theme.colors.primaryDark};
    border: 1px solid ${props => props.theme.colors.checkoutButtonColor};
    cursor: default;
  }
`;

export const CheckoutButtons = styled.div`
  display: flex;
  width: 100%;
`;
export const StickyBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
  background-color: ${props => props.theme.colors.white};
  ${media.largeScreen`
    position: fixed;
    bottom: 0%;
    left: 0%;
    width: 100vw;
    z-index: 1;
    padding: 0;
  `};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: #fff;
  outline: 1px solid #f1f3f0;
  box-shadow: 0px 1px 6px 0px #70707040;
  margin-bottom: 10px;

  ${media.mediumScreen`
    padding: 1rem;
    margin-bottom: 5px;
  `}
`;
export const Header = styled.span`
  font-size: 17px;
  color: #282c3f;
  font-weight: 600;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

export const LoginContent = styled.div`
  display: flex;
  > svg {
    margin-right: 10px;
    font-size: 1.1rem;
  }
  > span {
    font-size: 1rem;
    color: #282c3f;
  }
`;
export const OrderButton = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  &:hover {
    border: none;
    outline: none;
  }
  & :active {
    background-color: ${props => props.theme.colors.primary};
  }
`;
export const PriceWrapper = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const CheckoutPriceLabel = styled.span`
  color: #686b78;
`;

export const SecurePaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
`;
export const SecurePaymentTag = styled.span`
  color: #686b78;
  font-size: 14px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;
