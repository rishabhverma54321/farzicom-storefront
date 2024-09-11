import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const CardBody = styled.div<{
  hoverBg: boolean | undefined;
  loading: boolean;
}>`
  // margin: 1rem;
  width: 100%;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  /* margin-bottom: 50px; */
  height: 100%;

  opacity: ${props => (props.loading ? 0.5 : 1)};
  pointer-events: ${props => (props.loading ? "none" : "auto")};

  ${media.mediumScreen`
    padding: 5px 0;
  `}

  /* &:hover {
    background-color: ${props =>
      props.hoverBg && `&:hover { background-color: #f5f5f5 }`};
  } */

  &:hover{
  
    ${props => props.hoverBg && `background-color: #f5f5f5`}
  }
`;

export const CardImage = styled.div<{}>`
  // height: "28rem";
  // object-fit: "cover";
  // padding: "2px";
  // width: "auto";
  img {
    width: 90%;
  }
`;

export const CardInfo = styled.div<{}>`
  text-align: center;
  margin-bottom: 20px;
  text-transform: capitalize;
  font-family: "Barkentina", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-bottom: 10px;
`;

export const CardName = styled.p<{}>`
  text-align: center;
  text-transform: capitalize;

  width: 100%;
  margin: auto;
  font-family: "Barkentina", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-bottom: 10px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  font-size: 15px;

  ${media.largeScreen`
    width: 100%;
  `}
`;

export const CardWishlist = styled.div<{}>`
  border-radius: 50%;
  box-shadow: 0 0 15px #d1d0d0;
  background-color: #ffffff;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 15px;
  right: 35px;
  display: flex;
  justify-content: center;
  ${media.smallScreen`
  top: 10px;
  right: 16px;
  `}
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

export const CardPrice = styled.div<{}>`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: baseline;
  -ms-flex-align: baseline;
  align-items: baseline;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  font-family: humanist521bt-roman, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  width: 100%;
  margin: auto;
  margin-bottom: 10px;
`;

export const CardRupee = styled.h4<{}>`
  color: #c87a70;
  font-size: 15px;
  font-family: humanist521bt-roman, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
`;

export const OldPrice = styled.h4<{}>`
  text-decoration: line-through;
  margin-right: 15px;
  color: #c87a70;
  font-size: 15px;
  font-family: humanist521bt, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export const NewPrice = styled.h4<{}>`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  font-family: humanist521bt, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export const CardButton = styled.div<{}>`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  bottom: 0px;
  width: 130px;
  align-self: center;
`;

export const Button = styled.button<{}>`
  background-color: #345e2e;
  font-size: 0.8rem;
  font-weight: 100;
  font-family: myriad pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-transform: uppercase;
  color: #fff;
  display: block;
  padding: 11px 20px 8px;
  text-align: center;
  letter-spacing: 0.5px;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  margin-top: 20px;

  :hover {
    background-color: #78a442;
  }
`;

export const ProductPricing = styled.h4`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const UndiscountedPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
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

export const Rating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
