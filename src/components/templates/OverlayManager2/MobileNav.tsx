import * as React from "react";
//FIXME:NextJs Make it a CSS module
//import "./index.scss";

import { useAuth, useAuthState } from "@saleor/sdk";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { CLIENT } from "Themes/config";
import { Icon } from "@components/atoms/Icon";
import { clients } from "gqlTypes/customGlobalTypes";
import {
  INavItem,
  MobileNavListIkkai,
  MobileNavList,
  Overlay,
  OverlayContextInterface,
  MobileNavListPlix,
  MobileNavListMpil,
  MobileNavListSwa,
} from "..";
import { useCustomLocation } from "@hooks/useCustomLocation";

const MobileNav: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => {
  const items: INavItem[] = overlay.context.data;
  const { signOut } = useAuth();
  const { user } = useAuthState();
  const history = useCustomHistory();
  const location = useCustomLocation();
  const { hide } = overlay;
  const handleSignOut = () => {
    signOut().then(res => {
      //
      history.push({
        pathname: "/",
      });
      // hideMenu();
    });
  };

  const redirectToLogin = () => {
    // history.push({
    //   pathname: "/page/login",
    //   state: { url: location.pathname },
    // });
    hide();
    if (typeof handleCustomLogin === "function") {
      handleCustomLogin(true);
    }
  };

  const renderSwitch = () => {
    switch (CLIENT) {
      case clients.LOTUS:
        return (
          <div
            className="side-nav-lotus-new"
            onClick={evt => evt.stopPropagation()}
          >
            <MobileNavList
              items={items}
              hideOverlay={hide}
              user={user}
              handleSignOut={handleSignOut}
            />
          </div>
        );

      case clients.BODY_FIRST:
      case clients.PLIXLIFEFC:
        return (
          <div className="side-nav-plix" onClick={evt => evt.stopPropagation()}>
            <MobileNavListPlix
              items={items}
              hideOverlay={hide}
              user={user}
              handleSignOut={handleSignOut}
              redirectToLogin={redirectToLogin}
            />
          </div>
        );

      case clients.MPIL:
        return (
          <MobileNavListMpil
            items={items}
            hideOverlay={hide}
            user={user}
            handleSignOut={handleSignOut}
            redirectToLogin={redirectToLogin}
          />
        );

      case clients.LOTUS_NEW:
        return (
          <div
            className="side-nav-lotus-new"
            onClick={evt => evt.stopPropagation()}
          >
            <>
              <MobileNavList
                items={items}
                hideOverlay={hide}
                user={user}
                handleSignOut={handleSignOut}
              />
              <div
                className="side-nav-lotus-new__menu-item-close"
                onClick={hide}
              >
                {/* <CloseIcon style={{ fontSize: "2rem", color: "#fff" }} /> */}
                <Icon name="x" size={16} />
              </div>
            </>
          </div>
        );
      case clients.LOTUS_STAGE:
        return (
          <div
            className="side-nav-lotus-new"
            onClick={evt => evt.stopPropagation()}
          >
            <>
              <MobileNavList
                items={items}
                hideOverlay={hide}
                user={user}
                handleSignOut={handleSignOut}
              />
              <div
                className="side-nav-lotus-new__menu-item-close"
                onClick={hide}
              >
                {/* <CloseIcon style={{ fontSize: "2rem", color: "#fff" }} /> */}
                <Icon name="x" size={16} />
              </div>
            </>
          </div>
        );
      case clients.DRINKSWA2:
        return (
          <div className="side-nav-swa" onClick={evt => evt.stopPropagation()}>
            <MobileNavListSwa
              items={items}
              hideOverlay={hide}
              user={user}
              handleSignOut={handleSignOut}
              redirectToLogin={redirectToLogin}
            />
          </div>
        );
      default:
        return (
          <div className="side-nav" onClick={evt => evt.stopPropagation()}>
            <MobileNavListIkkai
              items={items}
              hideOverlay={hide}
              user={user}
              handleSignOut={handleSignOut}
              redirectToLogin={redirectToLogin}
            />
          </div>
        );
    }
  };
  return (
    <Overlay
      testingContext="mobileNavigationOverlay"
      context={overlay}
      className="overlayFarzicom_sidenav"
    >
      {renderSwitch()}
    </Overlay>
  );
};

export default MobileNav;
