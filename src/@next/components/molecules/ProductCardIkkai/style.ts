import { media, minMedia } from "@styles/media";
import { styled } from "@styles/themes";
import { LeftSide, RightSide } from "../AddToCartButton/style";

export const OOSBackground = styled.div`
  z-index: -1;
  width: 60%;
  height: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: rgba(255, 255, 255, 0.5);
  filter: blur(40px) drop-shadow(0 1px 1px white) drop-shadow(0 2px 1px white)
    drop-shadow(0 3px 1px white) drop-shadow(0 4px 1px white);
  border-radius: 2px;

  border-top-left-radius: 20px;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
`;

export const OOSOverlay = styled.div`
  width: 80%;
  height: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: #1d2136;

  svg {
    font-size: 2.25rem;
  }

  @media (max-width: 991px) {
    text-align: center;
    font-size: 0.875rem;
    line-height: 1.25em;

    svg {
      margin-bottom: 0.3rem;
      font-size: 2rem;
    }
  }
`;

export const OOSText = styled.p`
  font-size: 1rem;
  padding: 1rem;

  ${media.mediumScreen`
    padding: 0;
  `}
`;

export const CardImage = styled.div<{}>`
  overflow: hidden;
  position: relative;

  img {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 53.1vw;
    /* For those not supporting clamp css property: */
    max-height: clamp(100px, 53.1vw, 286px);
    object-fit: contain;
    transform: translate(0px) scale(1);
    transition: 0.3s transform ease-in-out;
  }

  ${minMedia.largeScreen`
    img {
      max-height: 23vw;
    }
  `}
`;

export const CardBody = styled.div`
  width: 100%;
  max-width: 30ch;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  transition: 0.3s;

  &:hover {
    ${CardImage} img {
      transform: translate(0px) scale(1.1);
    }
  }
`;

export const CardInfo = styled.div<{}>`
  height: 4rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const CardName = styled.p<{}>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 500;
  font-size: 0.825rem;
  line-height: 1.3em;
  text-align: left;
  color: #1d2136;
  text-transform: capitalize;

  ${minMedia.xLargeScreen`
    font-size: 0.95rem;
  `}
`;

export const CardWishlist = styled.div<{ loading: boolean }>`
  border-radius: 50%;
  background-color: #ffffff;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 0;
  right: 16px;

  opacity: ${props => (props.loading ? 0.5 : 1)};
  pointer-events: ${props => (props.loading ? "none" : "auto")};

  ${media.smallScreen`
  right: 6px;
  `}

  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

export const CardWeight = styled.div`
  font-weight: 300;
  font-size: 0.8rem;
  line-height: 1em;
  color: #1d2136;

  ${minMedia.xLargeScreen`
    font-size: 0.857rem;
  `}
`;

export const CardPrice = styled.div<{}>``;

export const CardRupee = styled.h4<{}>`
  color: #c87a70;
  font-size: 15px;
  font-family: humanist521bt-roman;
`;

export const OldPrice = styled.h4<{}>`
  text-decoration: line-through;
  margin-right: 15px;
  color: #c87a70;
  font-size: 15px;
  font-family: humanist521bt;
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
  font-family: humanist521bt;
`;

export const CardButton = styled.div`
  display: flex;
  justify-content: center;
  bottom: 0px;
  width: 100%;
  align-self: center;

  button {
    padding: 0;
    margin: 0;
    font-family: ${props => props.theme.typography.titleFontFamily};
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 2.5rem;
    color: #ffffff;
    background-color: ${props => props.theme.colors.primary};
    border: none;

    :hover {
      background-color: ${props => props.theme.colors.primaryLight};
      color: #ffffff;
      border: none;
    }

    &.gtc {
      background-color: ${props => props.theme.colors.white};
      border: ${props => props.theme.colors.primary};
      ${LeftSide} {
        margin: 0 auto;
      }

      /* :hover {
        background-color: #378e1c;
      } */
    }

    span {
      padding: 0 1rem;
      width: 100%;
      display: inline-flex;
      justify-content: space-between;
      font-weight: inherit;
      font-size: inherit;

      ${LeftSide} {
        display: inline-flex;
        align-items: baseline;
        gap: 0.5rem;
      }

      ${RightSide} {
        display: none;
      }
    }

    svg {
      font-size: 1.25rem;
      vertical-align: sub;

      path {
        stroke: #ffffff;
      }
    }

    @media (max-width: 1179px) {
      span ${LeftSide} {
        &.disabled,
        &.loading {
          margin: 0 auto;
        }
      }
    }

    @media (min-width: 1180px) {
      line-height: 3rem;

      span {
        padding: 0 1.5rem;

        ${RightSide} {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }
      }
    }
  }
`;

export const Button = styled.button<{}>`
  background-color: #011e42;
  font-size: 0.8rem;
  font-weight: 100;
  font-family: myriad pro;
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
    background-color: #123258;
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

export const WishlistContainer = styled.div`
  position: absolute;
  right: 0px;
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

export const ReviewsCount = styled.div`
  display: none;

  @media (min-width: 1180px) {
    display: block;
    align-self: flex-end;
    padding-bottom: 0.1rem;
    font-family: ${props => props.theme.typography.titleFontFamily};
    font-weight: 300;
    font-size: 0.8rem;
    line-height: 1em;
    color: #575757;
  }
`;

export const Rating = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.85rem;

  @media (min-width: 1180px) {
    gap: 0.5rem;
  }
`;
