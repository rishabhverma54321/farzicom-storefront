import { validateEmail } from './../../@next/components/organisms/Login/PhoneNumberValidation';
import { discountExists } from './../../@next/components/organisms/AddToCartSectionPlixlife/stockHelpers';
import { media, minMedia } from "@styles/media";
import { styled } from "@styles/themes";

export const MainContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
`;

export const OrderContainer = styled.div`
  box-sizing: border-box;
  padding: 0px;
`;

export const BoxItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
  margin-top: 0.25rem;
  // border-bottom: 1px solid #e5e5e5;
  ${media.mediumScreen`
   margin-top: 0;
  `}
`;

export const BoxItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  display: -webkit-box;
  span:nth-child(1) {
    font-weight: 500;
    white-space: nowrap;
     font-size: 0.8rem;
  }
`;
export const BoxItemName = styled.span`
  font-family: "CocoSharp XL";
  font-size: 11px;
  white-space: nowrap
  margin-left: 8px;
`;

export const AddressContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;

  ${media.mediumScreen`
  flex-direction: column;
  `}
`;

export const AddressTile = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-sizing: border-box;
  padding: 32px 24px 24px 24px;
  width: 100%;
`;

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${media.mediumScreen`
    background: #F6F6F6;
  `}
`;

export const OrderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const RowTextImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;

  ${media.mediumScreen`
  gap: 0;
  `}
`;

export const OrderItemsDetailsDesktop = styled.div`
  ${media.mediumScreen`
    display:none;
  `}
`;

export const OrderItemsDetailsMob = styled.div`
  ${minMedia.mediumScreen`
    display:none;
  `}
`;

export const RowTextContainer = styled.div<{
  gap?: string;
  background?: string;
  borderBottom?: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.gap || "6px"};
  padding: 22px 24px;
  ${media.mediumScreen`
   align-items: flex-start;
  `}
`;

export const RowDateText = styled.div`
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  text-align: right;
  color: #808080;
`;

export const LastRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1rem;
  border-top: 1px solid #e7e7e7;
  padding-top: 1rem;
`;

export const DetailsText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 120%;
  font-weight: 700;
`;

export const Text = styled.div<{ color?: string }>`
  color: ${props => props.color || "#000"};
  display: flex;
  margin-right: ${props => props.marginRight ? props.marginRight : "0px"};
  ${media.mediumScreen`
    display: flex;
    flex-direction: column;
    ${({switchdirection})=>
     switchdirection && `
       flex-direction:row;
       margin-top:10px;
     `
    }
    ${({hideText})=>
     hideText && `
       display:none;
     `
    }
    ${({makeBold})=>
     makeBold && `
     span{
       font-size:14px !important;
       font-weight:700 !important;
       line-height:17px !important;
       color: #000000 !important;
     }
     `
    }

  `}
`;

export const RowText = styled.div<{
  color?: string;
  fontSize?: { mobile?: string; desktop?: string };
  padding?: string;
  borderBottom?: string;
  fontWeight?: string;
}>`
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  color: #000000;

  ${media.mediumScreen`
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    &:nth-child(2),&:nth-child(3),&:nth-child(4){
      display:none;
    }
  
  `}

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: ${props => props.borderBottom || "none"};
  span{
    font-family: "CocoSharp XL" !important;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    color: #808080;
  }
`;

export const Title = styled.div`
  padding: 22px 24px;
  border-bottom: 1px solid #e7e7e7;
  display: flex;
  align-items: center;
  gap: 20px;
  div{
    cursor: pointer;
  }
`;

export const Header = styled.div<{ color?: string }>`
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 140%;
  color: #000000;
`;

export const StatusTagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const PaymentStatusTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background: ${props => props.updateColour ? "rgba(255, 0, 0,0.3) !important": props.updatepaymentStatus ? "rgba(0,0,0,.1) !important" : "#eefdeb" };
  /* background-color: #eefdeb; */
  border-radius: 4px;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  div{
    color: ${props => props.updateColour ? "rgb(255, 0, 0) !important": props.updatepaymentStatus ? "gray !important" : "#1EAF6D" };
  }
  svg{
    path{
      fill: ${props => props.updateColour ? "rgb(255, 0, 0) !important": "#1EAF6D" };
    }
  }
`;

export const StatusTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background: ${props => props.updateColour ? "rgba(255, 0, 0,0.3) !important": props.updateOrderstatus ? "rgba(0,0,0,.1) !important" : "#eefdeb" };
  /* background-color: #eefdeb; */
  border-radius: 4px;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  div{
    color: ${props => props.updateColour ? "rgb(255, 0, 0) !important": props.updateOrderstatus ? "gray !important" : "#1EAF6D" };
  }
  svg{
    path{
      fill: ${props => props.updateColour ? "rgb(255, 0, 0) !important": "#1EAF6D" };
    }
  }
`;

export const Table = styled.table`
width: calc(100% - 48px);
  margin: 21px 24px 0px 24px;
  padding: 32px 32px 24px 32px;
  background: #F6F6F6;
  border-radius: 8px 8px 0px 0px;
  border-collapse: unset;
`;

export const Thead = styled.thead``;
export const Th = styled.th<{ textAlign?: string }>`
  text-align: ${props => props.textAlign || "right"};
  font-size: 14px;
  line-height: 160%;
  color: #808080;
`;

