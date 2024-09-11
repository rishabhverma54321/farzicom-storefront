import * as React from "react";
import { useState } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
// import { AddOutlined } from "@material-ui/icons";
import { withStyles } from '@mui/styles';;
import { RightChevron } from "@components/atoms/SvgIcons/RightChevron";
import { NavLink } from "..";
import { MainMenuSubItem } from "../MainMenuIkkai/gqlTypes/MainMenuSubItem";
import * as S from "./NavItem.styled";
import NavItemIcon from "./NavItemIcon";

export const StyledAccordion = withStyles({
  root: {
    boxShadow: "none",
    backgroundColor: "transparent",
  },
})(Accordion);

export const StyledAccordionSummary = withStyles({
  root: {
    minHeight: 0,
    padding: "0",
    backgroundColor: "transparent",
    "&$expanded": {
      minHeight: 0,
    },
  },
  content: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    "&$expanded": {
      margin: 0,
      minHeight: 0,
    },
  },
  expanded: {
    margin: 0,
    minHeight: 0,
  },
  expandIcon: {
    padding: "0",
    marginRight: 0,
    "&$expanded": {
      transform: "rotate(-90deg)",
    },
  },
})(AccordionSummary);

export const StyledAccordionDetails = withStyles({
  root: {
    margin: "0",
    padding: "0.5rem 1rem",
  },
})(AccordionDetails);

// export const StyledAddOutlined = withStyles({
//   root: {
//     padding: "0 12px",
//     display: "block",
//   },
// })(AddOutlined);

// export const StyledRemoveIcon = withStyles({
//   root: {
//     padding: "0 12px",
//   },
// })(RemoveIcon);

export interface INavItem extends MainMenuSubItem {
  children?: INavItem[];
}

interface NavItemProps extends INavItem {
  hideOverlay(): void;
  showSubItems(item: INavItem): void;
}

const NavItem: React.FC<NavItemProps> = ({
  hideOverlay,
  showSubItems,
  ...item
}) => {
  const [, setexpanded] = useState(true);
  const hasSubNavigation = item.children && !!item.children.length;
  //
  return (
    <S.Wrapper className="side-nav__menu-item base-nav-item">
      {hasSubNavigation ? (
        <>
          <StyledAccordion onChange={() => setexpanded(prev => !prev)}>
            <StyledAccordionSummary
              expandIcon={
                <S.ExpandIcon>
                  <RightChevron />
                </S.ExpandIcon>
              }
            >
              <NavItemIcon name={item.name} />
              <S.MenuText>{item.name}</S.MenuText>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              <S.SubMenu>
                {item.children.map(child => (
                  <S.SubMenuItem key={child.id}>
                    <S.SubMenuText
                      as={NavLink}
                      item={child}
                      onClick={hideOverlay}
                    />
                  </S.SubMenuItem>
                ))}
              </S.SubMenu>
            </StyledAccordionDetails>
          </StyledAccordion>
        </>
      ) : (
        <S.SuperMenuItemWrapper>
          <NavItemIcon name={item.name} />
          <S.SuperMenuText as={NavLink} item={item} onClick={hideOverlay} />
        </S.SuperMenuItemWrapper>
      )}
    </S.Wrapper>
  );
};

export default NavItem;
