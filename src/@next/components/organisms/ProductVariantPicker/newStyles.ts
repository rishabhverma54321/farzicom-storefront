import { media, minMedia } from "@styles/media";
import { styled } from "@styles/themes";

export interface fontVariantAttribute {
  weight?: string | number;
  size?: string;
}

export const Wrapper = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : "1rem !important"};
`;
export const Hr = styled.hr`
  width: 100%;
  border: 0.5px solid #e7e7e7;
  margin: 10px 0 25px 0;
  background: #e7e7e7;
  ${media.smallScreen`
  margin: 10px 0 15px 0;
    position: relative;
    left: -20px;
    width: calc(100% + 40px);
  `}
`;

export const NewAttribute = styled.h3`
  margin-bottom: 4px;
  font-style: normal;
  color: #06543d;
  font-weight: 700;
  font-size: 17px;
  line-height: 160%;
  margin: 0.8rem 0 0.4rem 0;

  ${media.smallScreen`
   font-size: 14px;
    margin: 0.4rem 0;
  `}
`;

export const VariantWeightDescription = styled.div`
  margin-top: 1rem;
  color: #06543d;
  font-family: CocoSharp XL;
  font-size: 16.198px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: 0.324px;
  padding: 0.4rem 1rem;
  background: #fff7c3;
  border-radius: 9px;

  ${media.smallScreen`
    font-size: 12px;
    padding: 0.5rem 0.7rem;
    margin-bottom: 0.2rem;
  `};
`;

export const Attribute = styled.h3<{
  font?: fontVariantAttribute;
  color?: string;
  lineHeight?: string;
  marginBottom?: string;
}>`
  text-transform: capitalize;
  margin-bottom: ${(props) => props.marginBottom || "4px"};

  font-style: normal;
  font-weight: ${(props) => props.font?.weight || "bold"};
  font-size: ${(props) => props.font?.size || "14px"};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight || "160%"};

  display: ${(props) => props.display || "flex"};
  gap: 8px;
`;

export const VaraintOverlay = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #000000;
  opacity: 0.7;
`;

export const SmallVaraintCrossIcon = styled.div`
  padding: 0 0.4rem;
`;

export const SmallVariantAttribute = styled.h3<{
  font?: fontVariantAttribute;
  color?: string;
  lineHeight?: string;
  marginBottom?: string;
}>`
  position:relative;
  top:-10px;
  right:10px
  text-transform: capitalize;
  margin-bottom: ${(props) => props.marginBottom || "4px"} !important;
  width:calc(100% + 20px);
  margin: auto;
  font-style: normal;
  font-weight: ${(props) => props.font?.weight || "bold"};
  font-size: ${(props) => props.font?.size || "14px"};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight || "160%"}; 
  display: flex;
  padding:0.6rem 1rem;
  background: #5DD37C;
  justify-content:space-between;
  gap: 8px;
`;

export const NewVariants = styled.ul<{
  justifyContent: string;
  marginTop: string;
  gap: string;
}>`
  display: flex;
  justify-content: ${(props) => props?.justifyContent || "start"};
  margin-top: ${(props) => props?.marginTop || 0};
  flex-wrap: wrap;
  gap: 10px;
`;

export const Variants = styled.ul<{ justifyContent?: string }>`
  display: flex;
  flex-direction: row;
  gap: 8px;

  ${media.smallScreen`
      gap: 0px;
  `}
  justify-content: ${(props) => props.justifyContent || "space-evenly"};
  flex-wrap: wrap;
  width: 100%;

  li:first-child {
    margin-left: 0;
  }
  li:last-child {
    margin-right: 0;
    ${media.smallScreen`
      height: auto;
      margin:0px;
  `}
  }
`;

