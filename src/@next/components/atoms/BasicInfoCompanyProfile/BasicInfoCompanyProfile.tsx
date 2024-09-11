import RightArraow from "images/profileSvg/RightArraow";
import SupportWhatsappIcon from "images/profileSvg/SupportWhatsappIcon";
import React, { useState } from "react";
import EditProfileIconSVG from "images/profileSvg/EditProfileIconSVG";
import ProfileInfoWrapper from "../ProfileInfoWrapper/ProfileInfoWrapper";
import TestComponent from "../TestComponent/TestComponent";
import TextIcon from "../TextIcon/TextIcon";
import TypeContainer from "../TypeContainer/TypeContainer";
import * as S from "./style";
import { CompanyProfileEdit, EditContainerWrapper } from "..";

export interface IBasicInfoCompanyProfileProps {
  website: string;
  websiteUrl: string;
  userInfo: any;
}

export const BasicInfoCompanyProfile: React.FC<IBasicInfoCompanyProfileProps> = ({
  websiteUrl,
  website,
  userInfo,
}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const phoneNumber = localStorage.getItem("phoneNumber");
  const redirectToWhatsapp = () => {
    window.open(
      `https://web.whatsapp.com/send?phone=91${phoneNumber}`,
      "_blank"
    );
  };
  const { defaultShippingAddress } = userInfo;
  let city = "";
  let state = "";
  let country = "";
  if (defaultShippingAddress) {
    city = defaultShippingAddress?.city || "";
    state = defaultShippingAddress?.countryArea || "";
    country = defaultShippingAddress?.country?.country || "";
  }
  return (
    <>
      {/* {isModalOpen && (
        <EditContainerWrapper
          title="this is edit page"
          display={isModalOpen}
          modalClose={modalClose}
        >
          <CompanyProfileEdit />
        </EditContainerWrapper>
      )} */}
      <ProfileInfoWrapper
        profileInfoComponents={[
          <TestComponent
            svgSrc={<></>}
            innerTitle="GST Number"
            rightContainerContent={[userInfo?.gstNumber]}
            bgColor="#f4f8f9"
            titleColor="#9F9F9F"
            fontSizeTitle={1}
            fontSizeSvg={1.1}
          />,
          <TestComponent
            svgSrc={<></>}
            innerTitle="Company Name"
            rightContainerContent={[userInfo?.companyName]}
            bgColor="#ffffff"
            titleColor="#9F9F9F"
            fontSizeTitle={1}
            fontSizeSvg={1.1}
          />,
          <TestComponent
            svgSrc={<></>}
            innerTitle="Pan Number"
            rightContainerContent={[userInfo?.panNumber]}
            bgColor="#f4f8f9"
            titleColor="#9F9F9F"
            fontSizeTitle={1}
            fontSizeSvg={1.1}
          />,
          <TestComponent
            svgSrc={<></>}
            innerTitle="City, State & country"
            rightContainerContent={[`${city}, ${state}, ${country}`]}
            bgColor="#ffffff"
            titleColor="#9F9F9F"
            fontSizeTitle={1}
            fontSizeSvg={1.1}
          />,
          <TestComponent
            svgSrc={<></>}
            innerTitle={
              <TypeContainer
                typeCategory={userInfo?.companyType}
                categoryTitile="Company Type"
              />
            }
            rightContainerContent={[<RightArraow />]}
            bgColor="#f4f8f9"
            titleColor="#9F9F9F"
            fontSizeTitle={1}
            fontSizeSvg={1.1}
            className="categories-content"
          />,
          <TestComponent
            svgSrc={<></>}
            innerTitle={
              <TypeContainer
                typeCategory={userInfo?.categories}
                categoryTitile="yarn categories"
                profileType="company"
              />
            }
            rightContainerContent={[<RightArraow />]}
            bgColor="#ffffff"
            titleColor="#9F9F9F"
            fontSizeTitle={1}
            fontSizeSvg={1.1}
            className="categories-content"
          />,

          // <TestComponent
          //   svgSrc={<></>}
          //   innerTitle="Yarn Categories"
          //   rightContainerContent={[<RightArraow />]}
          //   bgColor="#ffffff"
          //   titleColor="#9F9F9F"
          //   fontSizeTitle={1}
          //   fontSizeSvg={1.1}
          // />,

          <TestComponent
            svgSrc={<></>}
            innerTitle="Number of Spindles"
            rightContainerContent={[`${userInfo?.noOfSpindles}`]}
            bgColor="#f4f8f9"
            titleColor="#9F9F9F"
            fontSizeTitle={1}
            fontSizeSvg={1.1}
          />,

          // <TestComponent
          //   svgSrc={<></>}
          //   innerTitle="Machinery List"
          //   rightContainerContent={["View", <RightArraow />]}
          //   bgColor="#ffffff"
          //   titleColor="#9F9F9F"
          //   fontSizeTitle={1}
          //   fontSizeSvg={1.1}
          // />,
        ]}
      />
      {/* <S.LowerContainer>
        <S.WebsiteContainer>
          Website
          <S.WebsiteLink href={websiteUrl}>{website}</S.WebsiteLink>
        </S.WebsiteContainer>
      </S.LowerContainer> */}
      <S.EditSupportContainer>
        {/* <div className="company__edit" onClick={modalOpen}>
          <TextIcon
            text="Edit"
            icon={<EditProfileIconSVG />}
            textColor="#005BC2"
          />
        </div> */}
        <div onClick={redirectToWhatsapp}>
          <TextIcon
            text="Support"
            icon={<SupportWhatsappIcon />}
            textColor="#33A532"
          />
        </div>
      </S.EditSupportContainer>
    </>
  );
};
BasicInfoCompanyProfile.displayName = "BasicInfoCompanyProfile";
export default BasicInfoCompanyProfile;
