import { css } from "styled-components";
import { minMedia } from "@styles/media";
import { styled } from "@styles/themes";

export const collectionDesktopSideSize = "10vw";

export const fontCSS = css`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1em;

  color: #2e3642;
`;

export const Description = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 100%;
  ${fontCSS}
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 1.25em;
  text-align: center;

  color: #474747;

  ${minMedia.largeScreen`
    font-size: 0.775rem;
  `}

  ${minMedia.xLargeScreen`
    font-size: 0.9rem;
    line-height: 1.5em;
  `}
`;

export const Name = styled.div`
  pointer-events: none;
  padding: 0.75rem 0.25rem;
  width: 75%;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);

  ${fontCSS}
  font-size: 0.975rem;
  font-weight: 500;
  color: #1d2136;
  text-align: center;

  background: rgba(255, 255, 255, 0.9);
  border-radius: 2px;

  ${minMedia.largeScreen`
    font-size: 0.775rem;
  `}

  ${minMedia.xLargeScreen`
    font-size: 0.95rem;
  `}
`;

export const Image = styled.div`
  position: relative;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: translate(0px);
    transition: 0.3s transform ease-in-out;
  }
`;

export const CategoryCard = styled.div`
  min-width: 200px;
  max-width: 325px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: filter 0.3s, background 0.3s;

  :active {
    filter: brightness(0.9);
    background-color: rgba(0, 0, 0, 0.1);
  }

  :hover ${Image} img {
    transform: translate(0px) scale(1.1);
  }

  ${minMedia.xLargeScreen`
    padding: 0;
  `}
`;

export const CategoriesWrapper = styled.div`
  margin: 0 1rem;
  overflow: hidden;

  ${minMedia.xLargeScreen`
    margin: 0;
    overflow: visible;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start
    flex-wrap: nowrap;
    gap: 1rem;
  `}

  @media (min-width: 1400px) {
    gap: 4vw;
    gap: clamp(20px, 4vw, 60px);
  }
`;

export const SectionHeading = styled.h2`
  ${fontCSS}
  font-size: 1.5rem;
  text-align: center;

  ${minMedia.largeScreen`
    font-size: 1.25rem;
  `}

  ${minMedia.xLargeScreen`
    text-align: start;
  `}
`;

export const Wrapper = styled.div`
  ${minMedia.xLargeScreen`
    padding: 0 calc(${collectionDesktopSideSize});
  `}
`;
