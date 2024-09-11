import { styled } from "@styles/themes";
import { media } from "@styles/media";
import { Button } from "@components/atoms/Button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const SubHeadingText = styled.div`
  font-size: 11.5px;
  font-style: italic;
`;

export const FormContainer = styled.div<{ disabled?: boolean }>`
  background: ${props => (props?.disabled ? "#D9D9D9" : "")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "CocoSharp XL" !important;
  width: 100%;
  pointer-events: ${props=>props?.disabled ? 'none':'all'}
  > input {
    font-family: "CocoSharp XL" !important;
    font-size: 14px !important;
    width: 100%;
    outline: none;
    border: none;
    height: 45px;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: 600;
    color:${props => (props?.disabled ? "#6C6C6C !important" : "#686b78 !important")} 
    background-color: ${props=>props?.disabled ? "rgb(217, 217, 217) !important" : 'white !important;'}
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
  color: ${props =>props?.color ? props?.color : props.theme.button.colors.newPlixGreen};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  height: 24px;
  text-align: center;
  margin: 10px 15px;
  border-bottom: ${props => (props.disabled ? "" : "3px solid #9dec9b")};
  text-transform: uppercase;
  background-color:${props=> props?.background ? props?.background : "#fff"};
  font-family: "CocoSharp XL" !important;
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
  color: #56774d;
  align-self: flex-start;
  font-size: 14px;
  font-style: italic;
  margin-top: 5px;
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

export const CouponCard = styled.div<{ isApplied?: boolean }>`
  background-color: white;
  padding: 1rem 2rem;
  margin: 0.5rem 0rem;
  border-radius: 8px;
  border: ${props => props.isApplied ? "2px solid #5dd37C" : "1px solid #e7e7e7"};
  ${media.smallScreen`
  padding: 0.75rem 1rem;
  `}
`;

export const OfferCode = styled.div<{ isApplied?: boolean }>`
border: 1px dashed #e7e7e7;
padding: 8px 14px;
font-weight: 600;
color: black;
font-size: 14px;
`


export const TitleAndCodeWrapper = styled.div<{
  isApplied?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  margin-bottom:0.25rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  button {
    color: ${props =>
      props.disabled
        ? "gray"
        : props.isApplied
        ? props.theme.colors.plixDarkGreen
        : props.theme.colors.newPlixGreen};
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
  }
  > div:nth-child(1) {
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  div:nth-child(2) {
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    >div{
      background: ${props => (props.isApplied ? "#ECF8E1" : "white")};
      margin-left: 0.75rem;
      margin-right: 0.75rem;
      white-space: nowrap;
      border: 2px dashed
        ${props =>
          props.isApplied
            ? props.theme.colors.plixDarkGreen
            : props.theme.colors.newPlixGreen};
      padding: 0.15rem 0.75rem;
      border-radius: 4px;
      font-size: 12px;
        ${media.smallScreen`
        font-size: 10px;
      `}
      color: ${props =>
        props.isApplied
          ? props.theme.colors.plixDarkGreen
          : props.theme.colors.newPlixGreen};
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;

export const CouponListBody = styled.div<{ isExpanded: boolean }>`
  background-color: #f6f6f6;
  border: 1px solid #E7E7E7;
  border-radius: 8px;
`;
