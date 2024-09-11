import React, { useState } from "react";
import ProfileInfoIcon from "images/profileSvg/ProfileInfoIcon";
import VerifiedProfileSVG from "images/profileSvg/VerifiedProfileSVG";
import BuildingSVG from "images/profileSvg/BuildingSVG";
// import ProfileComanySVG from "images/profileSvg/ProfileComanySVG";
import AddressGrid from "@components/containers/AddressGrid";

// import { getMetadataValue } from "@utils/misc";
import { calcProgForCompany } from "@app/pages/YarzbazarPage/utils/misc";
import { getMetadataValue } from "@utils/misc";
import * as S from "./style";
import ProfileSectionHead from "../ProfileSectionHead/ProfileSectionHead";
import BasicInfoCompanyProfile from "../BasicInfoCompanyProfile/BasicInfoCompanyProfile";
import SliderAndInfoWrapper from "../SliderAndInfoWrapper/SliderAndInfoWrapper";
import PaymentsOptionCompanyProfile from "../PaymentsOptionCompanyProfile/PaymentsOptionCompanyProfile";
import IconInfoContainer from "../IconInfoContainer";
import { TypedcompanyProfileInfoQuery } from "./queries";
// import { Address } from "..";

export interface ICompanyProfileContainerProps {}

export const CompanyProfileContainer: React.FC<ICompanyProfileContainerProps> = () => {
  const [count, setCount] = useState(0);

  const data: any = localStorage.getItem("userMeta");
  const userDetail = JSON.parse(data);
  const companyImg = userDetail?.company?.avatar?.url;
  //
  const checkCount = (userInfo: any) => {
    switch (count) {
      case 0:
        return (
          <BasicInfoCompanyProfile
            website="sintex.com"
            websiteUrl=""
            userInfo={userInfo}
          />
        );
      case 1:
        return <AddressGrid userInfo={userInfo} />;

      case 2:
        return (
          <S.PaymentsOptionCompanyProfileContainer>
            <PaymentsOptionCompanyProfile
              billingTitle="Billing info"
              userInfo={userInfo}
            />
            {/* <PaymentsOptionCompanyProfile
              billingTitle="Billing info 2"
              userInfo={userInfo}
            /> */}
          </S.PaymentsOptionCompanyProfileContainer>
        );

      default:
        return (
          <BasicInfoCompanyProfile
            website="sintex.com"
            websiteUrl=""
            userInfo={userInfo}
          />
        );
    }
  };

  return (
    <TypedcompanyProfileInfoQuery variables={{ id: userDetail?.company?.id }}>
      {({ data, loading }) => {
        const item = data?.company?.edges[0];
        const itemInfo = {
          id: item?.node?.id,
          companyName: item?.node?.companyName,
          gstNumber: item?.node?.gstNumber,
          panNumber: item?.node?.panNumber,
          noOfSpindles: item?.node?.noOfSpindles,
          status: item?.node?.status,
          avatar: item?.node?.avatar,
          isVerified: item?.node?.isVerified,
          created: item?.node?.created,
          categories: item?.node?.categories.edges,
          companyType: item?.node?.companyType.edges,
          shippingAddress: item?.node?.shippingAddress?.edges,
          defaultShippingAddress: item?.node.defaultShippingAddress,
          defaultBillingAddress: item?.node?.defaultBillingAddress,
          metadata: item?.node?.metadata,
          paymentInfo: "",
        };
        let paymentInformation =
          getMetadataValue(itemInfo?.metadata, "paymentInformation") &&
          JSON.parse(
            getMetadataValue(itemInfo?.metadata, "paymentInformation")
          );
        paymentInformation = paymentInformation || "";
        itemInfo.paymentInfo = paymentInformation;
        const rangeVal = calcProgForCompany(itemInfo);
        const progressBarVal = (rangeVal.points / rangeVal.total) * 100;
        return (
          <S.Container>
            <S.HeaderContainerProfile>
              <S.HeaderLeftContainer>Company Profile</S.HeaderLeftContainer>
              <S.HeaderRightContainer>
                {itemInfo.isVerified === false ? (
                  <IconInfoContainer
                    iconSVG={<ProfileInfoIcon />}
                    content="Pending Verification"
                    iconClass="pending-verfication"
                  />
                ) : (
                  <IconInfoContainer
                    iconSVG={<VerifiedProfileSVG />}
                    content="Verified"
                    iconClass="profile-verfied"
                  />
                )}
              </S.HeaderRightContainer>
            </S.HeaderContainerProfile>
            <ProfileSectionHead
              bgColor="#F4F8F9"
              infoArray={[
                <SliderAndInfoWrapper
                  sliderBgColor="#005BC2"
                  sliderRangeSetter={progressBarVal}
                  infoIcon={<BuildingSVG />}
                  infoInnerTitle="Your Company profile is incomplete, To carry out any transactions you will need a complete profile"
                  rightContainerContent={[]}
                  infoBgColor=""
                  fontSizeSvg={1.1}
                  fontSizeTitle={0.6}
                  titleColor="#616161"
                />,
              ]}
              className="company"
              userProfileInfo={[itemInfo?.companyName]}
              ProfileImg={companyImg}
            />
            <S.MiddleOptionsContainer>
              <S.Option
                active={count === 0 ? "active" : ""}
                className="optn-1"
                onClick={() => setCount(0)}
              >
                <S.OptionHeader>Basic Info</S.OptionHeader>
                <S.MobileViewHandler>
                  <IconInfoContainer
                    iconSVG={<VerifiedProfileSVG />}
                    content="Verified"
                    iconClass="profile-verfied"
                  />
                </S.MobileViewHandler>
              </S.Option>

              <S.Option
                active={count === 1 ? "active" : ""}
                className="optn-2"
                onClick={() => setCount(1)}
              >
                <S.OptionHeader> Addresses</S.OptionHeader>
              </S.Option>

              <S.Option
                active={count === 2 ? "active" : ""}
                className="optn-1"
                onClick={() => setCount(2)}
              >
                <S.OptionHeader>Payments</S.OptionHeader>
                {/* <ProfileInfoIcon /> */}
              </S.Option>
            </S.MiddleOptionsContainer>

            <S.LowerInnerContainer>
              {checkCount(itemInfo)}
            </S.LowerInnerContainer>
          </S.Container>
        );
      }}
    </TypedcompanyProfileInfoQuery>
  );
};
CompanyProfileContainer.displayName = "CompanyProfileContainer";
export default CompanyProfileContainer;
