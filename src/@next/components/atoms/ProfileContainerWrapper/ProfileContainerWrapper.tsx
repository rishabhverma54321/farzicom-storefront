import BuildingSVG from "images/profileSvg/BuildingSVG";
import ProfileFaqIcon from "images/profileSvg/ProfileFaqIcon";
import ProfileInfoIcon from "images/profileSvg/ProfileInfoIcon";
import ProfileInviteIcon from "images/profileSvg/ProfileInviteIcon";
import ProfileSettingIcon from "images/profileSvg/ProfileSettingIcon";
import ProfileSuggestIcon from "images/profileSvg/ProfileSuggestIcon";
import ProfileSupportIcon from "images/profileSvg/ProfileSupportIcon";
import ProfileTeamIcon from "images/profileSvg/ProfileTeamIcon";
import RightArraow from "images/profileSvg/RightArraow";
import SingleUser from "images/profileSvg/SingleUser";
import UserTickIcon from "images/profileSvg/UserTickIcon";
import React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import ProfileInfoWrapper from "../ProfileInfoWrapper/ProfileInfoWrapper";
import ProfileSectionHead from "../ProfileSectionHead/ProfileSectionHead";
import SliderAndInfoWrapper from "../SliderAndInfoWrapper/SliderAndInfoWrapper";
import TestComponent from "../TestComponent/TestComponent";
import * as S from "./style";

export interface IProfileContainerWrapperProps {}

export const ProfileContainerWrapper: React.FC<IProfileContainerWrapperProps> = () => {
  return (
    <S.Container>
      <ProfileSectionHead
        bgColor="#F4F8F9"
        infoArray={[
          <SliderAndInfoWrapper
            sliderBgColor="#33A532"
            sliderRangeSetter={100}
            infoIcon={<UserTickIcon />}
            infoInnerTitle="Your Profile is complete! You can now carry out actions like Posting requirements, Payments and Managing orders and dispatches."
            rightContainerContent={[]}
            infoBgColor=""
            fontSizeSvg={1.1}
            fontSizeTitle={0.6}
            titleColor="#616161"
          />,
          <SliderAndInfoWrapper
            sliderBgColor="#005BC2"
            sliderRangeSetter={60}
            infoIcon={<BuildingSVG />}
            infoInnerTitle="Your Company profile is incomplete, To carry out any transactions you will need a complete profile"
            rightContainerContent={[]}
            infoBgColor=""
            fontSizeSvg={1.1}
            fontSizeTitle={0.6}
            titleColor="#616161"
          />,
        ]}
      />

      <S.LowerInnerContainer>
        <ProfileInfoWrapper
          profileInfoComponents={[
            <MyCustomLink href="/">
              <TestComponent
                svgSrc={<SingleUser />}
                innerTitle="Personal Information"
                rightContainerContent={[<RightArraow />, <ProfileInfoIcon />]}
                bgColor=""
                titleColor="black"
                fontSizeTitle={1}
                fontSizeSvg={1.1}
                link="/"
              />
            </MyCustomLink>,
            <MyCustomLink href="/page/company">
              <TestComponent
                svgSrc={<BuildingSVG />}
                innerTitle="Company Information"
                rightContainerContent={[<RightArraow />, <ProfileInfoIcon />]}
                bgColor="#F4F8F9"
                titleColor="black"
                fontSizeTitle={1}
                fontSizeSvg={1.1}
                link="/page/company"
              />
            </MyCustomLink>,

            <TestComponent
              svgSrc={<ProfileTeamIcon />}
              innerTitle="My Team"
              rightContainerContent={[<RightArraow />, <ProfileInfoIcon />]}
              bgColor=""
              titleColor="black"
              fontSizeTitle={1}
              fontSizeSvg={1.1}
            />,

            <TestComponent
              svgSrc={<ProfileSettingIcon />}
              innerTitle="Settings"
              rightContainerContent={[<RightArraow />, <ProfileInfoIcon />]}
              bgColor="#F4F8F9"
              titleColor="black"
              fontSizeTitle={1}
              fontSizeSvg={1.1}
            />,

            <TestComponent
              svgSrc={<ProfileSupportIcon />}
              innerTitle="Support"
              rightContainerContent={[<RightArraow />, <ProfileInfoIcon />]}
              bgColor=""
              titleColor="black"
              fontSizeTitle={1}
              fontSizeSvg={1.1}
            />,

            <TestComponent
              svgSrc={<ProfileInviteIcon />}
              innerTitle="Invite"
              rightContainerContent={[<RightArraow />, <ProfileInfoIcon />]}
              bgColor="#F4F8F9"
              titleColor="black"
              fontSizeTitle={1}
              fontSizeSvg={1.1}
            />,

            <TestComponent
              svgSrc={<ProfileFaqIcon />}
              innerTitle="FAQs"
              rightContainerContent={[<RightArraow />, <ProfileInfoIcon />]}
              bgColor=""
              titleColor="black"
              fontSizeTitle={1}
              fontSizeSvg={1.1}
            />,

            <TestComponent
              svgSrc={<ProfileSuggestIcon />}
              innerTitle="Suggest a feature"
              rightContainerContent={[<RightArraow />, <ProfileInfoIcon />]}
              bgColor="#F4F8F9"
              titleColor="black"
              fontSizeTitle={1}
              fontSizeSvg={1.1}
            />,
          ]}
        />
      </S.LowerInnerContainer>
    </S.Container>
  );
};
ProfileContainerWrapper.displayName = "ProfileContainerWrapper";
export default ProfileContainerWrapper;
