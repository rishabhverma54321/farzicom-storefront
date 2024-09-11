import UserTickIcon from "images/profileSvg/UserTickIcon";
import React from "react";
import LabelCustomInputContainer from "../LabelCustomInputContainer/LabelCustomInputContainer";
import ProfileImageContainer from "../ProfileImageContainer/ProfileImageContainer";
import ProfileUserInfo from "../ProfileUserInfo/ProfileUserInfo";
import SliderAndInfoWrapper from "../SliderAndInfoWrapper/SliderAndInfoWrapper";
import SaveChangesBtn from "./SaveChangesBtn";
import * as S from "./style";

export interface IPersonalProfileEditProps {}

export const PersonalProfileEdit: React.FC<IPersonalProfileEditProps> = () => {
  return (
    <>
      <S.Container>
        <S.TopContainer>
          <S.TopContainerLeft>
            <ProfileImageContainer
              profileImg={<UserTickIcon />}
              firstName="roshan"
              lastName="kumar"
              className="personal"
              companyName="mera"
            />
            <ProfileUserInfo
              userProfileInfo={[
                "John Doe",
                "+91 9975 713567",
                "Logistics | Associate",
              ]}
            />
          </S.TopContainerLeft>
          <S.TopContainerRight>
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
            />
          </S.TopContainerRight>
        </S.TopContainer>

        <S.LowerContainer>
          <LabelCustomInputContainer
            InputId="firstname"
            labelName="First Name"
            className="edit__profile"
            inputPlaceholder="First Name"
            inputPlaceHolderColor=""
            id="fname"
            bgColor="#F4F8F9"
            required
          />

          <LabelCustomInputContainer
            InputId="last_name"
            labelName="Last Name"
            className="edit__profile"
            inputPlaceholder="Last Name"
            inputPlaceHolderColor=""
            id="last_name"
            required
            bgColor="#ffffff"
          />
          <LabelCustomInputContainer
            InputId="phone_number"
            labelName="Phone Number"
            className="edit__profile"
            inputPlaceholder="Enter your Phone number"
            inputPlaceHolderColor=""
            id="phone_number"
            required
            bgColor="#F4F8F9"
          />
          <LabelCustomInputContainer
            InputId="email"
            labelName="Email"
            className="edit__profile"
            inputPlaceholder="Email"
            inputPlaceHolderColor=""
            id="email"
            required={false}
            bgColor="#ffffff"
          />

          <LabelCustomInputContainer
            InputId="company_personal"
            labelName="Company"
            className="edit__profile"
            inputPlaceholder="Company Name"
            inputPlaceHolderColor=""
            id="company_personal"
            required
            bgColor="#F4F8F9"
          />

          <LabelCustomInputContainer
            InputId="dept_personal"
            labelName="Department"
            className="edit__profile"
            inputPlaceholder="Department"
            inputPlaceHolderColor=""
            id="dept_personal"
            required
            bgColor="#ffffff"
          />
          <LabelCustomInputContainer
            InputId="designation"
            labelName="Designation"
            className="edit__profile"
            inputPlaceholder="Designation"
            inputPlaceHolderColor=""
            id="designationId"
            required
            bgColor="#F4F8F9"
          />

          <LabelCustomInputContainer
            InputId="access"
            labelName="Access"
            className="edit__profile"
            inputPlaceholder="Access"
            inputPlaceHolderColor=""
            id="accessId"
            required
            bgColor="#ffffff"
          />
        </S.LowerContainer>
        {/* <S.Bottom>This is yarn categories</S.Bottom> */}
      </S.Container>
      <SaveChangesBtn />
    </>
  );
};

PersonalProfileEdit.displayName = "PersonalProfileEdit";
export default PersonalProfileEdit;
