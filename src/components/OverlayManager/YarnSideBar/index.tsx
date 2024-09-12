import React, { useContext, useState } from "react";
// import CloseIcon from "@material-ui/icons/Close";
// import "./scss/index.scss";

import ProfileImageContainer from "@components/atoms/ProfileImageContainer/ProfileImageContainer";
import ProfileUserInfo from "@components/atoms/ProfileUserInfo/ProfileUserInfo";
import { TestComponent } from "@components/atoms/TestComponent";
import { TextIcon } from "@components/atoms/TextIcon";
import { ToggleBtn } from "@components/atoms/ToggleBtn";

import SideNavChatSVG from "images/profileSvg/SideNavChatSVG";
import RightArraow from "images/profileSvg/RightArraow";
import TeamsSideNavSVG from "images/profileSvg/TeamsSideNavSVG";
import CompanySuitcaseSVG from "images/profileSvg/CompanySuitcaseSVG";
import SideNavCrossSVG from "images/profileSvg/SideNavCrossSVG";
import ArrowUpward from "@components/atoms/YarnNavbar/ArrowUpward";
import ArrowDownward from "@components/atoms/YarnNavbar/ArrowDownward";
import NavCallSVG from "images/profileSvg/NavCallSVG";
import NavSettingSVG from "images/profileSvg/NavSettingSVG";
import NavBarBasketOneSVG from "images/profileSvg/NavBarBasketOneSVG";
import NavBarCartOneSVG from "images/profileSvg/NavBarCartOneSVG";
import NavBarTruckOneSVG from "images/profileSvg/NavBarTruckOneSVG";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { useAuth, useAuthState } from "@saleor/sdk";

import {
  Overlay,
  OverlayContext,
  OverlayContextInterface,
  // OverlayTheme,
  // OverlayType,
} from "../..";
import * as S from "./styles";

export interface IYarnSideBar {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const YarnSideBar: React.FC<IYarnSideBar> = ({ overlay, testingContext }) => {
  const { hide } = useContext(OverlayContext);

