// import { User } from "@saleor/sdk/lib/fragments/gqlTypes/User";
import { MenuDropdown } from "@temp/components";
import React, { useState } from "react";
import { UserMenuList } from "@components/atoms/UserMenuList";
import MemoUserSvg from "@components/atoms/SvgIcons/UserSvg";
import MemoUserNewSVG from "@components/atoms/SvgIcons/UserNewSVG";

export interface IUserProps {
  user: any;
  handleSignOut: (val: (v: boolean) => void) => void;
  label?: boolean;
  userIcon?: React.ReactNode;
  showWalletBalance?: boolean;
}

export const UserSection: React.FC<IUserProps> = ({
  user,
  handleSignOut,
  label = false,
  userIcon,
  showWalletBalance,
}) => {
  const [active, setActive] = useState(false);
  const hideMenu = () => {
    setActive(false);
  };
  return (
    <>
      <MenuDropdown
        head={
          <span className="main-menu__icon main-menu__user--active">
            {userIcon ? <> {userIcon} </> : <MemoUserNewSVG />}
          </span>
        }
        active={active}
        setActive={setActive}
        content={
          <UserMenuList
            showWalletBalance={showWalletBalance}
            user={user}
            hideMenu={hideMenu}
            handleSignOut={() => {
              handleSignOut(hideMenu);
              hideMenu();
            }}
          />
        }
      />
    </>
  );
};
UserSection.displayName = "User";
export default UserSection;
