import { media, styled } from "@styles";
import { wishlistAddProduct } from "../../molecules/ProductCardPlixlife/gqlTypes/wishlistAddProduct";

export const FullContainer = styled.div`
  width: 100%;
  background: #eefdeb;
  ${media.mediumScreen`
    background: white;
  `}
`;
export const Container = styled.div`
  padding: 52px 158px;
  padding-bottom: 80px;
  position: relative;
  ${media.xLargeScreen`
    padding: 52px 30px;
  `}
  ${media.largeScreen`
    padding: 52px 68px;
  `}
  ${media.smallScreen`
    padding: 0px;
  `}
  /* display: flex;
  justify: center; */
`;
export const DescriptionText = styled.div<{ margin?: string }>`
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #808080;
`;

export const CountryCode = styled.div`
  width: 71px;
  height: 48px;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: #808080;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;
export const PolicyText = styled.div<{ margin?: string }>`
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 160%;
  text-align: center;
  color: #808080;
  margin-top: 18px;
  a{
      text-decoration:underline;
  }
  span {
    font-weight: 700;
  }
`;
export const WebHeading = styled.div`
  text-align: left;
  position: relative;
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 400;
  font-size: 38px;
  line-height: 120%;
  letter-spacing: -0.02em;
  text-transform: capitalize;
  color: #000000;
  display: flex;
  justify-content: flex-start;
  padding: 0px 0px 10px 0px;
  width: 100%;
  @media (min-width: 1040px) {
    font-size: 40px;
    letter-spacing: 0.8px;
  }
`;

export const OtpWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  input {
    width: 56px;
    height: 79px;
    background: #ffffff;
    border: 1.22687px solid #e7e7e7;
    border-radius: 9.81493px;
    text-align: center;
    font-weight: 400;
    font-size: 24.5373px;
    line-height: 160%;
    color: #000000;
    &.errormsg {
      border: 1px solid #b50000;
    }
    @media (max-width: 767px) {
      width: 45px;
      height: 64px;
    }
    &::placeholder {
      color: #808080;
    }
    &::-webkit-placeholder {
      color: #808080;
    }
    &::-moz-placeholder {
      color: #808080;
    }
    &::-ms-placeholder {
      color: #808080;
    }
  }
`;
export const LoginSignBox = styled.div`
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  @media (min-width: 767px) {
  }
`;

export const ErrorMessage = styled.span`
  font-family: "CocoSharp XL";
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 120%;
  color: #b50000;
  margin-top: -20px;
  margin-bottom: 15px;
`;
export const LoginBox = styled.div`
  width: 100%;
  /* box-shadow: 0 0.5px 2.5px 2px rgba(40, 44, 63, 0.1); */
  font-family: "Humanist521BT-Roman", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
`;
export const ShowBox = styled.div`
  width: 100%;
  background-color: #fff;
  /* padding: 10px; */
  height: 100%;
`;
export const Form = styled.form`
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  margin-top: 44px;
`;

export const NewuserSignup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 14px 0px -34px 0px;
`;

export const NewUser = styled.div`
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  color: #820906;
  margin-bottom: 2px;
`;

export const EnterEmailAddress = styled.div`
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #808080;
`;

export const InputDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 24px;
`;
export const InputHeader = styled.div``;
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: #808080;
  appearance: none;
  outline: none;
`;
export const Span = styled.span`
  /* position: absolute; */
  right: 0;
  color: #b50000;
  text-transform: capitalize;
  font-size: 12px;
  border-radius: 10px;
  padding: 2px 10px;
`;
export const ButtonDiv = styled.div`
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  > button {
    &:hover {
      background-color: #5dd37c !important;
    }
    > span {
      margin-right: 5px;
      text-transform: capitalize;
    }
    justify-content: center;
    background: #5dd37c;
    border-radius: 8px;
    font-family: "cocosharp_xlextrabold";
    font-weight: 800;
    font-size: 14px;
    line-height: 100%;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #feffed;
    color: white;
  }
