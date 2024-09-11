import { minMedia } from "@styles/media";
import { styled } from "@styles/themes";

export const UndiscountedPrice = styled.div.attrs(props => ({
  className: `undiscounted-price ${props.className || ""}`,
}))`
  margin-right: 0.4rem;
  position: relative;
  display: inline-flex;
  align-items: baseline;
  justify-content: flex-start;
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 0.775rem;
  line-height: 1em;
  text-transform: uppercase;
  color: #838383;

  ::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 100%;
    border-bottom: 1px solid currentColor;
  }

  .rupees-undiscounted {
    font-size: 0.8em;
  }

  ${minMedia.largeScreen`
    margin-right: 0.5rem;
    font-size: 0.775rem;

    /* ::after {
      border-color: #ee2b50;
    } */
  `}
`;

export const DiscountedSection = styled.div.attrs(props => ({
  className: `discounted-section ${props.className || ""}`,
}))`
  display: inline-flex;
  align-items: center;
`;

export const DiscountedPrice = styled.div.attrs(props => ({
  className: `discounted-price ${props.className || ""}`,
}))`
  margin-right: 0.4rem;
  display: inline-flex;
  align-items: baseline;
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 1em;
  text-transform: uppercase;
  color: #1d2136;

  .rupees-discounted {
    font-size: 0.775em;
  }

  ${minMedia.largeScreen`
    margin-right: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
  `}
`;

export const Discount = styled.div.attrs(props => ({
  className: `discount ${props.className || ""}`,
}))`
  padding: 0.25em;
  display: inline-flex;
  align-items: center;
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 0.775rem;
  line-height: 1em;
  text-transform: uppercase;
  white-space: nowrap;
  color: #ffffff;
  background: ${props => props.theme.loader.color};
`;