  const [selectBtn, setSelectBtn] = useState("supplier");
  function hideSideBar() {
    hide();
  }
  const { user } = useAuthState();
  const phoneNumber = user?.email.match(/\d+/g)[0];
  let userData: any = localStorage.getItem("userMeta");
  userData = JSON.parse(userData);
  userData = {
    companyImg: userData?.company?.avatar?.url
      ? userData?.company?.avatar?.url
      : "",
    firstName: userData?.user?.firstName ? userData?.user?.firstName : "",
    lastName: userData?.user?.lastName ? userData?.user?.lastName : "",
    department: userData?.department ? userData?.department : "",
    designation: userData?.designation ? userData?.designation : "",
  };
  return (
    <Overlay testingContext={testingContext} context={overlay}>
      <S.Container>
        <S.InnerContainer>
          <S.Header>
            <S.Heading>Menu</S.Heading>
            <S.CloseNavCon onClick={hideSideBar}>
              <SideNavCrossSVG />
            </S.CloseNavCon>
          </S.Header>
          <MyCustomLink href="/">
            <S.SidebarHeader>
              <ProfileImageContainer
                profileImg={`${userData?.companyImg}`}
                firstName={userData?.firstName}
                lastName={userData?.lastName}
                className="personal"
              />
              <ProfileUserInfo
                userProfileInfo={[
                  `${user?.firstName} ${user?.lastName}`,
                  `+91 ${phoneNumber}`,
                  `${userData?.department} | ${userData.designation}`,
                ]}
              />
            </S.SidebarHeader>
          </MyCustomLink>

          <S.SidebarSubheader>
            <TestComponent
              bgColor=""
              svgSrc={<SideNavChatSVG />}
              innerTitle="Chat"
              rightContainerContent={[<RightArraow key="right-arrow"/>]}
              titleColor=""
              fontSizeTitle={0.7}
              fontSizeSvg={0.8}
              className="mob-nav"
            />
          </S.SidebarSubheader>

          <S.SidebarSubheader>
            <TestComponent
              bgColor="#F4F8F9"
              svgSrc={<TeamsSideNavSVG />}
              innerTitle="My team"
              rightContainerContent={[<RightArraow key="right-arrow"/>]}
              titleColor=""
              fontSizeTitle={0.7}
              fontSizeSvg={0.8}
              className="mob-nav"
              link="page/team-member"
            />
            <TestComponent
              bgColor=""
              svgSrc={<CompanySuitcaseSVG />}
              innerTitle="Company Information"
              rightContainerContent={[<RightArraow key="right-arrow"/>]}
              titleColor=""
              fontSizeTitle={0.7}
              fontSizeSvg={0.8}
              className="mob-nav"
              link="/page/company"
            />
          </S.SidebarSubheader>
          <S.SidebarSubheader className="mob-nav-switch">
            <ToggleBtn
              buttonOne="supplier"
              buttonTwo="buyer"
              selectBtn={selectBtn}
              setSelectBtn={setSelectBtn}
              ClassStyle="nav-toggle"
            />
            {selectBtn === "supplier" && (
              <S.OptionsContainer>
                <TestComponent
                  bgColor=""
                  svgSrc={<NavBarCartOneSVG />}
                  innerTitle="My Orders"
                  rightContainerContent={[<RightArraow key="right-arrow"/>]}
                  titleColor=""
                  fontSizeTitle={0.7}
                  fontSizeSvg={0.8}
                  className="mob-nav"
                  id="supplier"
                  link="/page/supplier-order"
                />
                <TestComponent
                  bgColor="#F4F8F9"
                  svgSrc={<NavBarTruckOneSVG />}
                  innerTitle="My Dispatches"
                  rightContainerContent={[<RightArraow key="right-arrow"/>]}
                  titleColor=""
                  fontSizeTitle={0.7}
                  fontSizeSvg={0.8}
                  className="mob-nav"
                  id="supplier"
                  link="/page/supplier-dispatch"
                />
                <TestComponent
                  bgColor=""
                  svgSrc={<NavBarBasketOneSVG />}
                  innerTitle="My Products"
                  rightContainerContent={[<RightArraow key="right-arrow"/>]}
                  titleColor=""
                  fontSizeTitle={0.7}
                  fontSizeSvg={0.8}
                  className="mob-nav"
                  id="supplier"
                />
              </S.OptionsContainer>
            )}
            {selectBtn === "buyer" && (
              <S.OptionsContainer>
                <TestComponent
                  bgColor=""
                  svgSrc={<NavBarCartOneSVG />}
                  innerTitle="My Orders"
                  rightContainerContent={[<RightArraow key="right-arrow"/>]}
                  titleColor=""
                  fontSizeTitle={0.7}
                  fontSizeSvg={0.8}
                  className="mob-nav"
                  id="buyer"
                  link="/page/buyer-order"
                />
                <TestComponent
                  bgColor="#F4F8F9"
                  svgSrc={<NavBarTruckOneSVG />}
                  innerTitle="My Dispatches"
                  rightContainerContent={[<RightArraow key="right-arrow"/>]}
                  titleColor=""
                  fontSizeTitle={0.7}
                  fontSizeSvg={0.8}
                  className="mob-nav"
                  id="buyer"
                  link="/page/buyer-dispatch"
                />
                <TestComponent
                  bgColor=""
                  svgSrc={<NavBarBasketOneSVG />}
                  innerTitle="My Products"
                  rightContainerContent={[<RightArraow key="right-arrow"/>]}
                  titleColor=""
                  fontSizeTitle={0.7}
                  fontSizeSvg={0.8}
                  className="mob-nav"
                  id="buyer"
                />
              </S.OptionsContainer>
            )}
          </S.SidebarSubheader>
        </S.InnerContainer>

        <S.InnerContainer>
          <S.Navlinks>
            <TextIcon
              text="60s CWC 456 | 4%"
              icon={<ArrowUpward />}
              ClassName="nav-item"
            />
            <TextIcon
              text="60s CWC 456 | 4%"
              icon={<ArrowDownward />}
              ClassName="nav-item"
            />
          </S.Navlinks>
          <S.ButtonContainer>
            <S.ButtonContent>
              <TextIcon
                text={<NavSettingSVG />}
                icon="Settings"
                textColor="#005BC2"
              />
            </S.ButtonContent>
            <S.ButtonContent>
              <TextIcon
                text={<NavCallSVG />}
                icon="Call Us"
                textColor="#33A532"
              />
            </S.ButtonContent>
          </S.ButtonContainer>
        </S.InnerContainer>
      </S.Container>
    </Overlay>
  );
};

export default YarnSideBar;
