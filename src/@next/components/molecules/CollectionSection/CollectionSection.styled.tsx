import { css } from "styled-components";
import { minMedia, media } from "@styles/media";
import { styled } from "@styles/themes";
export const fontCSS = css`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1em;

  color: #2e3642;
`;

export const Button = styled.button`
  ${fontCSS}
  font-weight: 600;
  font-size: 0.975rem;
  text-transform: uppercase;

  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;

  :active {
    color: #dd5c95;
  }

  :active svg path {
    stroke: #dd5c95;
  }
`;

export const ViewAllWrapper = styled.div``;

export const CollectionTitle = styled.div`
  ${fontCSS}
  font-size: 1.5rem;

  ${minMedia.largeScreen`
    font-size: 1.25rem;
  `}
`;

export const HeaderWrapper = styled.div`
  ${minMedia.largeScreen`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* Product card's have border, need to add that for better UI */
    padding: 0 calc(var(--desktop-side-size) + 10px);
  `}
`;

export const Container = styled.section<{ bgColor?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgColor || "transparent"};

  ${minMedia.largeScreen`
    --desktop-side-size: 6vw;
  `}

  ${minMedia.xLargeScreen`
    --desktop-side-size: 10vw;
  `}
`;

export const SwipeNavigateBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .swiper-button-prev,
  .swiper-button-next {
    cursor: pointer;

    &.swiper-button-disabled {
      display: none;
    }

    :active svg path {
      stroke: #dd5c95;
    }
  }

  .swiper-button-prev {
  }
  .swiper-button-next {
  }
`;

export const MSlidesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1vw;
`;

export const SwiperContainer = styled.div<{}>`
  display: none;

  @media (min-width: ${props => props.theme.breakpoints.largeScreen}) {
    width: 100%;
    display: grid;
    grid-template-columns: var(--desktop-side-size) 80vw var(
        --desktop-side-size
      );
    grid-auto-flow: column;
  }
`;

export const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    padding: 0;
    border: 0;
    background-color: transparent;

    :hover {
      background-color: initial;
      color: initial;
      border: initial;
    }

    span {
      font-family: ${props => props.theme.typography.titleFontFamily};
      font-weight: 500;
      font-size: 1.1rem;
      line-height: 1em;
      letter-spacing: 0.2px;
      text-transform: uppercase;

      color: #011e42;
    }
  }

  ${minMedia.largeScreen`
    display: none;
  `}
`;

export const ProductCard = styled.div`
  width: 48%;
  max-width: 20ch;

  @media (min-width: ${props => props.theme.breakpoints.largeScreen}) {
    width: auto;
    max-width: none;
  }
`;

export const ProductCardWrapper = styled.div`
  @media (min-width: ${props => props.theme.breakpoints.largeScreen}) {
    .swiper-container {
      width: 80vw;
    }
  }
`;

export const FlowerImageRight = styled.img`
  position: absolute;
  right: 16px;
  top: 0;
  width: 60px;

  ${media.mediumScreen`
    right: 0;
    top: -40px;
  `}
`;
