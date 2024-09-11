import { media, minMedia } from "@styles/media";
import { styled } from "@styles/themes";

export const PopupImageHeader = styled.div`
 display:flex;
 width:100%;
 padding: 28px 42px 10px 30px;
 align-items:center;
 justify-content:center;
 gap:1rem;
 background: #fffcc7;
`;
export const ProductName = styled.h3`
  font-family: "cocosharp_xlextrabold";
  font-weight: 800;
  font-size: 20px;
  font-style: italic;
  color: #095933;
  padding-right: 20px;
  line-height: 140%;
  @media (max-width: 1600px) and (min-width: 720px) {
    font-size: 18px;
  }
`;

export const ProductInfoModal = styled.div`
  position: absolute !important;
  width: 150%;
  min-height: 300px;
  background: white;
  z-index: 1;
  box-shadow: 8.01134px 8.01134px 24.034px rgba(0, 0, 0, 0.25);
  top: 90%;
`;

export const ProductInfoPopUpWrapper = styled.div<{
  side?: "right" | "left";
  popupFor?: "upsell" | "build-your-box";
}>`
  display: flex;
  flex-direction: column;
  // height: 200px;
  position: absolute;
  background: white;
  max-width:420px;
  box-shadow: 8.01134px 8.01134px 24.034px rgba(0, 0, 0, 0.25);
  top: ${props => (props.popupFor === "upsell" ? "80%" : "55%")};
  z-index: 1;
  left: ${({ side, popupFor }) =>
    popupFor === "upsell" ? "0%" : side === "right" ? "5%" : "none"};
  right: ${({ side }) => (side === "left" ? "5%" : "none")};
  width: ${props => (props.popupFor === "upsell" ? "100%" : "275%")};
  ${media.largeScreen`
  width: ${props => (props.popupFor === "upsell" ? "100%" : "185%")};
  `}
  ${media.largeScreen`
   right: ${({ side }) => (side === "left" ? "12%" : "none")};
  `}
  @media(max-width:375px) {
    width: ${props => (props.popupFor === "upsell" ? "100%" : "194%")};
    right: ${({ side }) => (side === "left" ? "10%" : "unset")};
  }
  padding-bottom: ${props => (props.popupFor === "upsell" ? " 1rem" : "none")};
`;

export const ProductPopupRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  ${media.largeScreen`
  flex-direction: column;
  `}
  align-items:center;
`;

export const ProductInfoRow = styled.div`
  display: flex;
  padding:1rem 0;
  // justify-content: space-between;
  gap:20px;
  width:100%;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-width:calc((100% - 20px)/2);
    gap:10px;
    align-items: center;
    flex: 1;
  }
  flex-wrap: wrap;
  width: 100%;
`;

export const ProductUsesRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    padding: 0.25rem;
    > div {
      h4 {
        text-align: left;
      }
    }
    ${media.smallScreen`
  padding: 0.25rem;
  `}
  }
  flex-wrap: wrap;
  width: 100%;
`;
export const ProductImageWrapper = styled.div`
  span {
    position: unset !important;
    width: 120px !important;
    height: 120px !important;
    img {
      position: unset !important;
    }
  }
`;
export const ProductInfoWrapper = styled.div<{
  maxWidth?: string;
  background?: string;
  mobileBackground?: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0.75rem;
  padding-top: 1.5rem;
  h3 {
    text-align: left;
    // margin-bottom: 1rem;
    font-weight: 600;
    font-size: 24px;
    // margin-left: 1.5rem;
    margin: 1rem 0rem 1.25rem 1rem;
  }
  max-width: ${props => props.maxWidth || "100%"};
  background: ${props => props.background || "white"};
  ${media.largeScreen`
  max-width: 100%;
  background: ${props => props.mobileBackground || props.background || "white"};
  `}
`;
export const PopupImageWrapper = styled.div`
  position: relative;
  min-height: 80px;
  min-width: 80px;
  border-radius: 50%;
`;

export const InfoTitle = styled.h4`
  font-size: 14px;
  max-width: 100%;
  color: black;
  font-weight: 500;
  text-align: center;
  ${media.mediumScreen`
  max-width: 65%;
  font-size: 13px;
  `}
  margin-bottom:0.5rem;
`;

export const PopUpSectionHeader = styled.h4`
  text-align:center;
  color: #014221;
  font-weight: 700;
  text-transform: capitalize;
  width:100%;
  font-size: 20px;
`;
export const PopupDescription = styled.div`
  font-size: 10px;
  text-align: left;
`;
export const PopupPriceContainer = styled.div<{ popupFor?: string, disabled?:any }>`
  display: flex;
  flex-direction: row;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  margin: 10px;
  border-radius: 8px;
  background: #5dd37c;
  cursor:pointer;
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
export const PopupCloseIcon = styled.span`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
`;
