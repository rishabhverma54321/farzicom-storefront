import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  width: 100%;
  /* min-width: 700px; */
  height: auto;
  display: inline-block;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  vertical-align: top;
  background-color: #ffffff;
  ${media.largeScreen`
  padding: 0 0.65rem;
  `};
  ${media.smallScreen`
  box-shadow:none;
  background-color: transparent;
  /* margin: 0 0.25rem; */
  `};
`;

export const HeaderContainerProfile = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  /* background-color: #f4f8f9; */
  &.mob-display {
    display: none;
  }
  ${media.smallScreen`
    display:none;
    &.mob-display {
    display:flex;
    background-color:transparent;
  }
  `};
`;

export const HeaderLeftContainer = styled.div`
  color: #616161;
  /* font-size: 22px; */
  font-size: 1.3em;
  ${media.smallScreen`
  font-size: 1em;
  
  `};
`;

export const HeaderRightContainer = styled.div`
  display: flex;

  span {
    color: #005bc2;
    margin-left: 0.5em;
    font-size: 1rem;
  }
  ${media.smallScreen`
  span{
    font-size: 0.7rem;

  }
  
  `};
`;

export const LowerInnerContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  height: auto;
  ${media.smallScreen`
  margin-top: 0.2rem;
  
  `};
`;

export const EditSupportContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  font-size: 1.5rem;
  box-shadow: 0px -2px 44px rgba(0, 0, 0, 0.07);
  background-color: #f4f8f9;
`;
