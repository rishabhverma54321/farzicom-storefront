import { media, minMedia } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div``;

export const Scroller = styled.div<{ newproductvariant: boolean }>`
  ${(props) =>
    props?.newproductvariant
      ? `
  @media(min-width: 920px){
    max-height:480px;
    overflow-x:hidden;
    overflow-y:scroll;
    padding-right:1rem;

    &::-webkit-scrollbar {
      width: 11px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 12px;
      background: #D9D9D9;
    }
     
    &::-webkit-scrollbar-thumb {
      border-radius: 12px;
      background: #5DD37C;
    }
  }
`
      : ``}
`;

export const DescriptionIcons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;
export const CustomText = styled.div`
  padding: 0.25rem 0;
  // margin-top: 12px;
  font-size: 14px;
  font-weight: bold;
`;

export const StickyButtonsStyle = styled.div`
  ${media.mediumScreen`
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: ${(props) => (props?.zindex ? "12" : "4")};
`}
`;

export const StickyButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);

  ${media.xLargeScreen`
   width: 100%;
  `};

  ${media.mediumScreen`
   border-radius:${(props) => (props?.border ? "5px" : 0)}
    background-color: #fff;
    padding: 10px;
   width: 100vw;
  //  min-height: 120px;
   height: auto;

  `}
`;

export const SavingButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  button {
    span {
      gap: 0.5rem !important;
    }
  }
`;

export const SavingStripDietContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SavingStrip = styled.div`
  display: flex;
  /* gap: 8px; */
  /* justify-content: center; */
  align-items: center;
  > div {
    margin-left: 8px;
    > div {
      margin-left: 4px;
    }
  }
`;
export const SavingText = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;
`;

export const Hr = styled.hr`
  margin: 0;
  border: 1px solid #e7e7e7;
`;

export const ProductCombo = styled.div`
  padding: 1.3rem 0 1rem 0;

  ${media.smallScreen`
   padding: 0.5rem 0;
  `}
`;

export const TextIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;

  ${media.smallScreen`
  justify-content: space-evenly;
  margin-top: 2rem;
  // margin-bottom: 1rem;
  // margin-top: 1rem;
  // gap: 0rem;
  
  `}
`;
export const TextIconsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
export const TextIconsRowText = styled.div`
  text-decoration-line: underline;
  text-transform: capitalize;
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  // ${media.smallScreen`
  // width: 35vw;
  // `}
`;

export const ProductNameHeader = styled.h1`
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  color: #282c3f;
  font-size: 25px;
  /* margin-bottom: 10px; */
  font-family: ${(props) => props.theme.typography.baseFontFamily},
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  ${media.largeScreen`
       display:none;
    `}
`;

export const ProductNameHeaderSsr = styled.div`
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  color: #282c3f;
  font-size: 25px;
  /* margin-bottom: 10px; */
  font-family: ${(props) => props.theme.typography.baseFontFamily},
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  ${media.largeScreen`
     display:none;
    `}
`;

export const ProductTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin: 10px 0;
  justify-content: start;
  ${media.largeScreen`
   display:none;
  `}
`;

export const Emoji = styled.span`
  font-size: 19px;
  margin-left: 2px;
  ${media.largeScreen`
font-size : 16px;
margin-left : 0px;
`}
`;

export const ProductBox = styled.section`
  background: ${(props) => props.color};
  font-size: 14px;
  border-radius: 5px;
  font-weight: 450;
  text-align: center;
  padding: 4px 8px;
  ${media.largeScreen`
padding:4px 6px;
 font-size:12px;
border-radius: 3px;

`}
`;

export const Description = styled.div`
  width: 90%;
  ${media.largeScreen`
  width:100%;
  `}
`;

export const ProductPricing = styled.h4`
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  margin-bottom: ${(props) => props.theme.spacing.spacer};
`;

export const StockContainer = styled.p`
  color: #eb5757;
`;

export const OfferBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f4f8f3;
  border-radius: 4px;
  padding: 5px 10px;
  width: 70%;
  ${media.xLargeScreen`
    width: 80%;
  `}
  ${media.largeScreen`
    width: 100%;
  `}
  margin-top: 30px;
`;

export const OfferBoxHeading = styled.div`
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.primaryDark};
  span {
    margin: 0 5px;
  }
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const OfferList = styled.ul`
  padding: 0 0 0 15px;
  list-style: disc;
`;

export const OfferListItem = styled.li`
  padding: 6px;
`;
export const OfferHeader = styled.h4`
  font-weight: 600;
  font-size: 14px;
`;
export const Offer = styled.p`
  margin-left: 10px;
  font-size: 14px;
`;
export const DescriptionHeading = styled.h4`
  font-size: ${(props) => props.theme.typography.h4FontSize};
  margin: 5px 0px;
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  color: ${(props) => props.theme.colors.primaryDark};
`;
export const DescriptionContent = styled.p<{
  show: boolean;
}>`
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.show === false && 3};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const WeightWithUnit = styled.span`
  color: #686b78;
  font-size: 12px;