export const SmallVariants = styled.ul<{ justifyContent?: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${media.smallScreen`
      gap: 1.4rem;
      margin:0.5rem 8px;
      li{
        width:96%;
      }
  `}
  justify-content: ${(props) => props.justifyContent || "space-evenly"};
  flex-wrap: wrap;
  width: 100%;

  li:first-child {
    margin-left: 0;
  }
  li:last-child {
    margin-right: 0;
  }
`;

export const VariantButtonContainer = styled.ul`
  display: flex;
  width: 100%;
  justify-content: start;
  gap: 8px;
  cursor: pointer;
  ${media.smallScreen`
  justify-content: space-between;

  @media(max-width: 370px){
   gap: 4px;
  }
  `}
`;

export const VariantButtonNew = styled.li<{
  padding?: string;
  borderRadius?: string;
}>`
  position: relative;
  letter-spacing: normal;
  text-align: center;
  border-radius: ${(props) => props?.borderRadius || "8px"};
  border: 3px solid #5dd37c;
  padding: ${(props) => props?.padding || "4px 12px"};
  cursor: pointer;
  font-weight: 700;
  font-size: 21px;
  display: flex;
  gap: 4px;
  span {
    font-size: 19px;
  }

  ${media.mediumScreen`
    padding: ${(props) => props?.padding || "2px 10px"};
    border: 2px solid #5DD37C;
    border-radius: 8px;
    span{
      font-size: 15px;
      font-weight: 700;
    }
  `};
`;

export const VariantConcernCard = styled.div`
  color: #000;
  font-family: CocoSharp XL;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  border-radius: 8.818px;
  border: 1.98px solid #bebebe;
  background: #fff;
  max-width: 110px;
  min-height: 154px;
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: space-between;
  padding: 0.3rem;
  cursor: pointer;

  @media (max-width: 390px) {
    max-width: 105px;

    @media (max-width: 370px) {
      max-width: 100px;
      min-height: 160px;
    }
  }

  ${minMedia.mediumScreen`
    max-width: 152px;
    padding: 0.3rem;
    border-radius: 12.609px;
    border: 2.831px solid #BEBEBE;
    min-height: 210px;
  `}
`;

export const VariantConcernCardImage = styled.div`
  position: relative;
  width: 95px;
  height: 86px;
  margin: 0 auto;
  img {
    border-radius: 4px;
  }

  @media (max-width: 390px) {
    width: 90px;

    @media (max-width: 370px) {
      width: 86px;
    }
  }

  ${minMedia.mediumScreen`
    width: 135.836px;
    height: 122.967px;

    img{
      border-radius: 5.7px;
    }
  `}
`;

export const VariantConcernTitle = styled.h3`
  color: #000;
  font-family: CocoSharp XL;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;

  ${minMedia.mediumScreen`
   font-size: 15.728px;
  `}
`;

export const VariantConcernText = styled.p`
  color: #808080;
  font-family: CocoSharp XL;
  font-size: 7px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;

  ${minMedia.mediumScreen`
    font-size: 10.5px;
  `}
`;

export const VariantButton = styled.li`
  position: relative;
  letter-spacing: normal;
  position: relative;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #e7e7e7;
  padding: 4px 8px;
  cursor: pointer;
  display: flex;
  gap: 4px;
  width: 31%;
  padding: 1rem;
  ${minMedia.largeScreen`
  padding: 1rem 1rem 1rem 10px;
  `}
  ${media.smallScreen`
    width: 30%;
    padding: 1rem 6px 0.5rem 6px;
    // padding-left: 16px;
    flex-direction: column;
    margin: 10px 4px !important;
    // padding: 0px !important;
  `}
`;

export const SmallVariantInput = styled.div`
  display: flex;
  gap: 1rem;
  align-items:center @media(max-width:375px) {
    gap: 0.5rem;
  }
`;

export const SmallVariantButton = styled.li`
  letter-spacing: normal;
  position:relative
  text-align: center;
  border: none !important;
  padding: 4px 8px;
  cursor: pointer;
  width: 100%;
  padding: 2rem 6px 0.5rem 6px;
  margin: 10px 4px !important;
  box-shadow: 2px 1px 8px 2px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  border-radius:0.5rem;
  background-color: ${(props) => (props?.active ? "#EEFDEB" : "")}
`;

export const RadioInput = styled.input`
  margin: 0;
  width: 20px;
  height: 20px;
`;

export const RadioInputDefault = styled.input`
  position: unset !important;
  -webkit-appearance: none;
  /* margin: 16px 4px; */
  /* margin-bottom: 20px; */
  margin: 0px;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  width: 20px;
  height: 20px;
  padding: 3px;
  background-clip: content-box;
  border: 1px solid #bbbbbb;
  background-color: transparent;
  pointer-events: none;
  border-radius: 50%;

  :checked {
    background-color: #009828;
    border: 1px solid #009828;
  }
`;
export const Variant = styled.li<{ height?: string; background?: string }>`
  max-width: 80px !important;
  width: 15%;
  height: ${(props) => props.height || "100%"};
  letter-spacing: normal;
  background: ${(props) => props.background || "unset"};
  ${minMedia.largeScreen`
    width: 50px;
    height: 50px
  `}
  margin: 0 4px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  /* letter-spacing: 0.1em; */

  img {
    border-radius: 8px;
    width: 100%;
  }
`;
export const VariantImg = styled.img`
  object-fit: contain;
`;

export const VariantLabel = styled.span`
  font-size: 15px;
  text-align: center;
  padding: 0 4px;
  height: auto;
  width: 100%;
`;

export const LableWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  height: 100%;
  width: 100%;
  /* gap: 4px; */
`;

export const SmallLableWrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // padding: 1rem 0;
  align-items: center;
  text-align: left;
  height: 100%;
  /* gap: 4px; */
`;

export const MonthRow = styled.div`
  color: #000000;
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => props?.fontSize || "16px"};
  line-height: ${(props) => props?.lineHeight || "150%"};
  margin-bottom: 2px;
