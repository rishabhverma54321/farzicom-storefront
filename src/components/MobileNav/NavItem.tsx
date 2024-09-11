import * as React from "react";
import { useState } from "react";
import classNames from "classnames";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
// import { AddOutlined } from "@material-ui/icons";
import { withStyles } from '@mui/styles';
// import RemoveIcon from "@material-ui/icons/Remove";
import Plus from "images/plus.svg";
import Minus from "images/minus.svg";
import ReactSVG from "react-svg";
import { MainMenuSubItem } from "../MainMenu/gqlTypes/MainMenuSubItem";
import { NavLink } from "..";

export const StyledAccordion = withStyles({
  root: {
    boxShadow: "none",
  },
})(Accordion);

export const StyledAccordionSummary = withStyles({
  root: {
    minHeight: 0,
    padding: "8px 0 0 16px",
    "&$expanded": {
      minHeight: 0,
    },
  },
  content: {
    margin: 0,
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
    padding: "0 12px",
    marginRight: 0,
  },
})(AccordionSummary);

export const StyledAccordionDetails = withStyles({
  root: {
    padding: "8px 16px 0 16px",
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
  const [expanded, setexpanded] = useState(true);
  const hasSubNavigation = item.children && !!item.children.length;
  //
  return (
    <li
      className={classNames({
        "side-nav-lotus-new__menu-item": true,
      })}
    >
      {hasSubNavigation ? (
        <>
          <StyledAccordion onChange={() => setexpanded(prev => !prev)}>
            <StyledAccordionSummary
              expandIcon={
                expanded ? <ReactSVG path={Plus} /> : <ReactSVG path={Minus} />
              }
            >
              <div>{item.name}</div>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              <div className="subMenu">
                {item.children.map(child => (
                  <NavLink
                    item={child}
                    className="side-nav-lotus-new__menu-item-link"
                    onClick={hideOverlay}
                    key={child.id}
                  />
                ))}
              </div>
            </StyledAccordionDetails>
          </StyledAccordion>
        </>
      ) : (
        <NavLink
          item={item}
          className="side-nav-lotus-new__menu-item-link"
          onClick={hideOverlay}
        />
      )}
    </li>
  );
};

export default NavItem;