`;

export const ReadMore = styled.span`
  font-weight: 600;
  cursor: "pointer";
  font-size: "14px";
  height: "15px";
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`;
// export const KeyBenefits = styled.div`
//   margin-top: 80px;
// `;

// export const PDPCardSection = styled.div`
//   display: flex;
//   width: 90%;
// `

// export const PDPCard = styled.div`
//   width: 30%;
//   padding: 5px 20px;
// `;

// export const CardDesc = styled.div`
//   h4 {
//     font-weight: ${props => props.theme.typography.boldFontWeight}
//   }
// `;

// export const KeyIngredients =  styled.div`
//   margin-top: 80px;
// `;

// export const IngredientBox = styled.div`
//   display: flex;
//   width: 100%;
// `
// export const IngredientImg = styled.div`
//   width: 30%;
//   img {
//     width: 100%;
//   }
// `;

// export const IngredientText = styled.div`
//   padding: 80px;
//   width: 70%;
// `;

// export const HowToUse = styled.div`
//   margin-top: 80px;
// `;

// export const FAQSection = styled.div`

// `;

export const MetaDataSection = styled.div`
  width: 100%;
  padding: 0px;
`;

export const VariantPicker = styled.div`
  display: grid;
  margin-bottom: ${(props) => props?.marginBottom || "8px"};
  margin-top: ${(props) => props?.marginTop || "4px"};
  min-height: ${(props) => props?.minHeight || "unset"};
  .react-select-wrapper,
  .input {
    width: 50%;
    margin-bottom: 1rem;
  }
`;

export const QuantityInput = styled.div`
  margin-top: 20px;
  padding-top: 20px;
`;

export const ErrorMessage = styled.p`
  color: ${(props) => props.theme.colors.error};
  // margin: 0.5rem 0rem;
  font-weight: 500;
  font-size: 12px;
`;

export const Price = styled.div`
  margin-top: 20px;
  p {
    font-size: 0.8rem;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  ${media.smallScreen`
    flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0;


  `}
`;

export const DiscountedPrice = styled.div<{ fontSize?: string }>`
  margin-bottom: 1px;
  span {
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) => props.fontSize || "16px"} !important;
    // line-height: 160%;
    ${media.smallScreen`
    font-size: 19px !important;
    `}
  }
`;

export const UndiscountedPrice = styled.div`
  // margin-top: 8px;
  span {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    // line-height: 140%;
    text-decoration-line: line-through;
    color: black;
    ${media.smallScreen`
    font-size: 24px;
    `}
  }
`;

export const DeliveryTimerNew = styled.div`
  display: none;
  ${media.smallScreen`
    display:block;
    padding: 0.3rem;
    color: #000000;
    background:#B1FBBA;
    font-size: 12px;
    text-align: center;

    span{
      color:#B43527 !important;
      font-weight:700;
      margin-left:0.1rem;
    }
  `}
`;

export const DeliveryTimer = styled.div`
  margin-top: 12px;
  padding: 0.5rem;
  font-size: 15px;
  span {
    font-weight: 700;
  }
  ${media.mediumScreen`
    display:none;
  `}

  ${minMedia.largeScreen`
    display:block;
    text-align:center;
    font-size: 18px;
    `}
`;
export const Rating = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  gap: 18px;
  ${media.smallScreen`
    gap: 8px;
    `}
  margin-top: 10px;

  font-size: 12px;
  line-height: 150%;

  color: #555555;

  font-style: normal;
  font-weight: normal;

  ${media.largeScreen`
   display:none;
  `}
`;

export const VariantUndiscount = styled.div``;

export const VariantDiscount = styled.span`
  color: #fff !important;
  text-align: center;
  padding: 0.2rem 0.4rem;
  font-family: "CocoSharp XL";
  font-style: normal;
  font-weight: 800;
  line-height: 120%;
  font-size: 10px !important;
  letter-spacing: 0.619px;
  text-transform: uppercase;
  border-radius: 7.429px;
  background: #06543d;
  margin-left: 0.4rem !important;

  @media (min-width: 980px) {
    font-size: 10px !important;
  }
`;

export const VariantLabel = styled.div`
  span {
    text-align: center;
    font-family: CocoSharp XL;
    font-size: 10px;
    font-weight: 400;
    color: #808080;
  }
  @media (max-width: 980px) {
    span {
      font-size: 10px;
    }
  }
  @media (max-width: 980px) {
    font-size: 10px;
  }
`;

export const VaraintPriceContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export const VaraintPriceNew = styled.div`
  // display: none;
  display: flex;
  align-items: center;
  color: #222;
  font-family: CocoSharp XL;
  font-size: 27.33px;
  font-style: normal;
  margin-top: 1rem;
  font-weight: 700;
  span {
    text-align: center;
    font-family: "CocoSharp XL";
    color: #808080;
    font-size: 14.29px;
    font-weight: 700;
    // margin-left: 0.6rem;
    line-height: 150%;
    letter-spacing: 0.05rem;
  }

  span:nth-child(2) {
    text-decoration: line-through;
    // font-size: 22px;
    margin: 0 0.5rem 0 0.25rem;
  }
  @media (max-width: 540px) {
    font-size: 26px;
  }
  @media (max-width: 580px) {
    margin-top: 3.4rem;
  }
  @media (min-width: 980px) {
    font-size: 26px;
    margin-top: 0.6rem;
    span {
      font-size: 14.29px;
    }
  }
