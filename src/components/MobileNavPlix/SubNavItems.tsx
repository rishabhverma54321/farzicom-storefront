import React, { useState } from "react";
import * as S from "./NavItem.styled";
import * as Header from "./NavList.Header.styled";
import { NavLink } from "..";
import { MainMenuSubItem } from "../MainMenuIkkai/gqlTypes/MainMenuSubItem";
import { StyledAccordion } from "./NavItem";
import { StyledAccordionSummary } from "./NavItem";
import MemoPlus from "@components/atoms/SvgIcons/MemoPlus";
import MemoMinus from "@components/atoms/SvgIcons/MemoMinus";
import { StyledAccordionDetails } from "./NavItem";
import RightChevron from "@components/atoms/SvgIcons/RightChevron";
import NavItemIcon from "./NavItemIcon";
import { customEventTrigger, getTextWithoutEmoji } from "@utils/misc";
import { useAuthState } from "@saleor/sdk";
export interface SubNavItemProps {
  hideOverlay(): void;
  items?: any;
  type?: string;
  displayNavItems(id: any, type: string): void;
  navItemsId: {
    parent: string;
    child_1: string;
    child_2: string;
  };
}
const SubNavItems: React.FC<SubNavItemProps> = ({
  items,
  hideOverlay,
  type,
  displayNavItems,
  navItemsId,
}) => {
  const [expanded, setexpanded] = useState(false);
  const { user } = useAuthState();
  const collectionWithImages = items?.name === "Collection With Images";
  const hasSubNavigation = items?.children && !!items.children.length;
  if (collectionWithImages) {
    return <></>;
  }
  if (hasSubNavigation) {
    return (
      <>
        <StyledAccordion
          className="side-nav-plix__menu-item__accordion side-nav-plix__children__list"
          expanded={items?.id === navItemsId[type]}
          onChange={() => displayNavItems(items?.id, type)}
        >
          <StyledAccordionSummary
            className="side-nav-plix__menu-item__accordionSummary"
            expandIcon={
              <S.ExpandIcon>
                {items?.id === navItemsId[type] ? (
                  <MemoMinus className="side-nav-plix__menu-item__minus" />
                ) : (
                  <MemoPlus className="side-nav-plix__menu-item__plus" />
                )}
              </S.ExpandIcon>
            }
          >
            <NavItemIcon name={items.name} />
            <S.MenuTextNew>{items.name}</S.MenuTextNew>
          </StyledAccordionSummary>
          <StyledAccordionDetails className="side-nav-plix__menu-item__accordionDetails">
            <S.SubMenu>
              {items.children.map((child, index) => (
                <React.Fragment key={'child_2' + index}>
                  <SubNavItems
                    type="child_2"
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
    );
  }
  return (
    <S.SubMenuItem key={items.id} onClick={hideOverlay}>
      <S.SubMenuTextNew
        as={NavLink}
        item={items}
        onClick={() => {
          hideOverlay();
          customEventTrigger("hamburger_category_click", user, {
            cta_name: getTextWithoutEmoji(items.name),
          });
        }}
      />
    </S.SubMenuItem>
  );
};

export default SubNavItems;
