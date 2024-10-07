import { media, minMedia } from "@styles/media";
import { styled } from "@styles/themes";

export const CardTopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  // padding: 0px 0px 4px 0px;
  align-items: flex-start;
  position: absolute;
  width:100%;
  top:0;
  z-index:1;
  // ${media.smallScreen`
  // padding: 0px 0px 4px 0px;
  // `}
`;

export const TopHeaderTag = styled.div<{ tagColor: string }>`
  background-color: ${props => props.tagColor || "#fae6e2"};
  padding: 5px 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  font-weight: 700;
  font-size: 12px;
  line-height: 120%;
  text-align: center;
  letter-spacing: -0.03em;
  color: #cc3609;
  background: #ffe2c0;
  border-radius: 8px 0px;
  ${media.smallScreen`
  font-size: 10px
  `}
`;
export const CardBody = styled.div<{
  hoverBg: boolean | undefined;
  hoverShadow: string | undefined;
  loading?: boolean;
  bg: string | undefined;
}>`
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  height: 100%;
  background-color: ${props => (props.bg ? props.bg : "white")};
  opacity: ${props => (props.loading ? 0.5 : 1)};
  pointer-events: ${props => (props.loading ? "none" : "auto")};
  justify-content: space-between;

  &:hover {
    ${props => props.hoverShadow && `box-shadow: ${props.hoverShadow};`}
  }
`;

export const CardImage = styled.div<{}>`
  // height: "28rem";
  // object-fit: "cover";
  // padding: "2px";
  // width: "auto";

  display: flex;
  justify-content: center;
  border-radius: 8px;
  border-radius: 8px 8px 0 0;
  // padding: 0px 0px 3px 0px;
  >span{
    width:100% !important;
    height:100% !important;
    border-top-right-radius:8px;
    border-top-left-radius:8px;
  }
  img {
    /* border-radius: 8px 8px 0 0;
    width: 100%;
    padding: 3rem; */
    min-width: unset !important;
    max-width: unset !important;
    min-height: unset !important;
    max-height: unset !important;
    // width: 170px !important;
    // height: 170px !important;
    width:100% !important;
    height:100% !important;
    ${media.smallScreen`
      // padding: 1rem;
      max-height: 170px !important;
      // width: 93px !important;
      // height: 86px !important;
    `}
  }
  // ${media.smallScreen`
  //     padding: 1rem 1rem 0rem 1rem;
  //   `}
`;

export const CardInfo = styled.div<{}>`
  text-align: left;
  /* margin-bottom: 10px; */
  text-transform: capitalize;
  font-family: ${props => props.theme.typography.baseFontFamily}, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;

  padding: 8px 12px 0;
`;

export const CardName = styled.p<{}>`
  text-align: left;
  text-transform: capitalize;
  font-weight: 600;
  width: 100%;
  margin: auto;
  font-family: ${props => props.theme.typography.baseFontFamily}, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  font-size: 15px;

  ${media.largeScreen`
    width: 100%;
  `}

  ${media.mediumScreen`
  font-size: 14px;
  font-weight: 500;
  `}
`;

export const CardShortDdescription = styled.ul`
  background-color: ${props => props.theme.colors.primaryDark};
  color: white;
  padding: 0.5rem 1rem 0.5rem 2rem;
  border-radius: 0 0 8px 0;
  margin: 8px 0;
  font-weight: bold;
  width: 85%;
  /* float: right; */
  /* margin-left: 46px; */
  display: flex;
  flex-direction: column;
  box-shadow: 3px 3px 5px rgb(0, 0, 0, 0.2);
  li {
    text-align: left;
  }
`;
export const CardWishlist = styled.div<{}>`
  /* border-radius: 50%;
  box-shadow: 0 0 15px #d1d0d0; */
  /* background-color: #ffffff; */
  width: 32px;
  height: 32px;
  position: absolute;
  top: 15px;
  right: 20px;
  ${media.smallScreen`
  top: 10px;
  right: 16px;
  `}
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

export const CardPrice = styled.div<{}>`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-start;
  -webkit-box-align: baseline;
  -ms-flex-align: baseline;
  align-items: baseline;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  font-family: humanist521bt-roman, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  width: 100%;
  margin: auto;
  margin-bottom: 0;
  padding: 0 16px;
`;

