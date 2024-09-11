import { media, minMedia } from "@styles/media";
import { styled } from "@styles/themes";
import { NewAddToCartButton } from "@components/molecules/NewAddToCartButton";
import { css } from "styled-components";

export const StyledAddToCartButton = styled(NewAddToCartButton)`
  margin-top: 5px;
  background: #02262a;
  border: 1px solid #02262a;
  border-radius: 2px;
  span {
    /* font-size: 0.8rem; */
    color: white;
    text-transform: capitalize !important;
  }

  ${media.xLargeScreen`
  /* width: 50%; */
`}
`;

const GallaryBannerStyle = css`
    ${media.mediumScreen`
      max-height:470px !important;
     .slider-wrapper::after {
      content: "";
      display: block;
      height:${props => (props?.backgroundImage ? "4rem" : "0")}
      width: 100%;
      background:${props =>
        props?.backgroundImage
          ? `center / contain no-repeat url(${props?.backgroundImage})`
          : ""} 
    }
    `}

    ${media.smallScreen`
     .slider-wrapper::after{
      position:absolute;
      bottom:1.6rem;
      left:0;
      background:${props =>
        props?.backgroundImage
          ? `center / cover no-repeat url(${props?.backgroundImage})`
          : ""} 
     }

     .control-dots{
      margin-top:4rem !important;
     }
    `}

    ${minMedia.mediumScreen`
      max-height:520px !important;
    .carousel-slider::after {
      content: "";
      display: block;
      height:${props => (props?.backgroundImage ? "6rem" : "0")}
      width: 100%;
      background:${props =>
        props?.backgroundImage
          ? `center / contain no-repeat url(${props?.backgroundImage})`
          : ""} 
    }
    `}
`;

const GallaryBannerDefaultStyle = css`
  `

export const GalleryCarousel = styled.div`
  .product-page__product__gallery {
    ${props => props?.backgroundImage ? GallaryBannerStyle: GallaryBannerDefaultStyle
  }
  }
`;

export const BottomStickButtons = styled.div`
  ${media.xLargeScreen`
    display: flex;
    width: 100vw;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1000;
    flex-direction: row-reverse;
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

export const ImageTextBox = styled.div`
  position: relative;
`;
export const ImageTextImage = styled.img`
  width: 100%;
  height: 450px;
`;
export const ImageTextContent = styled.div`
  background: white;
  padding: 10px;
  padding-left: 20px;
  position: absolute;
  bottom: 60px;
  right: 0;
  max-width: 485px;
  max-height: 163px;
  ${media.mediumScreen`
    max-width:341px;
  `}
`;
export const ImageTextTitle = styled.p`
  color: #282c3f;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 5px;
`;
export const ImageTextDescription = styled.p`
  color: #686b78;
`;

export const AskUsBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  ${media.mediumScreen`
  grid-template-columns: 1fr;`}
`;

export const AskUsContent = styled.div`
  ${media.mediumScreen`
    text-align: center; 
`}
`;
export const AskUsText = styled.p`
  margin-bottom: 15px;
`;
export const AskUSButton = styled.a`
  background: #56774d;
  color: white;
  padding: 10px 40px;
  border-radius: 4px;
`;

export const RelatedProducts = styled.div`
  // background-color: ${props => props.theme.colors.secondary};

  ${media.smallScreen`
    padding-bottom: 2rem !important;
  `}
`;

export const ImageBox = styled.img`
  width: 100%;
  object-fit: fill;
`;

export const ReviewUser = styled.h4`
  text-transform: capitalize;
  display: flex;
  align-item: center;
`;

export const Rating = styled.div`
  padding: 8px 0;
  ${media.smallScreen`
    padding:5px 0 0px 0px;
  `}
`;

export const Date = styled.div`
  font-size: 0.8rem;
  opacity: 0.6;
`;

export const AverageRatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TotalRatingWrapper = styled.div`
  display: flex;
  width: 100%;
  // border-bottom: 1px solid #dddddd;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  ${media.smallScreen`
  justify-content: center;
  `}
`;

export const TotalRatingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & >div{
    margin-right: 118px;
    ${media.smallScreen`
       margin-right: 0px;
       align-self: flex-start;
      align-items: flex-start;
      margin-bottom:34px;
    `}
  }
  ${media.smallScreen`
  flex-direction: column;
  `}
`;

export const AverageRating = styled.h4`
  letter-spacing: -0.02em;
  text-transform: capitalize;
  color: #000000;

  font-size: 2rem;
  line-height: 40px;
  ${media.smallScreen`
    font-size:66px;
    line-height:120%;
  `}
`;

export const ReviewCount = styled.p`
  color: #000000;
  opacity: 0.6;
  font-size: 0.8rem;
  font-size: 14px;
`;

export const ProgressBar = styled.div<{ isSelected?: boolean }>`
  background-color: ${props =>
    props.isSelected ? "rgb(105 234 114 / 23%)" : "#f6f6f6"};
  position: relative;
  width: 10em;
  height: 1em;
  margin: 0.5rem;
  ${media.smallScreen`
  width: 8em;
  `}
`;

export const ProgressBarFill = styled.div<{ percent: number }>`
  width: ${props => props.percent}%;
  position: absolute;
  background-color: #69ea72;
  height: 1em;
`;

export const RatingContainerWrapper = styled.div``;
export const RatingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 1em;
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  ${media.smallScreen`
    margin:0.5rem 0 11px 0px;
  `}
`;

export const Hr = styled.hr`
  margin: 0;
  border: 1px solid #e7e7e7;
`;

export const Divider = styled.div<{ width: string }>`
  width: ${props => props.width};
  height: 1px;
  background-color: #808080;
  opacity: 0.4;
  /* margin: 8px 0px; */
`;

export const RatingPercentage = styled.div`
  display: flex;
  width: 70px;
  justify-content: space-between;
  ${media.smallScreen`
  min-width: 20px;
  width: auto;
  `}
`;

export const Description = styled.div`
  width: 90%;
  margin-bottom: 8px;
  color: #444;
  opacity: 0.6;
  font: inherit;
  font-size: 16px !important;
  line-height: 160% !important;
  ${media.largeScreen`
  width:100%;
  `}
  ${media.smallScreen`
  margin-top: 18px;
  `}
`;
export const ReadMore = styled.span`
  font-weight: 600;
  font-size: 14px;
  height: 15px;
  color: rgb(0, 242, 12);
  cursor: pointer;
`;

export const ProductNameHeader = styled.h1`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  color: #282c3f;
  font-size: 25px;
  /* margin-bottom: 10px; */
  font-family: ${props => props.theme.typography.baseFontFamily}, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
`;

export const ProductTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin: 10px 0;
  justify-content: start;
`;

export const ProductBox = styled.div`
  display: flex;
  align-items:center;
  gap:0.4rem;
  color:#000000;
  background: ${props => props.color};
  font-size: 13px;
  border-radius: 30px;
  font-weight: 500;
  text-align: center;
  padding: 8px 12px;}
`; 

export const Emoji = styled.span`
  font-size: 19px;
  margin-left: 2px;
`;

export const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  // margin: 0.5rem 0rem;
  font-weight: 500;
  font-size: 12px;
`;

export const RatingMob = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 8px;
  margin-top: 0.8rem;

  font-size: 12px;
  line-height: 150%;

  color: #555555;

  font-style: normal;
  font-weight: normal;

  a:nth-child(1){
    display:flex;
    align-items:center;
  }
`;
