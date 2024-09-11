import {
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
  // StyledAddOutlined,
  // StyledRemoveIcon,
} from "@temp/components/MobileNavIkkai/NavItem";
import React, { useState } from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import AccountIcon from "@components/atoms/SvgIcons/AccountIcon";
import RightChevron from "@components/atoms/SvgIcons/RightChevron";
import UserMenuList from "@components/atoms/UserMenuList";

import { User } from "@saleor/sdk/lib/fragments/gqlTypes/User";
import * as S from "@temp/components/MobileNavIkkai/NavItem.styled";

export interface IUserSectionMobileIkkaiProps {
  user: User;
  handleSignOut: () => void;
  hideOverlay(): void;
}

export const UserSectionMobileIkkai: React.FC<IUserSectionMobileIkkaiProps> = ({
  user,
  handleSignOut,
  hideOverlay,
}) => {
  const [, setexpanded] = useState(true);

  return user ? (
    <>
      <StyledAccordion onChange={() => setexpanded(prev => !prev)}>
        <StyledAccordionSummary
          expandIcon={
            <S.ExpandIcon isSecondary>
              <RightChevron />
            </S.ExpandIcon>
          }
        >
          <AccountIcon
            style={{
              width: "1.5rem",
              marginRight: "0.75rem",
              fontSize: "1rem",
              lineHeight: "1em",
            }}
          />
          <S.SecondaryMenuText>My Account</S.SecondaryMenuText>
        </StyledAccordionSummary>

        <StyledAccordionDetails>
          <UserMenuList
            user={user}
            handleSignOut={handleSignOut}
            hideMenu={() => {
              setexpanded(false);
            }}
          />
        </StyledAccordionDetails>
      </StyledAccordion>
    </>
  ) : (
    <>
      <MyCustomLink
        href="/page/login"
        style={{ display: "flex", alignItems: "center" }}
        onClick={hideOverlay}
      >
        <>
          <AccountIcon
            style={{
              width: "1.5rem",
              marginRight: "0.75rem",
              fontSize: "1rem",
              lineHeight: "1em",
            }}
          />
          <S.SecondaryMenuText>My Account</S.SecondaryMenuText>
        </>
      </MyCustomLink>
    </>
  );
};
UserSectionMobileIkkai.displayName = "UserSectionMobileIkkai";
export default UserSectionMobileIkkai;
