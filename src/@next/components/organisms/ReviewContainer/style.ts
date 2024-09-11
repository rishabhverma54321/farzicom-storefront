import { walPageUrl } from "./../../../../app/routes/paths";
import { wishlistAddProduct } from "./../../molecules/ProductCardPlixlife/gqlTypes/wishlistAddProduct";
import { discountExists } from "./../AddToCartSectionPlixlife/stockHelpers";
import { media, minMedia, styled } from "@styles";

export const ReviewButtonWrapper = styled.div`
  ${media.smallScreen`
    display:flex;
    flex-direction: row;
    width: 100%;
    min-width: 320px;
    max-width: 420px;
    padding-bottom: 20px;
    justify-content: space-between;
`}
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* padding: 15px 60px; */
  margin-bottom: 20px;

  ${media.mediumScreen`
    padding:0px;
    /* margin: auto; */
    margin-bottom: 20px;

  `}
  ${media.smallScreen`
  margin-bottom: 0px;
`}
`;
export const SortSelect = styled.select`
  background-color: transparent;
  border: 1px solid rgb(93, 211, 124);
  border-radius: 8px;
  font-family: "cocosharp_xlextrabold";
  font-weight: 800;
  font-size: 14px;
  line-height: 100%;
  text-align: left;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgb(93, 211, 124);
  padding: 14px 40px;
  margin-top: 15px;
  cursor: pointer;
  appearance: none;
  background-image: url("/plixlifefc/assets/dropdown_icon.svg");
  background-repeat: no-repeat;
  background-position: 177px 16px;
  outline: none;
  width: 100%;
  @media(min-width:720px){
    padding-left:1rem !important;
  }
  ${media.smallScreen`
    /* width: calc((100% - 40px)/2); */
    width:unset;
    padding: 14px 23px;
    font-size: 12px;
    background-position: 127px;
  `}
  ${minMedia.smallScreen`
    text-indent:none;
    text-align:center;
  `}
`;
export const SortOption = styled.option`
  padding: 4px;
  font-size: 17px;
  cursor:pointer;
  @media (max-width: 720px) {
    font-size: inherit;
  }
`;

export const HelpfulButton = styled.span`
  border: 1px solid lightgrey;
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 1rem;
  font-size: 12px;
  cursor: pointer;
  :hover {
    background: radial-gradient(
      44.03% 132.34% at 39.33% 26.22%,
      rgb(105, 234, 114) 0%,
      rgb(169, 239, 130) 100%
    );
  }
`;
export const ButtonWrapper = styled.div<{
  justifyContent:
    | "center"
    | "spaceAround"
    | "spaceEvenly"
    | "spaceBetween"
    | "normal";
}>`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: ${props =>
    props.theme.flex.justifyContent[props.justifyContent]};
  margin-top: 15px;
  ${media.smallScreen`
    width: 100%;
    gap: 10px;
  `}
`;

export const EmptyState = styled.div`
  text-align: center;
  margin-bottom: 30px;
  ${media.smallScreen`
  margin-bottom: 0px;
  `}
  font-size: ${props => props.theme.typography.baseFontSize};
`;

export const ReviewContainer = styled.div`
  margin-top: 15px;
  border-bottom: 1px solid #cfcfcf;
  width: 100%;
`;

export const WriteReviewBtn = styled.button`
  background: rgb(93, 211, 124);
  border-radius: 8px;
  font-weight: 800;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgb(254, 255, 237);
  padding: 14px 43px;
  transition: all 0.3s ease 0s;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  -webkit-box-align: center;
  align-items: center;
  ${media.smallScreen`
    padding: 15px 25px;
    white-space: nowrap;
    font-size: 12px;
  `}
`;
