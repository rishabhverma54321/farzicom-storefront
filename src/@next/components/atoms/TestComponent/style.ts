import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div<{ bgColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.bgColor};
  height: 100%;
  width: 100%;
  padding: 1em;
  min-height: 4rem;

  ${media.smallScreen`
    min-height: 3rem;
    padding: 0rem;
  `};
  &.mob-nav {
    padding: 0.2rem 0rem 0.2rem 1rem;
    min-height: 2.938rem;
  }
  &.billing-address {
    height: auto;
  }
`;

export const LeftContainerTest = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  & #supplier {
    & svg {
      & path {
        fill: #a33a34;
      }
    }
  }
  & #buyer {
    & svg {
      & path {
        fill: #f99f23;
      }
    }
  }
  ${media.smallScreen`
      
  `};
  &.mob-nav__left-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &.profile-status-info__left-container {
  }
`;

export const SvgContainer = styled.div<{ fontSizeSvg: number }>`
  font-size: ${props => props.fontSizeSvg}em;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.smallScreen`
   font-size: 1rem;
  `};
`;

export const RightContainerTest = styled.div<{ title?: any }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: ${props =>
    props.title === "Email" ? "lowercase" : "capitalize"};
  span:nth-child(1),
  span:nth-child(2),
  span:nth-child(3) {
    margin-right: 1.5em;
  }
  ${media.smallScreen`
      
  
    font-size: 1rem;
    span:nth-child(1),
  span:nth-child(2),
  span:nth-child(3) {
    margin-right: 0.5rem;
  }

  `};
  &.mob-nav__right-container {
  }
`;

export const InfoSpan = styled.span``;

export const ProfileImg = styled.img`
  height: 1em;
  width: 1em;
`;

export const ContentInfo = styled.div<{
  fontSizeTitle: number;
  titleColor: string;
}>`
  margin-left: 1em;
  color: ${props => props.titleColor};
  font-size: ${props => props.fontSizeTitle}em;
  ${media.smallScreen`
   
  margin-left: 0.7em;
  font-size: 1rem;

  `};

  &.profile-status-info__left-container-content {
    font-size: 0.625rem;
  }
  &.categories-content__left-container-content {
    margin-left: 1rem;
    padding: 0.5rem 0;
  }
  ${media.smallScreen`
  &.categories-content__left-container-content {
    margin-left: 0.7rem;
    padding: 0.5rem 0;
  }
 `};
`;

export const RightContentImg = styled.img`
  height: 0.9em;
  :nth-child(2) {
    margin-left: 1em;
  }
  ${media.smallScreen`
 
  `};
`;
