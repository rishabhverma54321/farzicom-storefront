import React, { useContext } from "react";
import ProfileHamuburgerSVG from "images/profileSvg/ProfileHamuburgerSVG";
import { useCustomLocation } from "@hooks/useCustomLocation";

import { OverlayContext, OverlayType, OverlayTheme } from "@temp/components";
import * as S from "./style";

export interface IMobileHeaderContainerProps {
  className: string;
}

export const MobileHeaderContainer: React.FC<IMobileHeaderContainerProps> = ({
  className,
}) => {
  const { show } = useContext(OverlayContext);
  const location = useCustomLocation();
  const pathName = location.pathname;
  const pathSplit = pathName.split("/");
  function showSideBar() {
    show(OverlayType.yarnSideBar, OverlayTheme.left);
  }
  const getHeaderName = () => {
    if (
      pathName === "/page/buyer-dispatch" ||
      pathName === "/page/supplier-dispatch"
    ) {
      return "Dispatches";
    }
    if (
      pathSplit[2] === "supplier-dispatch" ||
      (pathSplit[2] === "buyer-dispatch" && pathSplit[3])
    ) {
      return "Dispatch Detail";
    }
    if (
      pathSplit[2] === "supplier-order" ||
      (pathSplit[2] === "buyer-order" && pathSplit[3])
    ) {
      return "Order Detail";
    }
    if (
      pathName === "/page/buyer-order" ||
      pathName === "/page/supplier-order"
    ) {
      return "Orders";
    }
    if (pathName === "/") return "Personal Information";
    if (pathName === "/page/company") return "Company Information";
    return "Home";
  };
  return (
    <S.Container className={className}>
      <S.LeftContainer
        onClick={showSideBar}
        className={`${className}__left-container`}
      >
        <ProfileHamuburgerSVG />
      </S.LeftContainer>
      <S.RightContainer className={`${className}__right-container`}>
        {getHeaderName()}
      </S.RightContainer>
    </S.Container>
  );
};
MobileHeaderContainer.displayName = "MobileHeaderContainer";
export default MobileHeaderContainer;
