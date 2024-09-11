import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import Chat from "./assets/Question_answer";
import { useAuth, useAuthState } from "@saleor/sdk";
import Supplier from "./assets/Supplier";

import * as S from "./style";
import Phone from "./assets/Phone";
import LogoutIcon from "../../../../images/order-dispatch/Logout";
import Buyer from "./assets/Buyer";
// import People from "./assets/People";
// import Work from "./assets/Work";
import Shoppingcart from "./assets/Shopping_cart";
// import Products from "./assets/Products";
import Dispatch from "./assets/Dispatch";
import Work from "./assets/Work";
import People from "./assets/People";
import Connect from "../../atoms/Connect/Connect";
import { useCustomHistory } from "@hooks/useCustomHistory";

export interface IYarnSidebarProps {}

export const YarnSidebar: React.FC<IYarnSidebarProps> = () => {
  const [show, setShow] = useState(false);
  const { signOut } = useAuth();
  const { user } = useAuthState();
  const history = useCustomHistory();

  const storage: any = localStorage.getItem("userMeta");
  const userData = JSON.parse(storage);
  const companyImg = userData?.company?.avatar?.url;
  const firstInitial = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : "";
  const lastInitial = user?.lastName
    ? user.lastName.charAt(0).toUpperCase()
    : "";
  const logout = () => {
    signOut();
    history.push({
      pathname: "/page/login",
    });
  };
  const handleModal = (event?: any) => {
    event.stopPropagation();
    event.preventDefault();
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const handleClickClose = (event: any) => {
    event.stopPropagation();
    setShow(false);
  };

  return (
    <S.Sidebar>
      {/* <NavLink exact activeClassName="active-logo" to="/"> */}
        <S.SidebarLogo className="user-logo">
          <S.Logo className={companyImg ? "available" : "unavailable"}>
            <S.UserImg>{`${firstInitial}${lastInitial}`}</S.UserImg>
            {companyImg && <S.CompanyImg src={companyImg} />}
          </S.Logo>
          <S.UserName>
            {user?.firstName
              ? user?.firstName.length <= 7
                ? `${user?.firstName.substring(0, 7)}`
                : `${user?.lastName.substring(0, 7)}...`
              : ""}
          </S.UserName>
        </S.SidebarLogo>
      {/* </NavLink> */}
      <S.SidebarSection>
        {/* <S.SideBarLink>
          <Chat />
          <S.Title>Chat</S.Title>
        </S.SideBarLink> */}
        {/* <NavLink activeClassName="general" to="/page/team-member"> */}
          <S.SideBarLink>
            <People />
            <S.Title>Team</S.Title>
          </S.SideBarLink>
        {/* </NavLink> */}
        {/* <NavLink activeClassName="general" to="/page/company"> */}
          <S.SideBarLink>
            <Work />
            <S.Title>
              <span>Company</span>
              <span>Info</span>
            </S.Title>
          </S.SideBarLink>
        {/* </NavLink> */}
      </S.SidebarSection>
      <S.SidebarSection className="supplier">
        <Supplier />
        {/* <NavLink activeClassName="active-supplier" to="/page/supplier-order"> */}
          <S.SideBarLink>
            <Shoppingcart />
            <S.Title>Orders</S.Title>
          </S.SideBarLink>
        {/* </NavLink> */}
        {/* <NavLink activeClassName="active-supplier" to="/page/supplier-dispatch"> */}
          <S.SideBarLink>
            <Dispatch />
            <S.Title>Dispatches</S.Title>
          </S.SideBarLink>
        {/* </NavLink> */}
        {/* <S.SideBarLink>
          <Products />
          <S.Title>Products</S.Title>
        </S.SideBarLink> */}
      </S.SidebarSection>
      <S.SidebarSection>
        <S.SideBarLink className="buyer">
          <Buyer />
          {/* <NavLink activeClassName="active-buyer" to="/page/buyer-order"> */}
            <S.SideBarLink>
              <Shoppingcart />
              <S.Title>Orders</S.Title>
            </S.SideBarLink>
          {/* </NavLink> */}

          {/* <NavLink to="/page/buyer-dispatch" activeClassName="active-buyer"> */}
            <S.SideBarLink>
              <Dispatch />
              <S.Title>Dispatches</S.Title>
            </S.SideBarLink>
          {/* </NavLink> */}
          {/* <S.SideBarLink>
            <Products />
            <S.Title>Products</S.Title>
          </S.SideBarLink> */}
        </S.SideBarLink>
      </S.SidebarSection>
      <S.SideBarBottom>
        <S.Icon className="phone">
          <Phone
            className="sidebar-icon"
            onClick={event => handleModal(event)}
          />
          {show && (
            <Connect classStyle="phone__box" handleClose={handleClickClose} />
          )}
        </S.Icon>
        {/* <S.Icon>
          <Settings className="sidebar-icon" />
        </S.Icon> */}
        <S.Icon title="Logout" onClick={logout}>
          <LogoutIcon className="sidebar-icon" />
        </S.Icon>
      </S.SideBarBottom>
    </S.Sidebar>
  );
};
YarnSidebar.displayName = "YarnSidebar";
export default YarnSidebar;
