import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Divider = styled.div`
  height: 100%;
  width: 2px;
  background: white;
  ${media.smallScreen`
    width: 100%;
    height: 2px;
  `}
`;
export const Wrapper = styled.div`
  width: 40%;
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-self: normal;
  border-radius: 0 5px 5px 0;

  ${media.smallScreen`
    width: 100%;
  `}
`;

export const Bar = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;

  ${media.smallScreen`
    justify-content: center;
  `}
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const RightSide = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 40px;

  ${media.largeScreen`
    flex-direction: column;
    gap: 20px;
  `}
  ${media.smallScreen`
    gap: 10px;
    height: 5rem;
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
`;

export const Sort = styled.div`
  width: 12rem;
  display: inline-block;
`;

export const FiltersChipsWrapper = styled.div`
  > div {
    margin: 0.4rem;
  }
`;