`;

export const VaraintPrice = styled.div`
  // display: none;
  display: block;
  color: #222;
  font-family: CocoSharp XL;
  font-size: 20px;
  font-style: normal;
  margin-top: 1rem;
  font-weight: 700;
  line-height: 150%;
  span {
    text-align: center;
    font-family: CocoSharp XL;
    font-size: 12px;
    font-style: italic;
    font-weight: 400;
    margin-left: 0.2rem;
    line-height: 150%;
  }
  @media (min-width: 400px) and (max-width: 580px) {
    margin-top: 2.4rem;
  }

  @media (min-width: 980px) {
    font-size: 28px;
    margin-top: 0.6rem;
    span {
      font-size: 16px;
    }
  }
`;

export const LowStock = styled.div`
  display: none;
  ${media.largeScreen`
  display:block;
  background: #FFE8CC;
  position:absolute;
  top:0;
  left:0;
  text-align:center;
  width:100%;

  p{
    color: #A2000B !important; 
    font-weight: 700;
  }
`}

  @media(max-width:400px) {
    top: -1.85rem !important;
  }

  @media (max-width: 580px) {
    top: -2.8rem !important;
  }

  @media (min-width: 540px) and (max-width: 1024px) {
    top: -1.6rem;
  }
`;

export const CheckBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export const CheckHeader = styled.h5`
  color: #56774d;
  margin-bottom: 10px;
`;
export const CheckResult = styled.p`
  color: #56774d;
  margin-top: 5px;
`;

export const CheckInput = styled.input`
  border: none;
  padding: 10px 15px;
  font-size: 13px;
  color: #686b78;
  outline: none;
  width: 80%;
`;
export const CheckButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
`;
export const CheckForm = styled.form`
  display: flex;
  align-items: center;
  border: 1px solid #c4c4c4;
  width: 228px;
  color: #56774d;
  justify-content: space-between;
  ${media.mediumScreen`
    width:100%

  `}
`;

export const DetailsBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
`;
export const DetailBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;
export const DetailsImg = styled.img`
  width: 57px;
  height: 57px;
  border: 1px solid black;
  margin-right: 10px;
`;

export const DetailsLabel = styled.p`
  text-align: center;
  color: #686b78;
  white-space: nowrap;
`;

export const MainText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;
export const MainTextLeft = styled.div`
  div {
    flex-direction: row !important;
    /* gap: 12px !important; */
    > div:nth-child(1) {
      margin-right: 12px !important;
      // margin-top: 2px !important;
      margin-left: 6px !important;
    }
  }
`;
export const MainTextRight = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  > svg {
    margin-left: 4px;
    margin-bottom: 2px;
  }
  ${media.smallScreen`
  font-size: 22px;
  white-space:nowrap;
  `}
  text-transform: capitalize !important;
  svg {
    width: 10px;
    height: 10px;
  }
`;
export const DietPlanSticker = styled.div`
  white-space: nowrap;
  background-color: #eefdeb;
  color: #000000;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 9px;
  justify-content: center;
  align-content: center;
  float: right;
  ${media.smallScreen`
  font-size: 12px;

  `}
`;
export const Sticker = styled.div`
  white-space: nowrap;
`;
export const Sticker2 = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
`;

export const MobileStaticATCButton = styled.div`
  margin-bottom: 1rem;
  ${minMedia.mediumScreen`
    display:none;
  `}
`;
export const MobileStaticSubscribeButton = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
  ${minMedia.mediumScreen`
    display:none;
  `}
`;

export const SubscribeNowButton = styled.div`
  margin-top: 5px;
  background: #02262a;
  border: 1px solid #02262a;
  border-radius: 2px;
  span {
    color: white;
    text-transform: capitalize !important;
  }
`;

export const PdpStickyButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  > div {
    flex: 1;
  }
`;

export const ATCDesktop = styled.div<{ margintop: string }>`
  width: 100%;
  display: none;
  ${minMedia.mediumScreen`
    display:block !important;
  `}
  margin-top: ${(props) => props.margintop || ""};
`;
export const ATCMobileSticky = styled.div`
  width: 100%;
  display: none;
  ${media.mediumScreen`
    display:block !important;
  `}
`;

export const ShowVariantPickerBackground = styled.div`
  ${media.mediumScreen`
position:fixed;
top:0;
left:0;
z-index:3;
width:100%;
height:100%;
overflow: hidden;
background: rgba(0,0,0,0.5);
`}
`;
export const OfferCountWrapper = styled.div`
  display: flex;
`;

export const OfferToggle = styled.div`
  margin-left: 12px;
  cursor: pointer;
  ${({ rotateicon }) =>
    rotateicon &&
    `
    & > div{
      transform:rotate(180deg);
    }
  `}
`;

export const OfferHeaderWrapper = styled.div`
  cursor: pointer;
  ${({ showunderline }) =>
    !showunderline &&
    `
    & > div{
      border-bottom:none !important;
    }
  `}
`;
