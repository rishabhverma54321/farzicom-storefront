import * as React from "react";
// FIXME:NextJs Make it a CSS module
// import "./index.scss";

import { useAuth, useAuthState } from "@saleor/sdk";
import { useCustomHistory } from "@hooks/useCustomHistory";
// import { CLIENT, OTPLESS_WHATSAPP_ID_KEY } from "Themes/config";
// import { Icon } from "@components/atoms/Icon";
// import { clients } from "@globalTypes/customGlobalTypes";
import { useCustomLocation } from "@hooks/useCustomLocation";
// import dynamic from "next/dynamic";
import {
  // INavItem,
  // Overlay,
  OverlayContextInterface,
  // MobileNavListPlix,
} from "..";

// // Dynamic Imports
// const MobileNavListMpil = dynamic(() => import("../MobileNavMpil/NavList"));
// const MobileNavListSwa = dynamic(() => import("../MobileNavSwa/NavList"));
// const MobileNavList = dynamic(() => import("../MobileNav/NavList"));

const MobileNav: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => {
  // const items: INavItem[] = overlay.context.data;
  const { signOut } = useAuth();
  const { user } = useAuthState();
  const history = useCustomHistory();
  const location = useCustomLocation();
  const { hide } = overlay;
  // const handleSignOut = () => {
  //   signOut().then(res => {
  //     // Remove otpless whatsapp verification id from localstorage when user logs out
  //     if (typeof window !== "undefined") {
  //       localStorage.removeItem(OTPLESS_WHATSAPP_ID_KEY);
  //     }
  //     //
  //     history.push({
  //       pathname: "/",
  //     });
  //     // hideMenu();
  //   });
  // };

  // const redirectToLogin = () => {
  //   // history.push({
  //   //   pathname: "/page/login",
  //   //   state: { url: location.pathname },
  //   // });
  //   hide();
  //   if (typeof handleCustomLogin === "function") {
  //     handleCustomLogin(true);
  //   }
  // };

  // const renderSwitch = () => {
  //   switch (CLIENT) {
  //     case clients.LOTUS:
  //     case clients.BODY_FIRST:
  //     case clients.PLIXLIFEFC:
  //     case clients.WOWFC_NEW:
  //     case clients.BUY_WOW:
  //       return (
  //         <div className="side-nav-plix" onClick={evt => evt.stopPropagation()}>
  //           <MobileNavListPlix
  //             items={items}
  //             hideOverlay={hide}
  //             user={user}
  //             handleSignOut={handleSignOut}
  //             redirectToLogin={redirectToLogin}
  //           />
  //         </div>
  //       );

  //     case clients.MPIL:
  //       return (
  //         <MobileNavListMpil
  //           items={items}
  //           hideOverlay={hide}
  //           user={user}
  //           handleSignOut={handleSignOut}
  //           redirectToLogin={redirectToLogin}
  //         />
  //       );

  //     case clients.LOTUS_NEW:
  //     case clients.LOTUS_STAGE:
  //       return (
  //         <div
  //           className="side-nav-lotus-new"
  //           onClick={evt => evt.stopPropagation()}
  //         >
  //           <>
  //             <MobileNavList
  //               items={items}
  //               hideOverlay={hide}
  //               user={user}
  //               handleSignOut={handleSignOut}
  //             />
  //             <div
  //               className="side-nav-lotus-new__menu-item-close"
  //               onClick={hide}
  //             >
  //               {/* <CloseIcon style={{ fontSize: "2rem", color: "#fff" }} /> */}
  //               <Icon name="x" size={16} />
  //             </div>
  //           </>
  //         </div>
  //       );
  //     case clients.DRINKSWA2:
  //       return (
  //         <div className="side-nav-swa" onClick={evt => evt.stopPropagation()}>
  //           <MobileNavListSwa
  //             items={items}
  //             hideOverlay={hide}
  //             user={user}
  //             handleSignOut={handleSignOut}
  //             redirectToLogin={redirectToLogin}
  //           />
  //         </div>
  //       );
  //     default:
  //       <div className="side-nav-plix" onClick={evt => evt.stopPropagation()}>
  //         <MobileNavListPlix
  //           items={items}
  //           hideOverlay={hide}
  //           user={user}
  //           handleSignOut={handleSignOut}
  //           redirectToLogin={redirectToLogin}
  //         />
  //       </div>;
  //   }
  // };
  return (
    // <Overlay
    //   testingContext="mobileNavigationOverlay"
    //   context={overlay}
    //   className="overlayFarzicom_sidenav"
    // >
    //   {renderSwitch()}
    // </Overlay>
    <></>
  );
};

export default MobileNav;
