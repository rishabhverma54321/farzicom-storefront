import React, { ReactNode } from "react";
import ProfileImageContainer from "../ProfileImageContainer/ProfileImageContainer";

import * as S from "./style";
import ProfileUserInfo from "../ProfileUserInfo/ProfileUserInfo";

export interface IProfileSectionHeadProps {
  bgColor: string;
  infoArray: Array<ReactNode>;
  userProfileInfo?: any;
  ProfileImg?: any;
  data?: any;
  className?: string;
}

export const ProfileSectionHead: React.FC<IProfileSectionHeadProps> = ({
  bgColor,
  infoArray,
  userProfileInfo,
  ProfileImg,
  data,
  className,
}) => {
  return (
    <S.Container bgColor={bgColor}>
      <S.LeftContainer>
        <ProfileImageContainer
          profileImg={ProfileImg}
          data={data}
          firstName={data?.firstName}
          lastName={data?.lastName}
          className={className}
          companyName={userProfileInfo}
        />
        <ProfileUserInfo userProfileInfo={userProfileInfo} />
      </S.LeftContainer>

      <S.RightContainer>
        <S.RightContainerTop>
          {infoArray.map((content, id) => {
            return <div key={id}>{content}</div>;
          })}
        </S.RightContainerTop>
        {/* <S.RightContainerBottom> */}
        {/* <RangeSlider rangeSetter={60} bgColor="#005BC2"/>
        <TestComponent
                svgSrc={<BuildingSVG/>}
                innerTitle='Your Company profile is incomplete, To carry out any transactions you will need a complete profile'
                rightContainerContent={[]}
                    bgColor=""
                    fontSizeSvg={1.1}
                    fontSizeTitle={0.6}
                    titleColor="#616161"
                  /> */}
        {/* </S.RightContainerBottom> */}
      </S.RightContainer>
    </S.Container>
  );
};
ProfileSectionHead.displayName = "ProfileSectionHead";
export default ProfileSectionHead;
