import { media, styled } from "@styles";
import { TextField } from "@components/molecules/TextField";
import { plixBrightGreen } from "Themes/globalStyles/constants";

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-bottom: 0px;
  align-items: center;
`;

export const Container = styled.div<{ loading?: boolean }>`
  opacity: ${props => (props.loading ? 0.5 : 1)};
  pointer-events: ${props => (props.loading ? "none" : "auto")};
  position: relative;
  background: rgb(255, 255, 255);
  border-radius: 8px;
  margin: 0 32px 0px;
  ${media.smallScreen`
    margin: 0 20px 0px;
  `}
  z-index: 1;
`;

export const SubscriptionUpperText = styled.div`
  background-color: rgba(6, 83, 60, 1);
  padding: 0.25rem 0.5rem;
  padding-bottom: 1rem;
  color: white;
  font-weight: 700;
  font-size: 14px;
  border-radius: 8px;
  position: absolute;
  z-index: -1;
  top: -18%;
  font-size: 12px;
`;

export const SubscriptionBottomText = styled.div`
  background-color: rgba(6, 83, 60, 1);
  padding: 0.25rem 0.5rem;
  padding-top: 1rem;
  width: 100%;
  color: white;
  font-weight: 700;
  font-size: 14px;
  border-radius: 8px;
  position: absolute;
  z-index: -1;
  bottom: -18%;
  font-size: 12px;
`;

export const UpsellContainer = styled.div`
  padding: 0px 0px 0px 0px;
  background: #feffed;
  border-radius: 0 0 8px 7px;
  margin: 0px 32px;
  margin-top: 8px;
  ${media.smallScreen`
      padding: 0px 0px 0px 0px;
      margin: 0px 20px;
      margin-top: 8px;
  `}
  .offer_header {
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-align: start;
    align-items: flex-start;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 12px 12px 0 17px;
    .header_contemt {
      max-width: 247px;
      font-family: "CocoSharp XL";
      font-weight: 700;
      font-size: 12px;
      line-height: 150%;
      color: #1eaf6d;
    }
    .learn_more {
      display: flex;
      -ms-flex-direction: row;
      flex-direction: row;
      -ms-flex-pack: start;
      justify-content: flex-start;
      -ms-flex-align: center;
      align-items: center;
      svg {
        margin-right: 6px;
      }
      span {
        font-family: "CocoSharp XL";
        font-weight: 400;
        font-size: 12px;
        line-height: 140%;
        -webkit-text-decoration-line: underline;
        text-decoration-line: underline;
        color: gray;
        cursor: pointer;
      }
    }
  }
`;

export const Wrapper = styled.div<{
  marginTop?: string;
  marginBottom?: string;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${props => props.marginTop || "10px"}
  height: 100%;
  min-height: 130px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: ${props => props.marginBottom || "10px"}
`;

export const QuantityButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0 15px 0 0;
  width: 50px;

  > div {
    display: flex;
  }

  svg {
    cursor: pointer;
    justify-self: center;
  }
`;

export const Plus = styled.div`
  padding: 4px 8px;
  cursor: pointer;
`;

export const Minus = styled.div<{ quantity: number; loading?: boolean }>`
  background-color: ${props => (props.loading ? "##7feb76" : "#fff")};
  pointer-events: ${props => (props.quantity > 1 ? "auto" : "none")};
  opacity: ${props => (props.quantity > 1 ? 1 : 0.5)};
  padding: 4px 8px;
  cursor: pointer;
`;

export const Photo = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: top;
  max-width: 35%;
  max-width: 106px;
  ${media.smallScreen`
    max-width: 80px;
  `}
  a {
    width: -webkit-fill-available;
    text-align: center;
  }
  img {
    min-width: 80px;
    width: 100%;
    /* margin: 5px; */
    /* object-fit: contain; */
  }
`;

export const Description = styled.div`
  height: auto;
  /* margin-top: 20px; */
  margin-left: 15px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  /* padding-bottom: 3rem; */
  /* ${media.mediumScreen`
    margin-left: 0px;
  `} */
  > p{
    font-size: 12px;
    margin-top: 8px;
    line-height: 16px;
  }
`;

