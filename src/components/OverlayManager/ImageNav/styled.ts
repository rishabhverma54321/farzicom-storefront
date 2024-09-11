import { css } from "styled-components";
import { styled } from "@styles/themes";
import { NavLinkProps } from "@temp/components/NavLink";

const activeLinkStyles = css`
  :active {
    color: #dd5c95;
  }
`;

const ExpandIcon = styled.div<{ isSecondary?: boolean }>`
  display: flex;
  font-size: 18px;

  ${props =>
    props.isSecondary &&
    css`
      path: #969696;
    `}
`;

const menuFontStyles = css`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 500;
  font-size: 18px;
  line-height: 1em;
  color: #2e3642;
`;

const MenuText = styled.div`
  ${menuFontStyles}
`;

const SuperMenuText = styled.div<NavLinkProps>`
  ${menuFontStyles}
  ${activeLinkStyles}
`;

const SuperMenuItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubMenuText = styled.div<NavLinkProps>`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 18px;
  line-height: 1em;
  color: #71767a;

  ${activeLinkStyles}
`;

const SubMenuItem = styled.li``;

const SubMenu = styled.ul`
  margin-left: 0.75rem;
  display: flex;
  flex-direction: column;
`;

export const secondaryMenuStyles = css`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 18px;
  line-height: 1em;

  color: #575757;
`;

const SecondaryMenuText = styled.div`
  ${secondaryMenuStyles}
`;

const SuperSecondaryMenuText = styled.a`
  display: flex;
  align-items: center;
  ${secondaryMenuStyles}
  ${activeLinkStyles}
`;

const Wrapper = styled.li`
  padding: 1rem;

  :nth-child(2) {
    margin-top: 1rem;
  }

  hr + &.secondary {
    margin-top: 3rem !important;
    width: 100%;
  }
  &.secondary {
    padding-top: 0.5rem;
    width: 100%;
    align-items: center;
    background-color: #b32322;
    height: 100px;
  }
`;

export {
  ExpandIcon,
  MenuText,
  SuperMenuText,
  SubMenuText,
  SubMenuItem,
  SuperMenuItemWrapper,
  SubMenu,
  SecondaryMenuText,
  SuperSecondaryMenuText,
  Wrapper,
};