export const Tbody = styled.tbody``;
export const Tr = styled.tr``;
export const Td = styled.td<{ textAlign?: string }>`
  text-align: ${props => props.textAlign || "right"};
  font-size: 14px;
  line-height: 160%;
  color: #000000;
  max-width: 20vw;
  vertical-align: top;

  &:last-child{
    display: flex;
    flex-direction: column;

  }
`;

export const FreePrice = styled.div`
  font-weight: 700;
  color: rgb(30, 175, 109);
`

export const ImageAndName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  div{
    &:nth-child(2){
      // display: -webkit-box;
      // -webkit-line-clamp: 2;
      // -webkit-box-orient: vertical;
      // overflow: hidden;
    }
  }
  ${media.mediumScreen`
  font-size:1rem;
  `}
`;

export const NewRowTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0px 24px 0px 24px;
    padding: 22px 24px;
    background: #F6F6F6;
    border-radius: 0px 0px 8px 8px;
    ${media.mediumScreen`
      margin:0px;
    `}
`;

export const NewRowText = styled.div<{
  color?: string;
  fontSize?: { mobile?: string; desktop?: string };
  padding?: string;
  borderBottom?: string;
  fontWeight?: string;
}>`
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: #808080 !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  &:not(:last-child){
    margin-bottom:12px;

  }

  div{
    &:nth-child(2){
      color: #808080;
    }
  }
  &:nth-child(1){
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 160%;
    color: #000000 !important;
    margin-bottom: 18px;
  }
  &:nth-child(7){
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 160%;
    color: #5DD37C;
    margin-bottom: 28px;
    div{
      color: #5DD37C;
    }
  }
  &:nth-child(8){
    font-family: "CocoSharp XL" !important;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    div{
      &:nth-child(1){
        color: #000000;
      }
      &:nth-child(2){
        font-family: "CocoSharp XL" !important;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        text-align: right;
        color: #000000;
      }

    }
  }
  ${media.mediumScreen`
    font-size: 16px;
  `}
  `;

  export const AddressRowText = styled.div`
    font-family: "CocoSharp XL" !important;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 140%;
    color: #000000;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-align-items: flex-start;
    -webkit-box-align: flex-start;
    -ms-flex-align: flex-start;
    align-items: flex-start;
    border-bottom: none;
    &:nth-of-type(1){
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 160%;
      color: #000000;
    }
    &:nth-of-type(2){
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      text-align: right;
      color: #808080;
    }
    &:nth-child(2){
      display: contents;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 140%;
      color: #000000;
    }
    &:nth-child(n+3){
      font-style: normal;
      font-weight: 400 !important;
      font-size: 14px !important;
      line-height: 180% !important;
      color: #808080 !important;

    }
  `;

  export const PaymentHeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    ${media.mediumScreen`
    flex-direction: column;
    align-items: flex-start;
    `}
  `;

  export const AddressContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-style: normal;

    ${media.mediumScreen`
      flex-wrap:wrap;
    `}
    div{
      font-weight: 400 !important;
      font-size: 14px !important;
      line-height: 180% !important;
      color: #808080 !important;
    }
  `;

export const Contactwrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: baseline;
padding: 21px 0px;
border-top: 1px solid #E7E7E7;
${media.mediumScreen`
  background: #F5F5F5;
`}
span{
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: #808080;
}
button{
  font-family: 'cocosharp_xlextrabold';
  font-weight: 800;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.05em;
  text-decoration-line: underline;
  text-transform: uppercase;
  color: #5DD37C;
  margin-left:10px;
}
`;

export const Paidtext = styled.div`
  padding: 6px 8px 4px 8px;
`;

export const Orderstatus = styled.div`
  padding: 6px 8px 4px 8px;
`;

export const AddReview = styled.span`
  display:"block" !important;
  font-family: "cocosharp_xlextrabold" !important;
  font-style: normal !important;
  font-weight: 800 !important;
  font-size: 12px !important;
  line-height: 150% !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase;
  color: #5DD37C !important;
  cursor: pointer;
  margin-top: 22px;
  text-decoration: underline;
`;

export const ProductTitle = styled.div`
      ${media.mediumScreen`
      font-size:14px;
      // height: ${props => (props?.height ? props?.height : "40px")};
      min-height: 25px;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
    `}
       `;

export const TitleReviewWrapper = styled.div`
      ${media.mediumScreen`
      display:flex;
      flex-direction:column;
    `}
`;

export const OrderandDeliveryStatusWrapper = styled.div`
    display: flex;
    flex-direction:row;
    margin-bottom: 12px;
    & > div{
      padding: 4px 8px;
      background: #D1FFD9;
      &:first-child{
        color: #1EAF6D;
        margin-right: 8px;

      }
      & > div{
        border-radius: 4px;
        font-family: 'CocoSharp XL';
        font-style: normal;
        font-weight: 800;
        font-size: 12px;
        line-height: 120%;
  
        color: #1EAF6D;
        padding:0px;
        display: flex;
        flex-direction: row;
        align-items: center;
        svg{
          margin-right: 4px;
        }
      }
    }
`;

export const OrderNumber = styled.div`
  margin-bottom: 12px;
`;

export const Account_review = styled.div`
  display: flex;
  .WriteAReviewContainer__body{
    width: 60%;
    background-color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    overflow-y: scroll;
    ${media.mediumScreen`
      width: 90%;
      height: 86vh;

    `}

  }
`;
