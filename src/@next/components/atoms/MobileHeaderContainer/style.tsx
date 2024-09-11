import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  &.nav-bar {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1rem;
    height: 4rem;
    background-color: white;
    ${media.mediumScreen`
      height: 3.125rem;
    `}
  }
`;

export const LeftContainer = styled.div`
  &.nav-bar__left-container {
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

export const RightContainer = styled.div`
  &.nav-bar__right-container {
    font-size: 1.2rem;
    font-weight: 500;
    margin-left: 1rem;
    line-height: 1.5rem;
    text-transform: capitalize;
    color: #212223;
  }
`;