`;

export const UnitRow = styled.div`
  font-style: normal;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h3 {
    vertical-align: bottom;
    display: table-cell;
    color: black;
    font-weight: 700;
    font-size: 1.05rem;
  }
  span {
    font-size: 0.75rem;
    line-height: 150%;
    font-weight: 400;
  }
`;

export const LableRow1New = styled.div`
  color: #fff;
  font-family: "CocoSharp XL";
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  min-width: 120px;
  width: 100%;
  font-size: 19px;
  padding: 0.1rem 0;
  text-align: center;
  border-radius: 0 0 8px 8px;
  background: #5dd37c;
  ${media.smallScreen`
  padding: 0.2rem 0;
  font-size: 15px;
  min-width:100px;
  @media(max-width: 350px){
    min-width: 80px;
  }
  `}
`;

export const LableRow1 = styled.div`
  color: black;
  font-style: normal;
  font-weight: 400;
  font-size: 17.65px;
  line-height: 150%;
  margin-bottom: 6px;

  ${media.smallScreen`
    color:black;
    font-size: 12px;
  `}
`;
export const LableRow2 = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => props.marginBottom || "0"};
  text-transform: capitalize;
  font-weight: 400;
  font-size: 14.71px;
  line-height: 150%;
  color: rgb(128, 128, 128);
  ${media.smallScreen`
  font-size: 10px;
`}
`;

export const PackText = styled.div`
  // text-transform: capitalize;
  font-weight: 500;
  font-size: 10px;
  line-height: 150%;
  color: #444444;
`;
export const LableRow3 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const PriceRowSmall = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  > div {
    > div {
      margin-top: 2px;
      display: flex;
      align-items: center !important;
      ${minMedia.xLargeScreen`
        flex-direction: row;
        align-items: center !important;
      `}
      // ${media.smallScreen`
      // flex-direction: row;
      // align-items: center !important;
      // `}
      > div:nth-child(1) {
        ${minMedia.largeScreen`
      order: 2;
      `}
        span {
          margin-left: 2px;
        }
      }
      div {
        span {
          font-size: 0.85rem;
          ${media.smallScreen`
          font-size: 0.8rem;
        `}
        }
      }
    }
  }
