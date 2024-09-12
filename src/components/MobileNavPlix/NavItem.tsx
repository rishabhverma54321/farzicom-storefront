import * as React from "react";
import { useState } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
// import { AddOutlined } from "@material-ui/icons";
import { withStyles } from '@mui/styles';;
import RightChevron from "@components/atoms/SvgIcons/RightChevron";
import MemoArrowRightPlix from "@components/atoms/SvgIcons/ArrowRightPlix";
import SubNavItems from "./SubNavItems";
import { NavLink } from "..";
import { MainMenuSubItem } from "../MainMenuIkkai/gqlTypes/MainMenuSubItem";
import * as S from "./NavItem.styled";
import * as Header from "./NavList.Header.styled";
import NavItemIcon from "./NavItemIcon";
import Link from "next/link";
import { customEventTrigger, getTextWithoutEmoji } from "@utils/misc";
import { UserFragment } from "@saleor/sdk";

export const StyledAccordion = withStyles({
  root: {
    boxShadow: "none",
    backgroundColor: "transparent",
    width: "100%",
    position: "unset",
  },
})(Accordion);

export const StyledAccordionSummary = withStyles({
  root: {
    minHeight: 0,
    padding: "0.7rem 1rem",
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
    transform: "rotate(90deg) ",
    "&$expanded": {
      transform: "rotate(-90deg)",
    },
  },
})(AccordionSummary);

export const StyledAccordionDetails = withStyles({
  root: {
    margin: "0",
    padding: "0 16px !important",
    display: "block !important",
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
  icon?: any;
}

interface NavItemProps extends INavItem {
  type: string;
  hideOverlay(): void;
  showSubItems(item: INavItem): void;
  displayNavItems(id: any, type: string): void;
  navItemsId: {
    parent: string;
    child_1: string;
    child_2: string;
  };
  user?: UserFragment;
  customStyle?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  type,
  hideOverlay,
  showSubItems,
  displayNavItems,
  navItemsId,
  user, 
  customStyle = false,
  ...item
}) => {
  // console.log("itemss", item)
  const [expanded, setexpanded] = useState(false);
  const isLoggedIn = user?.id && user?.phone;
  const hasSubNavigation = item.children && !!item.children.length;
  // const shopNav = item.name === "Shop+";
  // const collectionWithImages = item.children.find(
  //   child => child.name === "Collection With Images"
  // );
  // if (shopNav) {
  //   if (collectionWithImages.children.length) {
  //     return (
  //       <>
  //         {collectionWithImages.children.map(child => (
  //           <>
  //             <S.Wrapper className="side-nav-plix__menu-item side-nav-plix__shop-list base-nav-item">
  //               <S.SuperMenuItemWrapper onClick={hideOverlay}>
  //                 <S.SuperMenuText
  //                   as={NavLink}
  //                   item={child}
  //                   onClick={hideOverlay}
  //                 />
  //                 {/* <MemoArrowRightPlix /> */}
  //               </S.SuperMenuItemWrapper>
  //             </S.Wrapper>
  //           </>
  //         ))}
  //       </>
  //     );
  //   }
  // }
  // if (collectionWithImages) {
  //   return <></>;
  // }
  const isConsultation = item?.name?.includes("Consultation");

  return (
    <S.WrapperNew
      className={`side-nav-plix__menu-item base-nav-item ${
        hasSubNavigation
          ? customStyle
            ? "side-nav-plix__custom"
            : "side-nav-plix__children"
          : "side-nav-plix__static"
      }`}
    >
      {hasSubNavigation ? (
        <>
          <StyledAccordion
            expanded={item?.id === navItemsId[type]}
            onChange={() => displayNavItems(item?.id, type)}
          >
            <StyledAccordionSummary
              expandIcon={
                <S.ExpandIcon>
                  <RightChevron />
                </S.ExpandIcon>
              }
            >
              <NavItemIcon name={item.name} />
              <S.MenuText customStyle={customStyle}>{item.name}</S.MenuText>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              <S.SubMenu>
                {item.children.map((child, index) => (
                  <React.Fragment key={'child_1' + index}>
                    <SubNavItems
                      type="child_1"
                      items={child}
                      displayNavItems={displayNavItems}
                      navItemsId={navItemsId}
                      hideOverlay={hideOverlay}
                    />
                  </React.Fragment>
                ))}
              </S.SubMenu>
            </StyledAccordionDetails>
          </StyledAccordion>
        </>
      ) : (
        <>
          <S.SuperMenuItemWrapperNew onClick={hideOverlay}>
            <NavItemIcon name={item.name} />
            <S.SuperMenuText
              as={NavLink}
              item={
                isConsultation
                  ? {
                      ...item,
                      page: {
                        ...item?.page,
                        slug: !isLoggedIn ? "login" : item?.page?.slug,
                      },
                    }
                  : item
              }
              onClick={() => {
                hideOverlay();
                customEventTrigger("hamburger_category_click", user, {
                  cta_name: getTextWithoutEmoji(item?.name),
                });
              }}
            />
            {item?.icon || <></>}
          </S.SuperMenuItemWrapperNew>
        </>
      )}
    </S.WrapperNew>
  );
};

export default NavItem;
