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
  font-size: 0.75rem;

  ${props =>
    props.isSecondary &&
    css`
      path: #969696;
    `}
`;

const menuFontStyles = css`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 500;
  font-size: 0.85rem;
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
`;

const SubMenuText = styled.div<NavLinkProps>`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 0.775rem;
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
  font-size: 0.85rem;
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
    margin-top: 1rem;
  }
  &.secondary {
    padding-top: 0.5rem;
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