`;

export const TaxesNew = styled.div`
  color: #808080;
  text-align: start;
  font-family: CocoSharp XL;
  font-size: 9px;
  font-style: italic;
  font-weight: 400;
  line-height: 150%;

  ${minMedia.mediumScreen`
   font-size: 12.772px;
  `}
`;

export const Taxes = styled.div`
  color: #808080;
  font-family: CocoSharp XL;
  font-size: 8.65px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;

  ${media.smallScreen`
  font-size:5.88px;
  margin-left:0;
  `}
`;
export const SachetPrice = styled.div`
  color: #808080;
  font-family: CocoSharp XL;
  font-size: 11.77px;
  font-style: normal;
  font-weight: 400;
  span {
    font-weight: 700;
  }
  ${media.smallScreen`
      font-size:8px;
  `}
`;

export const LabelRow4 = styled.div`
  margin-top: 6px;
  ${media.smallScreen`
  margin-top:3px;
`}
  h3 {
    font-weight: bold;
    font-size: 12px;
    color: black !important;
    ${media.smallScreen`
    font-size: 10px;
    line-height: 0.75rem;
  `}
  }
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  span {
    font-size: 12px;
    color: gray !important;
    font-weight: 400;
    ${media.smallScreen`
    font-size: 10px;
    line-height: 0.75rem;
  `}
  }
`;

export const LabelRow5 = styled.div`
  > div {
    > div {
      flex-direction: row-reverse;
      align-items: flex-end;
      > div:nth-child(1) {
        margin-right: 4px;
      }
      > div:nth-child(2) {
        span {
          font-size: ${(props) =>
            props?.font ? props?.font : "14px"} !important;
        }
      }
    }
  }
`;

export const LabelRowNew5 = styled.div`
  display: flex;
  flex-direction: column-reverse;
  > div {
    > div {
      flex-direction: column-reverse;
      align-items: flex-end;
      > div:nth-child(1) {
        margin-right: 4px;
      }
      > div:nth-child(2) {
        span {
          font-size: ${(props) =>
            props?.font ? props?.font : "14px"} !important;
        }
      }
    }
  }
`;

export const PriceContainerNew = styled.div``;

export const PriceContainer = styled.div`
  display: flex;

  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  gap: 4px;
  ${media.xLargeScreen`
  flex-direction: column;
  gap: 0;


  `}
  ${media.smallScreen`
  flex-direction: column;
  gap: 0;


  `}
`;

export const DiscountedNew = styled.div`
  button {
    border-radius: 6px;
    background: #5dd37c;
    padding: 4px 6px;
    color: #fff;
    text-align: center;
    font-family: CocoSharp XL;
    font-size: 10px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%;
    letter-spacing: 0.5px;
    text-transform: uppercase;

    ${minMedia.mediumScreen`
      margin-top: 0.2.5rem;
      font-size: 14px;
      padding: 5.676px 8.515px;
      border-radius: 8.515px;
    `}
  }
`;

export const Discounted = styled.div`
  button {
    position: absolute;
    top: 5%;
    right: 5%;
    background-color: #095933 !important;
    font-style: normal;
    color: white !important;
    font-size: 11px !important;
    font-weight: 800;
    // line-height: 120% !important;
    z-index: 1;
    /* width: 52% !important; */
    width: fit-content !important;
    white-space: nowrap;
    padding: 2px 4px;
    // padding-top: 4px;
    border-radius: 4px;
    text-align: center;
    vertical-align: middle;
    ${media.largeScreen`
      margin-left: 4px;
  `}
    ${media.smallScreen`
    // line-height: 12px !important;
    // margin-left: 0px;
    font-size: 10px !important;
    margin-bottom: 2px;
    top: 2%;
    right: 4%;
  `}
  }
