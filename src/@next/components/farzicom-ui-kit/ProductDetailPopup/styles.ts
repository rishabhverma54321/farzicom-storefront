import { media } from "@styles";
import { plixBrightGreen } from "@temp/themes/plixlifefc/globalStyles/constants";
import styled from "styled-components";

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

export const popupPriceContainer = styled.div`
  background-color: #fff;
`;

export const PopupPrice = styled.div<{ popupFor?: string, disabled:any }>`
  display: flex;
  flex-direction: row;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  margin: 10px;
  border-radius: 8px;
  background: #5dd37c 
  ${props => props?.disabled && `
  pointer-events: none !important;
  background:gray !important;
  `}
  span {
    color: #fff;
    font-size: 18px !important;
    text-decoration: unset !important;
    span {
      font-size: 14px !important;
      text-decoration: line-through !important;
    }
  }
  h4 {
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 600;
    margin-right: 1rem;
  }
  > div {
    span {
      font-size: 1.25rem;
      font-weight: 600;
    }
    margin-bottom: 0.5rem;
  }
  ${media.mediumScreen`
    h4,span{
      font-size:1.25rem;
    }
  `}
`;