export const CardRupee = styled.h4<{}>`
  color: #c87a70;
  font-size: 15px;
  font-family: humanist521bt-roman, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
`;

export const OldPrice = styled.h4<{}>`
  text-decoration: line-through;
  margin-right: 15px;
  color: #c87a70;
  font-size: 15px;
  font-family: humanist521bt, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export const NewPrice = styled.h4<{}>`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  font-family: humanist521bt, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export const CardButton = styled.div<{}>`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  bottom: 0px;
  align-self: left;
  padding: 8px;
  width: 100%;

  ${media.mediumScreen`
    /* padding-bottom: 16px; */
  `}
`;

export const Button = styled.button<{}>`
  background-color: #56774d;
  font-size: 0.8rem;
  font-weight: 100;
  font-family: myriad pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-transform: uppercase;
  color: #fff;
  display: block;
  padding: 11px 20px 8px;
  text-align: center;
  letter-spacing: 0.5px;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  margin-top: 20px;

  :hover {
    background-color: #78a442;
  }
`;

export const ProductPricing = styled.h4`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const UndiscountedPrice = styled.span`
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: 0.8rem;
  margin-right: 4px;
  span {
  text-decoration: line-through;
  }
`;

export const UndiscountedPriceNew = styled.span`
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: 13px;
  margin-right: 4px;
  span{
    text-decoration: line-through;
    margin-left:0.2rem;

  }
  
  ${media.smallScreen`
  font-size: 12px;
  span{
    margin-left:0.1rem;
    }
  `}
`;

export const VariantPicker = styled.div`
  display: grid;
  margin-top: 20px;

  .react-select-wrapper,
  .input {
    width: 50%;
    margin-bottom: 1rem;
  }
`;

export const Rating = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 5px;
`;

export const Quantity = styled.div`
  width: 100%;
  display: flex;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center !important;

  justify-content: center;
  gap: 8px;
  padding: 8px 0 0 0px;
`;

export const DiscountPriceNew = styled.div`
  color: #808080;
  font-family: CocoSharp XL;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  span {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 160%;
    margin-right:0.3rem;
    color:black;
    ${media.smallScreen`
    font-size: 1rem;
    `}
  }
`

export const DiscountedPrice = styled.div`
  span {
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
    line-height: 160%;
    ${media.smallScreen`
    font-size: 1rem;
    `}
  }
`;

export const DiscountedPriceFree = styled.div`
  span {
    font-style: normal;
    font-weight: 700;
    font-size: 1rem !important;
    line-height: 160%;
    color: #1eaf6d;
    ${media.smallScreen`
    font-size: 0.9rem !important;
    `}
  }
`;

export const Discounted = styled.div`
  button {
    background-color: #02262a !important;
    font-style: normal;
    color: white !important;
    font-size: 14px !important;
    font-weight: bold;
    line-height: 21px !important;
    /* width: 52% !important; */
    width: fit-content !important;
    margin-left: 17px;
    white-space: nowrap;
    padding-top: 2px;
    padding-inline: 6px;
    border-radius: 4px;
    text-align: center;
    vertical-align: middle;
  }
`;

export const PriceRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${props => props?.isCrossSell ? `
  >div{
    >div{
      flex-direction : column;
      gap: 0;
      padding-top: 0.3rem;

      @media(max-width: 480px){
        padding-top: 0;
      }
    }
  }` :
  ""
  };
`;

export const ProductInfoModalToggle = styled.span`
  font-size: 12px;
  border-bottom: 1px;
  margin-right: 14px;
  margin-top: 6px;
  font-weight: 500;
  border-bottom: ${props => `1px solid ${props.theme.colors.primary}`};
  line-height: 12px;
  cursor: pointer;
  ${props => props?.isByob && `
   display:flex;
   align-items:center;
   font-family: CocoSharp XL;
   gap:0.15rem
   color: #808080 !important;
   font-size:14px;
   font-weight:400;
   text-decoration:underline;
   border-bottom: none ;
  `}
  ${media.smallScreen`
  font-size: ${props=> props?.isByob ? '12px' : '10px'} 
  `}
  ${minMedia.largeScreen`
  margin-left: 8px;
  `}
`;