`;

export const PriceWithDiscountContainerNew = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0.3rem 1rem 0.3rem 0.4rem;
  @media (max-width: 370px) {
    padding: 0.5rem;
    @media (max-width: 350px) {
      padding: 0.3rem;
    }
  }
  ${minMedia.mediumScreen`
   padding: 0.5rem 1rem 0.5rem 0.6rem;

  `}
`;

export const PriceWithDiscountContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 6px ${media.largeScreen`
  flex-direction:row;
  // align-items: flex-end;
  // justify-content: flex-end; 
  margin-top: 2px;
  `};
`;

export const DiscountedPriceNew = styled.div`
  span {
    color: #222;
    font-family: CocoSharp XL;
    font-size: 27.333px;
    font-style: normal;
    font-weight: 700;
    line-height: 105%;

    ${minMedia.mediumScreen`
     font-size: 38.789px;
     line-height: 130%;
    `}
  }
`;

export const DiscountedPrice = styled.div`
  span {
    font-style: normal;
    font-weight: 700;
    font-size: 26.48px;
    line-height: 140%;
    color: black !important;
    ${media.smallScreen`
      font-size: 18px !important;
    `}
  }
`;

export const UndiscountedPriceNew = styled.div`
  margin-top: 0.3rem;
  text-align: start;
  font-family: CocoSharp XL;
  font-size: 9px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  color: #808080;

  span {
    margin-left: 0.1rem;
    font-family: CocoSharp XL;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    text-decoration: line-through;
  }

  ${minMedia.mediumScreen`
    font-size: 13px;
    margin-top: 0.7rem;
    line-height: 130%;
    span{
      font-size: 19px;
      line-height: 130%;
    }
  `}
`;

export const UndiscountedPrice = styled.div`
  // margin-top: 2px;
  // ${media.smallScreen`
  //   font-size: 0.76rem;
  // `}
  ${minMedia.largeScreen`
  margin-left:2px;
`}

  span {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 140%;
    text-decoration-line: line-through;
    color: #808080;
    ${media.smallScreen`
      font-size: 10px;
      line-height: 120%;
  `}
  }
`;

export const Months = styled.div``;

export const CustomVariantText = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translate(-50%);

  background-color: lightgreen;
  z-index: 1;
  white-space: nowrap;
  font-size: 10px;
  /* ${media.smallScreen`
    left: 30%;
    `} */
  padding: 4px;
  border-radius: 4px;
`;

export const AddToCart = styled.div`
  font-family: "CocoSharp XL";
  font-style: normal;
  padding: 0.5rem 1rem;
  font-weight: 800;
  font-size: 15px;
  line-height: 120%;
  letter-spacing: 0.05em;
  cursor: pointer;
  text-transform: uppercase;
  color: #5dd37c;
`;

export const VariantDiscount = styled.div`
  color: #000;
  text-align: center;
  font-family: "CocoSharp XL";
  font-size: 19px;
  font-style: normal;
  width: 100%;
  font-weight: 700;
  line-height: 160% ${media.smallScreen`
  // margin:0.2rem 0;
  font-size: 15.859px;
  `};
`;

export const SmallVariantDiscount = styled.div`
  position:absolute;
  top:-0.4rem;
  display:flex;
  justify-content:center;
  align-items:center
  background-color: #D1FFD9;
  color: #1EAF6D;
  white-space: nowrap;
  font-size: 10px;
  font-weight: 800;
  padding: 4px 6px;
  border-radius: 6px;
  line-height:120%;
`;

export const CustomBottomText = styled.div`
  position: absolute;
  bottom: -28px;
  border-radius: 0px 0px 8px 8px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  left: 0px;
  right: 0px;
  padding: 0.25rem;
  // z-index: -1;
  width: 100%;
  background-color: #9dec9b;
`;

export const VariantBigImage = styled.div`
  img {
    object-fit: contain;
    max-width: 54px;
  }
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px !important;
  ${media.smallScreen`
  margin:auto;
  margin-bottom: 8px !important;
  border: 0px !important;
  img {
    width:100%;
    height:auto;
    max-width:${(props) => props?.width || "100%"}
  }
  `}
`;
