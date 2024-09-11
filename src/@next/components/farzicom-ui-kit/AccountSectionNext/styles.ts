import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div`
  width: 100%;
  font-family: 'CocoSharp XL' !important;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: #fff;
  margin: auto;
  padding: 0;
  border: 1px solid #E7E7E7;
  border-radius: 8px;
  ${media.smallScreen`
    border:none;
  `}
`;

export const Wrapper = styled.div`
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 20px 24px;
  ${media.smallScreen`
  padding: 0.75rem;
  `}
  background-color: #ffffff;
  &:not(:last-child){
    margin-bottom:22px;

  }
`;

export const OrderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const RowTextImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px 16px 16px 16px;
  position:relative;
`;

export const RowTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const LastRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid #e7e7e7;
  padding: 14px 16px;
  cursor: pointer;
`;

export const OrderCancel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'cocosharp_xlextrabold';
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 150%;
  ${media.smallScreen`
  font-size: 12px;
  `}
  letter-spacing: 0.05em;
  text-transform: uppercase;
    color: ${props => props?.color || " #BE0000"};
` 

export const DetailsText = styled.div`
  display: flex;
  align-items: center;
  position:absolute;
  right:1rem;
  gap: 8px;
  bottom:0.6rem;
  font-family: 'cocosharp_xlextrabold';
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 150%;
  ${media.smallScreen`
  font-size: 12px;
  right:1rem;
  bottom:1rem;
  `}
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #5DD37C;
`;

export const RowText = styled.div<{
  color?: string;
  fontSize?: { mobile?: string; desktop?: string };
}>`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #BEBEBE;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &:nth-child(2){
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 140%;
    color: #000000;
  }
  &:not(:last-child){
    margin-bottom: 6px;
  }
`;

export const Title = styled.div`
  padding: 22px 24px;
  font-family: 'CocoSharp XL' !important;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 140%;
  color: #000000;
  border-bottom: 1px solid #E7E7E7;
`;

export const NoorderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 32px 0px 42px 0px;
  p{
    font-family: "CocoSharp XL" !important;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 140%;
    text-align: center;
    color: #808080;
    margin-bottom: 42px;
  }
  a{
    background: #5DD37C;
    border-radius: 8px;
    padding:16px 27px;
    font-family: "CocoSharp XL" !important;
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 100%;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #FEFFED;
  }

`;

export const NoorderImage = styled.div`
  display: block;
  width: 205px;
  height: 204px;
  margin-bottom: 24px;
  img{
    width: 100%;
    height: 100%;
  }
  & >span{
      position: relative !important;
      display: block !important;
      img{
          position: relative !important;
          width: 100% !important;
          height: 100% !important;
          max-width: unset !important;
          max-height: unset !important;
          min-width: unset !important;
          min-height: unset !important;
          @media (max-width:520px){

          }
      }
    }
`;

export const StatusTagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0px 4px;
`;

export const PaymentStatusTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: ${props => props.updateColour ? "rgba(255, 0, 0,0.3)": props.updatepaymentStatus ? "rgba(0,0,0,.1)" : "#D1FFD9" };
  border-radius: 4px;
  font-family: 'cocosharp_xlextrabold';
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 120%;
  color: ${props => props.updateColour ? "rgb(255, 0, 0)": props.updatepaymentStatus ? "gray" : "#1EAF6D" };
  text-transform: capitalize;
  ${media.smallScreen`
  font-size: 10px;
  `}

  svg {
    path{
      fill: ${props => props.updateColour ? "rgb(255, 0, 0)": "#1EAF6D" };
    }
  }
`;

export const StatusTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: ${props => props.updateColour ? "rgba(255, 0, 0,0.3)": props.updateOrderstatus ? "rgba(0,0,0,.1)" :  "#D1FFD9" };
  border-radius: 4px;
  font-family: 'cocosharp_xlextrabold';
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 120%;
  color: ${props => props.updateColour ? "rgb(255, 0, 0)": props.updateOrderstatus ? "gray" : "#1EAF6D" };
  text-transform: capitalize;
  ${media.smallScreen`
  font-size: 10px;
  `}

  svg {
    path{
      fill: ${props => props.updateColour ? "rgb(255, 0, 0)": "#1EAF6D" };
    }
  }
`;
export const Paidtext = styled.div`
    padding: 4px 0px 2px 0px;
`;