`;
export const Button = styled.button`
  background-color: ${props => props.theme.button.colors.primary.background};
  text-transform: uppercase;
  color: #fff;
  font-family: "CocoSharp XL" !important;
  font-size: 15px;
  padding: 11px 20px 8px;
  transition-duration: 0.5s;
  border: none;
  cursor: pointer;
  display: flex;
  font-family: "CocoSharp XL" !important;
`;
export const SignUpBox = styled.div`
  padding: 1rem;
`;
export const SignUpText = styled.div`
  color: gray;
  cursor: pointer;
  > span {
    font-weight: 600;
    color: ${props => props.theme.button.colors.checkoutButtonColor};
    border-bottom: 2px solid #9dec9b;
  }
`;
export const ResendDiv = styled.div`
  padding: 18px 10px 10px 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > span {
    cursor: pointer;
    font-family: "CocoSharp XL" !important;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    color: #808080;
  }
`;
export const TimeText = styled.span`
  font-family: "CocoSharp XL" !important;
  font-weight: 700;
  color: #5dd37c;
`;
export const ResendText = styled.div`
  font-family: "CocoSharp XL" !important;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #808080;
  text-align: right;
  cursor: pointer;
  &:hover {
    color: #5dd37c;
    text-decoration: underline;
  }
`;
export const Custom_Checkout_header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 64px;
  background: #5dd37c;
  padding: 0px 104px;
  position: sticky;
  top: 0px;
  z-index: 4;
  svg {
    width: 86px;
    height: 26px;
  }
  ${media.smallScreen`
    justify-content: center;
    padding: 0px;
  `}
  img {
    display: none;
    position: absolute;
    left: 20px;
    width: 21px;
    height: 24px;
    ${media.largeScreen`
      display: block;
    `}
  }
`;
export const LoginContainerDesktop = styled.div`
  width: fit-content;
  background: white;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: row;
  margin-inline: auto;
  background: #FFFFFF;
  border: 1px solid #BEBEBE;
  border-radius: 8px;
  border-radius: 16px;
  width: 100%;
  /* ${media.xxLargeScreen`
    max-width: 85%;
  `}
  ${media.xLargeScreen`
    max-width: 95%;
  `}
  ${media.largeScreen`
    max-width: 100%;
  `} */
  ${media.largeScreen`
    flex-direction: column-reverse;
    border:none;
  `}
`;
export const LoginFormContainer = styled.div`
  padding: 77px 42px 32px;
  flex: 1;
  ${media.xLargeScreen`
    padding: 2rem;
  `}
  ${media.largeScreen`
   padding: 1rem;
  `}
`;
export const LoginImageContainer = styled.div`
  width: 629px;
  height: 548px;
  border-radius: 0px 8px 8px 0px;
  ${media.largeScreen`
    width: 100%;
    height: auto;
  `}
  ${media.smallScreen`
    width:100%;
    height:auto;
    border-radius: 0px 0px 0px 0px;
  `}
  > img {
    width: 100%;
    border-radius: 0px 15px 15px 0px;
    ${media.smallScreen`
      border-radius: 0px;
  `}
  }
`;
export const LoaderContainer = styled.div`
  position: absolute;
  top: 40%;
  right: 44%;
  z-index: 10;
`;
export const Contactwrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 19px;
  margin-top: 19px;
  border-top: 1px solid #e7e7e7;
  span {
    font-family: "CocoSharp XL" !important;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    color: #808080;
  }
  button {
    font-family: "cocosharp_xlextrabold";
    font-weight: 800;
    font-size: 14px;
    line-height: 150%;
    letter-spacing: 0.05em;
    text-decoration-line: underline;
    text-transform: uppercase;
    color: #5dd37c;
    margin-left: 10px;
  }
`;

export const OrDivider = styled.div`
  width: 100% !important;
`;
