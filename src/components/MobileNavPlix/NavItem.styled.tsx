import { css } from "styled-components";
// import { styled } from "@styles/themes";
import styled from "styled-components";
import { NavLinkProps } from "@temp/components/NavLink";
import MyCustomLink, {
  IMyCustomLinkProps,
} from "@components/next-react/MyCustomLink";
import { LinkProps } from "react-router-dom";
// import { IMyLocalCustomLink, MyLocalCustomLink } from "./NavList";

interface ISuperSecondaryMenuText extends IMyCustomLinkProps {
  textDecoration?: string;
  textDecorationColor?: string;
}
const activeLinkStyles = css`
  :active {
    color: #dd5c95;
  }
`;

const activeLinkboxStyles = css`
  :active {
    background: #accef7;
  }
`;

const ExpandIcon = styled.div<{ isSecondary?: boolean }>`
  display: flex;
  font-size: 0.75rem;

  ${props =>
    props.isSecondary &&
    css`
      path: #969696;
    `}
`;

const menuFontStyles = css`
  font-family:'CocoSharp XL';
  font-weight: 400;
  font-size: 15px;
  line-height: 1em;
  letter-spacing: 0.05em;
  text-transform: capitalize;
  line-height: 155%;
  color: #000000;
  width: 100%;
`;

const MenuText = styled.div<{customStyle?:boolean}>`
  ${menuFontStyles}
  white-space: nowrap;
  width: 85%;
  font-weight:700 !important;
  ${props => props.customStyle ? `
  font-family: "cocosharp_xlextrabold";
  font-style: italic;
  font-weight: 800;
  font-size: 20px;
  line-height: 140%;
  color: #095933;
  `:``}

`;

const MenuTextNew = styled.div`
  ${menuFontStyles}
`

const MenuTitle = styled.div`
  display: flex;
  justify-content: space-between;

  .MuiAccordion-root.Mui-expanded {
    margin: 0 !important;
  }

  > div {
    width: 100%;
  }
`;
const MenuSubItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const SuperMenuText = styled.div<NavLinkProps>`
  ${menuFontStyles}

`;

const SuperMenuItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SuperMenuItemWrapperNew = styled.div`
  position:relative;
  padding: 0.7rem 1rem;
  display: flex;
  align-items:center;
  justify-content: space-between;

  >svg{
    position:absolute;
    right:1rem
    pointer-events:none;
  }
`;

const SubMenuText = styled.div<NavLinkProps>`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 0.85rem;
  line-height: 1em;
  color: #2e3642;

  ${activeLinkStyles}
`;

const SubMenuTextNew = styled.div<NavLinkProps>`
  display:block;
  width:100%;
  font-family: "CocoSharp XL";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 155%;
  letter-spacing: 0.05em;
  text-transform: capitalize;
  color: #000000;
`;

const SubMenuItem = styled.li`
  padding 0 0 0.8rem 0 !important;
`;

const SubMenu = styled.ul`
  margin-left: 0.75rem;
  display: flex;
  flex-direction: column;
`;

export const secondaryMenuStyles = css`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 0.85rem;
  line-height: 1em;

  color: #575757;
`;

const SecondaryMenuText = styled.div`
  ${secondaryMenuStyles}
`;

const SuperSecondaryMenuText = styled(MyCustomLink)<ISuperSecondaryMenuText>`
  display: flex;
  align-items: center;
  ${secondaryMenuStyles}
  ${activeLinkStyles}
  font-weight: 700;
  // padding-bottom: 20px;
  text-decoration: ${props => props.textDecoration || "none"};
  text-decoration-color: ${props => props.textDecorationColor || "#000000"};
`;

const WrapperNew = styled.li`
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -moz-tap-highlight-color: rgba(0, 0, 0, 0);
  :nth-child(2) {
    margin-top: 1rem;
  }

  hr + &.secondary {
    margin-top: 1rem;
  }
  &.secondary {
    padding-top: 0.5rem;
  }
`;
const Wrapper = styled.li`
  padding: 0.7rem 1rem;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -moz-tap-highlight-color: rgba(0, 0, 0, 0);
  :nth-child(2) {
    margin-top: 1rem;
  }

  hr + &.secondary {
    margin-top: 1rem;
  }
  &.secondary {
    // padding-top: 0.5rem;
  }
`;

const MainWrapper = styled.div`
  a {
    font-family: "cocosharp_xlextrabold";
    font-style: italic;
    font-weight: 800;
    font-size: 20px;
    line-height: 140%;
    color: #095933;
  }

  svg{
    width:28px !important;
    height:28px !important;
    path{
      fill:#FFF;
      stroke:none !important;
      opacity:1;
    }
  }
`;

export {
  ExpandIcon,
  MenuText,
  MenuTitle,
  MenuSubItem,
  SuperMenuText,
  SubMenuText,
  SubMenuItem,
  SuperMenuItemWrapper,
  SubMenu,
  SecondaryMenuText,
  SuperSecondaryMenuText,
  Wrapper,
  WrapperNew,
  SuperMenuItemWrapperNew,
  SubMenuTextNew,
  MainWrapper,
  MenuTextNew,
};
