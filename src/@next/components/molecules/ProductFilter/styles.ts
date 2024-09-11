import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Wrapper = styled.div`
  width: 60%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-self: normal;
  border-radius: 0 5px 5px 0;
  ${media.smallScreen`
    width: 100%;
    position:fixed;
    left:0;
    bottom:0;
    z-index:2;
    background:white;
    box-shadow: 0px 1px 4px 0px #00000040;
  `}
`;

export const Bar = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  ${media.smallScreen`
    justify-content: center;
    width:
  `}
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const RightSide = styled.div`
  height: 1.2rem;
  display: flex;
  justify-content: center;
  gap: 40px;
  ${media.largeScreen`
    flex-direction: row;
    gap: 20px;
  `}
  ${media.smallScreen`
    gap: 10px;
    height: 2.5rem;
    width:100vw;
    justify-content:space-around;
    align-items:center;
  `}
`;

export const FiltersButton = styled.button`
  font-size: ${props => props.theme.typography.smallFontSize};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Clear = styled.button`
  padding-left: 2rem;
  cursor: pointer;
  font-size: ${props => props.theme.typography.smallFontSize};
  color: ${props => props.theme.colors.lightFont};
`;
export const Element = styled.span`
  /* padding-left: 2rem; */
`;

export const Filters = styled.span`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0.6rem;
`;

export const Label = styled.span`
  color: ${props => props.theme.colors.lightFont};
  ${media.smallScreen`
    display: none;
  `}
`;

export const Sort = styled.div`
  width: 12rem;
  display: inline-block;
  ${media.smallScreen`
  .select-undefined__menu {
    top: -269px;
  }
  
  `}
`;

export const FiltersChipsWrapper = styled.div`
  > div {
    margin: 0.4rem;
  }
`;
