import BuildingSVG from "images/profileSvg/BuildingSVG";
import ProfileComanySVG from "images/profileSvg/ProfileComanySVG";
// import UploadIconSVG from "images/profileSvg/UploadIconSVG";
import React from "react";
import LabelAndCheckBoxContainer from "../LabelAndCheckBoxContainer/LabelAndCheckBoxContainer";
// import IconInfoContainer from "../IconInfoContainer/IconInfoContainer";
import LabelCustomInputContainer from "../LabelCustomInputContainer/LabelCustomInputContainer";

import ProfileImageContainer from "../ProfileImageContainer/ProfileImageContainer";
import ProfileUserInfo from "../ProfileUserInfo/ProfileUserInfo";
import SliderAndInfoWrapper from "../SliderAndInfoWrapper/SliderAndInfoWrapper";
import * as S from "../PersonalProfileEdit/style";
import SaveChangesBtn from "../PersonalProfileEdit/SaveChangesBtn";

export interface ICompanyProfileEditProps {}

export const CompanyProfileEdit: React.FC<ICompanyProfileEditProps> = () => {
  return (
    <>
      <S.Container>
        <S.TopContainer>
          <S.TopContainerLeft>
            <ProfileImageContainer
              profileImg=""
              firstName="roshan"
              lastName="kumar"
              className="company"
              companyName="mera"
            />
            <ProfileUserInfo userProfileInfo={["Sintex Mills"]} />
          </S.TopContainerLeft>
          <S.TopContainerRight>
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
            />
          </S.TopContainerRight>
        </S.TopContainer>

        <S.LowerContainer>
          <LabelCustomInputContainer
            InputId="gst_number"
            labelName="GST Number"
            className="edit__profile"
            inputPlaceholder=""
            inputPlaceHolderColor=""
            id="gst_number"
            bgColor="#F4F8F9"
          />

          <LabelCustomInputContainer
            InputId="company_name"
            labelName="Company Name"
            className="edit__profile"
            inputPlaceholder=""
            inputPlaceHolderColor=""
            id="company_name"
            bgColor="white"
          />
          <LabelCustomInputContainer
            InputId="pan_number"
            labelName="Pan Number"
            className="edit__profile"
            inputPlaceholder=""
            inputPlaceHolderColor=""
            id="pan_number"
            bgColor="#F4F8F9"
          />
          <LabelCustomInputContainer
            InputId="city_state_country_name"
            labelName="City, State, & Country"
            className="edit__profile"
            inputPlaceholder=""
            inputPlaceHolderColor=""
            id="city_state_country_name"
            bgColor=""
          />
          <LabelAndCheckBoxContainer
            labelName="Trader"
            checkboxName={[
              "Trader",
              "Yarn Manufacturer",
              "Broker",
              "Mill",
              "Others",
            ]}
            className="edit-popup"
          />
        </S.LowerContainer>
      </S.Container>
      <SaveChangesBtn />
    </>
  );
};
CompanyProfileEdit.displayName = "CompanyProfileEdit";
export default CompanyProfileEdit;
