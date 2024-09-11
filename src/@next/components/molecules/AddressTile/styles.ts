import { styled } from "@styles/themes";

export const Wrapper = styled.div`
  height: 100%;
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const HeaderContent = styled.div`
  color: ${props => props.theme.colors.lightFont};
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`;
export const FooterContent = styled.div`
  > div {
    display: inline-block;
    padding: 0;
    margin: 0;
    margin-right: 0.6rem;
    cursor: pointer;
  }
`;

export const MenuItem = styled.div`
  border-radius: 8px;
  padding: 0.25rem;
  :hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;

export const HeaderContentWrapper = styled.div`
 display: flex;
`;

export const DefaultAddress = styled.div`
  background: #D1FFD9;
  border-radius: 4px;
  padding: 8px 8px 4px 8px;
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  p{
    display: inline-block;
    font-family: "cocosharp_xlextrabold";
    font-style: normal;
    font-weight: 800;
    font-size: 12px;
    line-height: 120%;
    color: #1EAF6D;
    margin-left: 6px;
  }
`;

export const Addressnum = styled.div`
font-family: 'CocoSharp XL';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 160%;
/* identical to box height, or 29px */


color: #000000;
`;