import { styled } from "@styles/themes";
import { media } from "@styles/media";
import { Button } from "@components/atoms/Button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  padding: 0.5rem 0px;
`;

export const CouponHeader = styled.h5`
  font-size: 18px;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 8px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  svg{
    margin-left:4px;
  }
`;

export const SubHeadingText = styled.div`
  font-size: 11.5px;
  font-style:italic;
`;

export const FormContainer = styled.div<{ disabled?: boolean }>`
  background: ${props => (props.disabled ? "#D9D9D9" : "")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  height: 45px;
  pointer-events: ${props => (props.disabled ? "none" : "all")};
  > input {
    // z-index: ${props => (props.disabled ? "-1" : "none")};
    font-size: 14px !important;
    width: 100%;
    outline: none;
    border: none;
    font-size: 16px;
    font-weight: 600;
    color: #686b78 !important;
    background-color: ${props => (props.disabled ? "transparent" : "white")}; !important;
    ::-webkit-input-placeholder {
      font-weight: 400;
    }

    /* border-bottom: 1px solid #8f8f8f;
    margin: 5px; */
  }
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  /* border-bottom: 1px solid #8f8f8f;
  margin: 5px; */
`;

export const StyledMyButton = styled(Button)`
  font-size: 12px;
  background-color: #fff;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  width: 90px;
  margin: 5px;
  padding: 5px;
`;

export const ErrorMessage = styled.div`
  font-weight: 400;
  margin-top: 5px;
  color: #e95f5f;
  font-size: 12px;
  font-style: italic;
`;

export const Apply = styled.button<{ disabled?: boolean }>`
    margin: 0;
    font-weight: 800;
    font-size: 12px;
    line-height: 150%;
    letter-spacing: .05em;
    text-transform: uppercase;
    color: #5dd37c!important;
    width: unset!important;
    border-bottom: none;
    background: 0 0!important;
`;

export const CodeDisplayBox = styled.div`
  padding: 16px;
  /* background-color: green; */
  border: 1px dashed ${props => props.theme.button.colors.primary.applyCoupon};
  border-radius: 4px;
  text-align: center;
  color: ${props => props.theme.button.colors.primary.applyCoupon};
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.smallScreen`
    flex-direction: column;
    padding: 12px;
    font-size: 0.9rem;
  `}
`;

export const AppliedMsg = styled.span`
  color: #1EAF6D;
  align-self: flex-start;
  font-family: 'CocoSharp XL';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
`;

export const ViewAllContainer = styled.div``;

export const ViewAllOffersButton = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  text-align: left;
  white-space: nowrap !important;
  text-decoration: underline;
  cursor: pointer;
  :after {
    content: "\\005E";
    font-size: 15px;
    display: inline-block;
    text-decoration: none;
    color: #69de7a;
    transform: rotate(90deg);
  }
`;
export const OfferWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  cursor: pointer;
  svg{
    width: 22px;
    height: 20px;
    ${media.smallScreen`
      width: 18px;
      height: 18px;
   `}
  }
`;

export const CouponAndTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  p{
    font-family: 'CocoSharp XL';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 160%;
    color: #000000;
    margin-right: 14px;
    ${media.smallScreen`
      font-size:18px;
   `}
  }
  
`;
export const CouponNumer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  svg{
    width: 15px;
    height: 19px;
    margin-right: 4px;
  }
  span{
    svg{
      width: 14px;
      height: 14px;
    }
  }
  p{
    font-family: 'CocoSharp XL';
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 120%;
    color: #1EAF6D;
  //   ${media.smallScreen`
  //     font-size:14px;
  // `}
  }
`;