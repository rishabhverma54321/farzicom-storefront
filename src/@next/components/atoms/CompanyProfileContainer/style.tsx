import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  width: 100%;
  min-height: 85vh;
  display: inline-block;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  vertical-align: top;
  background-color: #ffffff;
  overflow: auto;
  ${media.largeScreen`
  padding: 0 0.65rem;
  `};
  ${media.smallScreen`
  box-shadow:none;
  background-color: transparent;
  `};
`;

export const HeaderContainerProfile = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: #ffffff;
  ${media.smallScreen`
    display:none;
    
  `};
`;

export const HeaderLeftContainer = styled.div`
  color: #616161;
  /* font-size: 22px; */
  font-size: 1.3em;
`;

export const HeaderRightContainer = styled.div`
  display: flex;

  span {
    color: #005bc2;
    margin-left: 0.5em;
    font-size: 0.8em;
  }
`;

export const LowerInnerContainer = styled.div`
  width: 100%;
  height: auto;
`;

export const MiddleOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1em;
  background-color: #ffffff;
  ${media.smallScreen`
     background-color: transparent;
    
   `};
`;

export const Option = styled.div<{ active?: string }>`
  display: flex;
  align-items: center;
  padding: 0.625rem 0;
  cursor: pointer;
  transition: all 0.2s linear;
  & svg {
    margin-left: 0.5rem;
  }
  border-bottom: ${props =>
    props.active ? "2px solid #005BC2" : "2px solid transparent"};
  /* .border-select {
    border-bottom: 2px solid #005bc2;
  } */
`;

export const OptionHeader = styled.div`
  color: #616161;
  font-size: 1.2em;
  ${media.smallScreen`
    font-size:0.875rem;
    
  `};
`;

export const PaymentsOptionCompanyProfileContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 0.5rem;
  ${media.largeScreen`
  flex-wrap: wrap;
  `}
  /* ${media.smallScreen`
    flex-direction: column;
    
  `}; */
`;

export const MobileViewHandler = styled.div`
  ${media.smallScreen`
    display:none;
    
  `};
`;
