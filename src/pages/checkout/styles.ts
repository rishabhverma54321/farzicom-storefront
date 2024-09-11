import { styled } from "@styles/themes";
import { media, minMedia } from "@styles/media";

export interface IFormContainer {
  loading?: boolean;
}

export const FormContainer = styled.div<{
  loading?: boolean;
  fullOpacity?: boolean;
}>`
  opacity: ${props => (props?.fullOpacity ? "1" : props.loading ? "0.4" : "1")};
  pointer-events: ${props => (props.loading ? "none" : "auto")};
`;

export const OrderSummary = styled.div<{ loading?: boolean }>`
  opacity: ${props => (props?.fullOpacity ? "1" : props.loading ? "0.4" : "1")};
  pointer-events: ${props => (props.loading ? "none" : "auto")};
  font-family: "CocoSharp XL" !important;
`;

export const RadioContainer = styled.div<{ disabled?: boolean }>`
  opacity: ${props =>
    props?.fullOpacity ? "1" : props?.disabled ? "0.4" : "1"};
  pointer-events: ${props => (props?.disabled ? "none" : "auto")};
  font-family: "CocoSharp XL" !important;
`;

export const ApplyCouponCodeErrorMessage = styled.div<{ hasError?: boolean }>`
  color: ${props => (props?.hasError ? "red" : "green")};

  svg {
    path {
      fill: ${props => (props?.hasError ? "" : "green")};
    }
    stroke: ${props => (props?.hasError ? "red" : "")};

    margin-right: 4px;
  }
`;

export const ContinueShopping = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto;
  min-height: 200px;

  ${media.mediumScreen`
    margin-top: 0;
    width: 20%;

  `}
`;

export const CashbackStripNew = styled.div`
    font-family: "cocosharp_xlextrabold";
    width: 100%;
    background: rgb(239, 251, 242);
    border-radius: 8px;
    padding: 14px 0.5rem;
    font-weight: 800;
    font-size: 14px;
    line-height: 160%;
    text-align: center;
    color: rgb(30, 175, 109);
    span{
      color: rgb(9, 89, 51);
    }
  ${media.largeScreen`
  font-size: 12px;

  `}
`;

export const CheckoutReviewCard = styled.div`
  // margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 6px;
  h4 {
    // margin-top: 1rem;
    font-size: 18px;
    font-weight: 500;
  }
  img {
    width: 138px !important;
    height: 138px !important;
    margin-bottom: 18px;
    border-radius: 6px;
    ${media.mediumScreen`
      width: 111px !important;
      height: 111px !important;
      margin-right: 0px;
    `}
  }
  .review-card-footer{
    justify-content: flex-start;
    align-items: flex-start;
    .customer_review{
      margin-left: 30px;
      ${media.mediumScreen`
        margin-left: 24px;

    `}
      p{
        font-family: "CocoSharp XL" !important;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 140%;
        color: #000000;
        margin-bottom: 9px;
        ${media.mediumScreen`
          font-size: 16px;
          line-height: 140%;
          margin-top: 12px;
        `}
      }
      .review-verify-tag-checkout{
        h4{
          font-family: "CocoSharp XL" !important;
          font-weight: 400;
          font-size: 16px;
          line-height: 160%;
          color: rgba(0, 0, 0, 0.5);
          margin-right: 11px;
        }
      }
    }
  }
  .review_content{
    font-family: "CocoSharp XL" !important;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    color: #000000;
    opacity: 0.6;
    ${media.mediumScreen`
      font-weight: 400;
      font-size: 12px;
      line-height: 160%;
    `}
  }
`;
export const OfferPolicyStrip = styled.div`
  background-color: #eefdeb;
  > span {
    margin-right: 8px;
    margin-top: 4px;
  }
  color: black;
  font-weight: normal;
  padding: 0.5rem 1rem;
  transition: 0.3s;
  font-family: "CocoSharp XL" !important;
  font-size: 10px;
  outline: none;
  text-align: center;
  border: 1px dashed ${props => props.theme.colors.primary};
  border-radius: 4px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  ${media.xLargeScreen`
  flex-direction: column;
  font-size: 12px;
  padding: 0.5rem 1.5rem;
`}
  ${minMedia.xxLargeScreen`
  font-size: 12px;
  `}
  li {
    text-align: left;
    display: inline;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      background: black;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      left: -10px;
      top: 35%;
      // margin-right: 4px;
    }
  }
  ${media.smallScreen`
    padding: 0.75rem 1.25rem;
  `}
  margin-bottom: 1rem;
`;

export const WalletBalance = styled.div`
  font-weight: 600;
  display: inline;
  font-size: 12px;
`;

export const RemainingWalletBalanceText = styled.div`
  display: inline-block;
  padding: 0.5rem 0rem;
  font-size: 14px;
  margin: 0.25rem 0rem;
`;

export const WalletDisabledText = styled.div`
  font-size: 11.5px;
  font-style: italic;
  margin-top: 0.5rem
`

export const UpiButton = styled.button<{
  phonepe?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  img {
    width: 40px;
    margin-right: 16px;
  }
  flex: 1;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin: 4px;
  pointer-events: ${props => (props.disabled ? "none" : "all")};
  opacity: ${props => (props?.disabled ? "0.5" : "1")};
  span {
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
  }
  color: ${props =>
    props.phonepe ? "white" : props.theme.colors.newPlixGreen};
  background-color: ${props =>
    props.phonepe ? props.theme.colors.newPlixGreen : "#EFFBF2"};
`;