export const ProductDescription = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: black;
`;
export const UpsellDescription = styled.div`
  height: auto;
  margin-left: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: flex-start;
  p {
    font-family: "CocoSharp XL";
    font-weight: 500;
    font-size: 14px;
    text-align: left;
    color: rgb(0, 0, 0);
    line-height: 22.4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  div {
    color: rgb(128, 128, 128);
    font-family: "CocoSharp XL";
    font-size: 10px;
    font-weight: 400;
  }
`;

export const Info = styled.div`
  display: flex;
  border: none;
  margin-bottom: 15px;
  padding-bottom: 0;
`;

export const UpsellInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 16px 12px 8px;
  margin: 0;
`;

export const UpsellTimerTag = styled.div`
  /* margin: ${props => (props?.margin ? props.margin : "0rem")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
  height: fit-content;
  width: fit-content;
  border-radius: 4px;
  background-image: radial-gradient(
    44.03% 132.34% at 39.33% 26.22%,
    #69ea72 0%,
    #a9ef82 100%
  ); */
  background:${plixBrightGreen}
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    background-color: transparent;
    background-image: none;
    .timer{
      margin-right: 6px;
    }
  > span {
    color: black;
    font-family: "CocoSharp XL";
    font-size: 12px;
    font-weight: bold;
  }
`;

export const Sku = styled.p`
  margin: 6px 0;
  text-align: left;
  margin-bottom: 10px;
`;

export const Attributes = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-template-columns: repeat(auto-fit, minmax(166px, 500px));
  margin-left: -15px;
  ${media.mediumScreen`
    flex-flow: column;
  `};
`;

export const SingleAttribute = styled.p`
  margin: 0;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  background-color: white;
  padding: 0px 15px;
`;

export const Name = styled.p`
  font-family: "CocoSharp XL";
  font-weight: 500;
  font-size: 1rem;
  text-align: left;
  /* margin-bottom: 6px; */
  color: #000000;
  ${media.smallScreen`
      font-size: 14px;
  `}

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const UpsellName = styled.p`
  font-family: "CocoSharp XL";
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  color: #000;
  line-height: 22.4px;
  ${media.smallScreen`
      font-size: 12px;
  `}

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const LightFont = styled.span`
  font-family: "CocoSharp XL";
  font-size: ${props => props.theme.typography.smallFontSize};
  color: rgba(125, 125, 125, 0.6);
`;

export const Price = styled.div`
  color: #000000;
  margin-left: 0px;
  font-family: "CocoSharp XL";
  font-size: ${props => props.theme.typography.h4FontSize};
  display: flex;
  justify-content: flex-start;
  font-weight: 600;
  ${media.mediumScreen`
    font-weight: 600;
    flex-direction: ${props=> props?.personalisedBox ? "row" : "column"}
  `}
  span {
    font-family: "CocoSharp XL";
    font-size: 16px;
    font-weight: 600;
    padding-top: 0;
  }
  div {
    padding-top: 0;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    align-items: flex-start;
    ${media.xLargeScreen`
    flex-direction: row;
    gap: 10px;
    `};
    div:first-child {
      padding-left: 0;
      margin-left: 26px;
      flex-direction: row-reverse;
      align-items: center;
      span {
        span {
          font-family: "CocoSharp XL";
          font-weight: 400;
          font-size: 12px;
          line-height: 120%;
          color: gray;
        }
      }
      div {
        span {
          font-family: "CocoSharp XL";
          font-size: 16px;
          font-weight: 600;
          padding-top: 0;
        }
      }
    }

    button {
      background: #d1ffd9 !important;
      border-radius: 4px;
      padding: 4px 8px;
      font-family: "cocosharp_xlextrabold";
      font-weight: 800;
      font-size: 10px !important;
      line-height: 120% !important;
      color: #1eaf6d !important;
      margin-left: 8px;
    }

    ${media.smallScreen`
    flex-direction: row;
    gap: 10px;
  `};
  }
  p {
    margin: 0;
  }
`;
export const UpsellPriceContainer = styled.div`
  > div {
    display: flex;
    flex-direction: row !important;
    padding-left: 0px;
    margin-top: 10px;
    margin-right: 5px;
  }
  .upsell-price-container {
    & > div {
      display: flex;
      flex-direction: row-reverse;
      div {
        &:nth-child(1) {
          display: flex;
          span {
            font-family: "CocoSharp XL";
            font-weight: 400;
            font-size: 12px;
            line-height: 120%;
            text-align: right;
            color: gray;
          }
          div {
            background: 0 0;
            padding: 0;
            margin: 0;
            span {
              font-family: "CocoSharp XL";
              font-weight: 700;
              font-size: 14px;
              line-height: 120%;
              text-align: right;
              color: #000;
            }
          }
        }
        &:nth-child(2) {
          background: #d1ffd9;
          border-radius: 4px;
          padding: 4px 6px;
          margin-right: 15px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            font-family: "cocosharp_xlextrabold";
            font-weight: 800;
            font-size: 10px !important;
            line-height: 120% !important;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #1eaf6d !important;
            background: #d1ffd9 !important;
          }
        }
      }
    }
  }
