import React from "react";
import Media from "react-media";
import { largeScreen } from "@styles/constants";
// import * as S from "./style";
import MobileHeaderContainer from "../MobileHeaderContainer/MobileHeaderContainer";
import YarnNavbar from "../YarnNavbar/YarnNavbar";

export interface INavBarWrapperProps {}

export const NavBarWrapper: React.FC<INavBarWrapperProps> = () => {
  return (
    <>
      <Media
        query={{ maxWidth: largeScreen }}
        render={() => <MobileHeaderContainer className="nav-bar" />}
      />

      <Media query={{ minWidth: largeScreen }} render={() => <YarnNavbar />} />
    </>
  );
};
NavBarWrapper.displayName = "NavBarWrapper";
export default NavBarWrapper;
