import { media } from "@styles/media";
import { styled } from "@styles/themes";
import { Button } from "@components/atoms/Button";
export const CheckoutContainer = styled.div`
  padding: 2rem 5rem;
  width: 100%;
  margin: auto;
  font-weight: ${props => props.theme.typography.baseFontFamily};
  background-color: #f5f5f5;
  padding-top:0;
  /* ${media.xLargeScreen`
    width: 95%;
  `} */

  ${media.xLargeScreen`
    width: 100%;
  `}
  ${media.mediumScreen`
    padding: 0;
  `}
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
  > div:first-child {
    width: 50%;

    ${media.largeScreen`
     width: 100%;
    `}
  }
  ${media.largeScreen`
    flex-direction: column;
    margin: 20px 0;
  `}

  ${media.mediumScreen`
    margin: 0;
  `}
`;

export const CartSummarySection = styled.div`
  width: 50%;
  /* padding: 0.5rem 0; */
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
  /* width: 60%;
  padding: 0 10px 30px 10px; */
  /* background-color: #ffffff; */
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
  button {
    padding: 1rem 1.5rem;
  }
  margin: auto;
  ${media.largeScreen`
    width: 50%;
  `}
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
export const LoginSection = styled.div`
  display: flex;
  background-color: #ffffff;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0.5rem 1rem;
  outline: 1px solid #f1f3f0;
  box-shadow: 0px 1px 6px 0px #70707040;
  ${media.mediumScreen`
      margin: 5px 0;
  `}
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
export const StyledButton = styled(Button)`
  padding: 0.7rem 1.5rem 0.7rem 1.5rem;
  margin: 8px;
  border-radius: 4px;
  > span {
    font-weight: 600;
    letter-spacing: 0.04rem;
    ${media.mediumScreen`
      font-size:12px;
    `}
  }
  ${media.mediumScreen`
    font-size:11px;
    padding: 0.5rem 1rem 0.5rem 1rem;
  `}
`;

export const CheckoutPriceLabel = styled.span`
  color: #686b78;
`;

export const PriceWrapper = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
export const CheckoutPrice = styled.span`
  font-weight: 600;

  color: #2b364b;
  width: 100%;
  ${media.largeScreen`
      display: block;
      width: 100%;
  `}

  &:hover {
    background: white;
    color: ${props => props.theme.colors.primaryDark};
    border: 1px solid ${props => props.theme.colors.primary};
    cursor: default;
  }
`;

export const CheckoutButtons = styled.div`
  display: flex;
  width: 100%;
  .priceContainer {
    display: flex;
    align-items: center;

    width: 50%;
  }
`;
export const StickyBottom = styled.div`
  display: none;
  background: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
  background-color: ${props => props.theme.colors.white};
  box-shadow: -1px -1px 4px 0px #00000040;
  ${media.largeScreen`
  display: block;
    position: fixed;
    bottom: 0%;
    left: 0%;
    width: 100vw;
    z-index: 1;
    padding: 0;
  `};
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
