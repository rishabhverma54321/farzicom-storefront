import { styled } from "@styles/themes";
import { media, minMedia } from "@styles/media";

export const CheckBox = styled.div`
  display: flex;
  margin-top: 25px;
  padding: 1rem;
`;

export const GiftBox = styled.div`
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  background: #f6f6f6;
  border-radius: 8px;
  margin: 0 32px 25px;
  padding: 1.25rem 0.75rem;
  ${media.smallScreen`
      margin: 0 20px 25px;
  `}
  > img {
    width: 43px !important;
    height: 43px !important;
    margin-right: 17px;
  }
  > div {
    h4 {
      font-family: "CocoSharp XL";
      font-weight: 700;
      font-size: 18px;
      line-height: 160%;
      color: #095933;
      margin-bottom: 4px;
    }
    p {
      font-family: "CocoSharp XL";
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      color: #095933;
      max-width: 331px;

      span {
        font-weight: 700;
      }
    }
    margin-left: 0.5rem;
    // padding: 0.5rem;
  }
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
// export const CheckForm = styled.form`
//   display: flex;
//   align-items: center;
//   border: 1px solid #c4c4c4;
//   width: 228px;
//   color: #56774d;
//   justify-content: space-between;
//   ${media.mediumScreen`
//     width:100%

//   `}
// `;

export interface IHrBorder {
  width: string;
  color: string;
  type: "solid" | "dashed";
}

export const Hr = styled.hr<{
  border: IHrBorder;
  marginTop?: string;
  hrFullWidth?: boolean;
}>`
  width: ${props => (props.hrFullWidth ? "calc(100% + 40px)" : "100%")};
  margin: 0;
  margin-top: ${props => props.marginTop || 0};
  border: ${props =>
    `${props.border.width} ${props.border.type} ${props.border.color} `};
  position: ${props => (props.hrFullWidth ? "relative" : "static")};
  left: ${props => (props.hrFullWidth ? "-20px" : "0px")};
`;

export const WalletBalance = styled.div`
  font-weight: 600;
  display: inline;
  font-size: 14px;
`;

export const RemainingWalletBalanceText = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 14px;
  margin: 0.5rem 0rem;
  background-color: #eefdea;
`;
export const CashbackStrip = styled.ul`
  > span {
    margin-right: 8px;
  }
  margin: 0 32px;
  margin-left: 16px;
  // background: #dff8ff;
  // border: 1px dashed #9edcf2;
  border-radius: 8px;
  padding: 5px 0;
  width: unset;
  // list-style-position: outside;
  h4 {
    font-family: "cocosharp_xlextrabold";
    font-weight: 800;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: #2f94d1;
  }
  p {
    font-family: "CocoSharp XL";
    font-weight: 700;
    font-size: 10px;
    line-height: 15px;
    text-align: center;
    color: #2f94d1;
  }
  li {
    text-align: left;
    list-style-type: disc;
    list-style-position: outside;
    color: rgba(120, 120, 120, 1);
  }
  ${media.smallScreen`
    padding: 0.75rem 1rem;
    padding-top: 0.25rem;
    margin: 0px;
  `}
`;

export const CartOfferPolicies = styled.ul<{
  customColor?: string;
  fontColor?: string;
  noBorder?: boolean;
}>`
  background-color: ${props => props.customColor || "#eefdeb"};
  > span {
    margin-right: 8px;
    margin-top: 4px;
  }
  color: ${props => props.fontColor || "black"};
  font-weight: 600;
  margin-top: 20px;
  padding: 0.75rem 1rem;
  transition: 0.3s;
  font-size: 12px;
  outline: none;
  text-align: center;
  border: ${props => (props.noBorder ? "0px" : "1px")}
  border-style:dashed;
  border-color: ${props => props.customColor || props.theme.colors.primary}
  border-radius: 4px;
  width: 100%;
  li {
    // white-space: nowrap;
    text-align: left;
    list-style-type: disc;
    margin-left: 4px;
    margin-bottom: 4px;
  }
  ${media.smallScreen`
    padding: 10px 10px;
    margin:0px 20px;
  `}
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;

  justify-content: flex-start;
  // gap: 8px;
  // padding: 5px 5px 6px 5px;
  // ${minMedia.largeScreen`
  // padding: 7px 8px 6px 8px;
  // `}
  span{
    font-family: 'CocoSharp XL';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 19px;
    color: #000000;
    ${media.smallScreen`
    font-size:16px;
    `}
    &:nth-child(2){
      text-decoration-line: line-through;
      font-family: 'CocoSharp XL';
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 120%;
      color: #808080;
      margin-right:9px;
      ${media.smallScreen`
        font-size:12px;
      `}
    }
  }
`;

export const DiscountedPrice = styled.div`
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    margin-right: 8px;
    // line-height: 160%;
    ${media.smallScreen`
    font-size: 1rem;
    `}
  }
`;
export const Discounted = styled.div`
  button {
    background: #cdefd4;
    border-radius: 6px;
    font-style: normal;
    font-family: "CocoSharp XL";
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 160%;
    color: #1eaf6d !important;
    width: fit-content !important;
    margin-left: 8px;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    padding: 4px 6px;
    ${media.smallScreen`
      font-size:12px;
    `}
  }
`;
export const UndiscountedPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  // font-size: 0.8rem;
  margin-right: 4px;
  font-weight: 500;
`;

export const ProgressBar = styled.div<{
  isSelected?: boolean;
  percent: number;
}>`
  background-color: #e7e7e7;
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 16px;
  .greentick {
    position: absolute;
    left: ${props =>
    typeof props.percent === "number" ? props.percent - 2 : props.percent}%;
    bottom: -8px;
  }
`;

export const ProgressBarFill = styled.div<{ percent: number }>`
  width: ${props => props.percent}%;
  position: absolute;
  background-color: #5DD37C;
  height: 8px;
  border-radius: 16px;
`;

export const CouponUnlockIcon = styled.span<{
  leftPosition: number;
  isUnlocked: boolean;
}>`
  position: absolute;
  left: ${props => props.leftPosition || "0"}%;
  top: -10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > span {
    font-size: 10px;
    font-weight: 700;
    text-align: center;
    line-height: 12px;
    min-width: 40px;
    // color: rgba(30, 125, 37, 1);
    color: ${props => (props.isUnlocked ? "rgba(30, 125, 37, 1)" : "black")};
  }
    .complete-icon{
      svg{
        g{
          path{
            fill:${props => (props.isUnlocked ? "#5dd37b" : "#D9D9D9")};
          }
        }
        > path{
          fill: ${props => (props.isUnlocked ? "#ffffff" : "#d9d9d9")};; 
        }
      }
    }
    .incomplete-icon{
      svg{
        // g{
        //   path{
        //     fill:${props => (props.isUnlocked ? "#e7e7e7" : "#ffffff")};
        //   }
        // }
        > path{
          fill: ${props => (props.isUnlocked ? "#e7e7e7" : "#5dd37b")};; 
        }
      }
    }
  ${media.smallScreen`
  left: ${props => props.leftPosition - 3 || "0"}%;
    `}
`;