`;
export const UpsellPriceAndButtonContainer = styled.div`
  color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px 13px;

  /* ${media.mediumScreen`
    font-weight: normal;
    flex-direction: column;
    
  `} */
  .atc-button{
    background: #5dd37c!important;
    border-radius: 8px;
    font-family: 'cocosharp_xlextrabold';
    font-weight: 800;
    font-size: 12px!important;
    line-height: 100%!important;
    text-align: center;
    letter-spacing: .05em;
    text-transform: uppercase!important;
    color: #feffed!important;
    height: 32px;
    width: 84px!important;
  }
  span {
    font-family: "CocoSharp XL";
    font-size: 14px;
    font-weight: 700;
    padding-top: 0;
    ${media.smallScreen`
    font-size: 12px;
  `};
  }
  div {
    padding-top: 0;

    ${media.xLargeScreen`
    flex-direction: row;
    gap: 10px;
  `};

    ${media.smallScreen`
    flex-direction: row;
    gap: 10px;
  `};
  }
  p {
    margin: 0;
  }
`;

export const PriceLabel = styled.p`
  display: none;
  ${media.mediumScreen`
    display: block;
  `}
`;

export const TotalPrice = styled(Price as any)`
  ${media.mediumScreen`
    p {
      text-align: right;
    }
  `}
`;
export const Weight = styled.div`
  color: #686b78;
  font-family: "CocoSharp XL";
  font-size: 12px;
`;

export const UpsellWeight = styled.div`
  color: #808080;
  font-family: "CocoSharp XL";
  font-size: 10px;
  font-weight: 400;
`;

export const Trash = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: trash;
  align-self: flex-start;
  margin-left: auto;
  /* margin: 5px; */
  border-bottom: 1px dashed #e5e5e5;
  /* min-width: 4rem; */
  font-size: 13px;
  gap: 0.5rem;
  /* border: 1px #e5e5e5; */
  :hover {
    cursor: pointer;
  }
`;

export const UnitPrice = styled(Price as any)`
  // height: 10%;
  /* border:1px solid #e0eadf; */
  color: #686b78;
  margin-bottom: 0.5rem;
  width: 100%;
  font-family: "CocoSharp XL";
  p {
    font-weight: 400;
    font-size: 14px;
  }
  ${media.smallScreen`
    font-size: 0.8rem;
  `}
`;

export const UnitPriceStrike = styled(UnitPrice as any)`
  text-decoration: line-through;
`;

export const Quantity = styled.div`
  grid-area: quantity;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 6px;
  padding: 2.5px 0px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
`;

export const ErrorMessage = styled.span`
  color: red;
`;

export const QuantityFree = styled(Quantity as any)`
  padding: 8px 16px;
  border-radius: 4px;
`;

export const QuntityField = styled(TextField)`
  color: #000000;
  font-weight: 600;
  height: 25px;
  width: 30px !important;
  /* border-left: 1px solid #e0eadf;
  border-right: 1px solid #e0eadf; */
  padding: 0 !important;
  text-align: center;

  input {
    text-align: center;
    &:active {
      border: none;
      outline: none;
    }
  }
  div {
    border: none !important;
    outline: none;
    &:active {
      outline-width: 0;
      outline-style: 0;
      border: none;
      outline: none;
    }
  }
`;

export const Free = styled.div`
  color: black;
  text-transform: uppercase;
  margin-bottom: 10px;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  display: flex !important;
  justify-content: space-between !important;
  font-family: "CocoSharp XL";
  font-size: 14px !important;
  width: 100% !important;
  align-items: center;
  gap: 6px;
  svg {
    stroke: black;
  }
  .free-text-wrapper {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-evenly !important;
    align-items: center;
    > span {
      margin-left: 6px;
    }
  }
`;

export const MoreButton = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

export const UpsellPhoto = styled.div`
  display: flex;
  align-items: center;
  width: 35%;
  max-width: 92px;
  ${media.smallScreen`
    max-width: 70px;
  `}
  a {
    width: -webkit-fill-available;
    text-align: center;
  }
  img {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e7e7e7;
    border-radius: 6px;
    /* margin: 5px; */
    /* object-fit: contain; */
  }
`;
export const UpsellHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: "cocosharp_xlextrabold";
  font-weight: 800;
  font-size: 12px;
  line-height: 120%;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #095933;
  background: #ffe655;
  padding: 8px 12px;
  height: 30px;
`;
export const UpsellTag = styled.div<{ margin?: string }>`
  margin: ${props => (props?.margin ? props.margin : "0rem")};
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
  height: fit-content;
  width: fit-content;
  border-radius: 4px;
  background-color:${plixBrightGreen}
  font-family: "CocoSharp XL";
  > span {
    color: #FFFFFF;
    font-size: 12px;
  }
`;

export const BoxItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid #e5e5e5;
`;
export const BoxItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  span:nth-child(1) {
    font-weight: 500;
    white-space: nowrap;
  }
`;
export const BoxItemName = styled.span`
  font-family: "CocoSharp XL";
  font-size: 12px;
  margin-left: 8px;
`;

export const BoxItemQuantity = styled.span`
  font-family: "CocoSharp XL";
  font-size: 12px;
  margin-left: 4px;
  font-weight: bold;
`;
