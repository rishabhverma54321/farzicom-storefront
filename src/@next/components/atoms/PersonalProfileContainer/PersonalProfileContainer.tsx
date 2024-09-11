// import ProfileComanySVG from "images/profileSvg/ProfileComanySVG";
import ProfileInfoIcon from "images/profileSvg/ProfileInfoIcon";
// import ProfilePersonalSVG from "images/profileSvg/ProfilePersonalSVG";
import SupportWhatsappIcon from "images/profileSvg/SupportWhatsappIcon";
import UserTickIcon from "images/profileSvg/UserTickIcon";
import React from "react";
import RightArraow from "images/profileSvg/RightArraow";
import { useAuth, useAuthState } from "@saleor/sdk";
import VerifiedProfileSVG from "images/profileSvg/VerifiedProfileSVG";
import BuildingSVG from "images/profileSvg/BuildingSVG";
import { calcProgForProfile } from "@app/pages/YarzbazarPage/utils/misc";
import { LoaderScreen } from "@app/pages/YarzbazarPage/SupplierDispatch/styles";
import TextIcon from "../TextIcon/TextIcon";
import ProfileInfoWrapper from "../ProfileInfoWrapper/ProfileInfoWrapper";
import ProfileSectionHead from "../ProfileSectionHead/ProfileSectionHead";
import SliderAndInfoWrapper from "../SliderAndInfoWrapper/SliderAndInfoWrapper";
import TestComponent from "../TestComponent/TestComponent";
import * as S from "./style";
import TypeContainer from "../TypeContainer/TypeContainer";
import { TypedPersonalProfileInfoQuery } from "./queries";
import IconInfoContainer from "../IconInfoContainer/IconInfoContainer";
import { Loader } from "..";
import { useCustomLocation } from "@hooks/useCustomLocation";
// import { media } from "@styles/media";
// import { userInbafo } from "os";

export interface IPersonalProfileContainerProps {}
export const PersonalProfileContainer: React.FC<IPersonalProfileContainerProps> = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthState();
  const location = useCustomLocation();
  const userID = location?.state?.id ? location.state.id : user?.id;
  const contactNumber = localStorage.getItem("phoneNumber");
  const redirectToWhatsapp = () => {
    window.open(
      `https://web.whatsapp.com/send?phone=91${contactNumber}`,
      "_blank"
    );
  };
  // const modalClose = () => {
  //   setIsModalOpen(false);
  // };
  // const modalOpen = () => {
  //   setIsModalOpen(true);
  // };
  return (
    <TypedPersonalProfileInfoQuery variables={{ userId: userID }}>
      {({ data, loading }) => {
        if (loading) {
          return (
            <LoaderScreen>
              <Loader />
            </LoaderScreen>
          );
        }
        const item = data?.userMeta?.edges[0]?.node;
        if (!location?.state?.id) {
          localStorage.setItem("userMeta", JSON.stringify(item));
        }
        const itemInfo = {
          companyName: item?.company?.companyName,
          companyAvatar: item?.company?.avatar?.url,
          departmentName: item?.department,
          designation: item?.designation,
          access: item?.access,
          categories: item?.categories?.edges,
          isVerified: item?.isVerified,
          firstName: item?.user?.firstName,
          lastName: item?.user?.lastName,
          email: item?.user?.email,
          avatar: item?.user?.avatar,
          phoneNumber: item?.phone || "",
        };
        const splitAccess = (accessData: any) => {
          const result: any = accessData ? accessData?.split("_") : "";
          let finalResult = "";
          for (let i = 1; i < result?.length; i++) {
            finalResult = `${finalResult}${result[i]} `;
          }
          return finalResult.toLocaleLowerCase();
        };
        const rangeVal = calcProgForProfile(itemInfo);
        const progressBarVal = (rangeVal.points / rangeVal.total) * 100;
        return (
          <>
            {/* {isModalOpen && (
              <EditContainerWrapper
                title="this is edit page"
                display={isModalOpen}
                modalClose={modalClose}
              >
                <PersonalProfileEdit />
              </EditContainerWrapper>
            )} */}
            <S.Container>
              <S.HeaderContainerProfile>
                <S.HeaderLeftContainer>Personal Profile</S.HeaderLeftContainer>
                <S.HeaderRightContainer>
                  {itemInfo?.isVerified === false ? (
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
              {itemInfo.isVerified === false ? (
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
                  userProfileInfo={[
                    `${itemInfo?.firstName} ${itemInfo?.lastName}`,
                    `${itemInfo.phoneNumber}`,
                    `${itemInfo?.departmentName} | ${itemInfo?.designation}`,
                  ]}
                  data={itemInfo}
                  className="personal"
                  ProfileImg={itemInfo?.companyAvatar}
                />
              ) : (
                <ProfileSectionHead
                  bgColor="#f4f8f9"
                  infoArray={[
                    <SliderAndInfoWrapper
                      sliderBgColor="#33A532"
                      sliderRangeSetter={progressBarVal}
                      infoIcon={<UserTickIcon />}
                      infoInnerTitle="Your Profile is complete! You can now carry out actions like Posting requirements, Payments and Managing orders and dispatches."
                      rightContainerContent={[]}
                      infoBgColor="#f4f8f9"
                      fontSizeSvg={1.1}
                      fontSizeTitle={0.6}
                      titleColor="#616161"
                    />,
                  ]}
                  userProfileInfo={[
                    `${user?.firstName} ${user?.lastName}`,
                    `+91 ${phoneNumber}`,
                    `${itemInfo?.departmentName} | ${itemInfo?.designation}`,
                  ]}
                  className="personal"
                  ProfileImg={itemInfo?.companyAvatar}
                />
              )}
              <S.HeaderContainerProfile className="mob-display">
                <S.HeaderLeftContainer>Personal Profile</S.HeaderLeftContainer>
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

              <S.LowerInnerContainer>
                <ProfileInfoWrapper
                  profileInfoComponents={[
                    <TestComponent
                      svgSrc={<></>}
                      innerTitle="First Name"
                      rightContainerContent={[`${itemInfo?.firstName}`]}
                      bgColor="#f4f8f9"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                    />,

                    <TestComponent
                      svgSrc={<></>}
                      innerTitle="Last Name"
                      rightContainerContent={[`${itemInfo?.lastName}`]}
                      bgColor="#ffffff"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                    />,

                    <TestComponent
                      svgSrc={<></>}
                      innerTitle="Phone"
                      rightContainerContent={[`${itemInfo?.phoneNumber}`]}
                      bgColor="#f4f8f9"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                    />,

                    <TestComponent
                      svgSrc={<></>}
                      innerTitle="Email"
                      rightContainerContent={[
                        `${itemInfo?.email}`,
                        <ProfileInfoIcon />,
                      ]}
                      bgColor="#ffffff"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                    />,

                    <TestComponent
                      svgSrc={<></>}
                      innerTitle="Company"
                      rightContainerContent={[
                        itemInfo?.companyName,
                        <ProfileInfoIcon />,
                      ]}
                      bgColor="#f4f8f9"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                    />,

                    <TestComponent
                      svgSrc={<></>}
                      innerTitle="Department"
                      rightContainerContent={[
                        itemInfo?.departmentName,
                        <ProfileInfoIcon />,
                      ]}
                      bgColor="#ffffff"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                    />,

                    <TestComponent
                      svgSrc={<></>}
                      innerTitle="Designation"
                      rightContainerContent={[
                        itemInfo?.designation,
                        <ProfileInfoIcon />,
                      ]}
                      bgColor="#f4f8f9"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                    />,

                    <TestComponent
                      svgSrc={<></>}
                      innerTitle="Access"
                      rightContainerContent={[
                        `${splitAccess(itemInfo?.access)}`,
                      ]}
                      bgColor="#ffffff"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                    />,
                    <TestComponent
                      svgSrc={<></>}
                      innerTitle={
                        <TypeContainer
                          categoryTitile="Yarn Categories"
                          typeCategory={itemInfo?.categories}
                          profileType="company"
                        />
                      }
                      rightContainerContent={[<RightArraow />]}
                      bgColor="#f4f8f9"
                      titleColor="#9F9F9F"
                      fontSizeTitle={1}
                      fontSizeSvg={1.1}
                      className="categories-content"
                    />,
                  ]}
                />
              </S.LowerInnerContainer>
              <S.EditSupportContainer>
                {/* <div className="profile__edit" onClick={modalOpen}>
                  <TextIcon
                    text="Edit"
                    icon={<EditProfileIconSVG />}
                    textColor="#005BC2"
                    ClassName="edit-btn"
                    link=""
                  />
                </div> */}
                <div onClick={redirectToWhatsapp}>
                  <TextIcon
                    text="Support"
                    icon={<SupportWhatsappIcon />}
                    textColor="#33A532"
                    ClassName="whatsapp-btn"
                    link=""
                  />
                </div>
              </S.EditSupportContainer>
            </S.Container>
          </>
        );
      }}
    </TypedPersonalProfileInfoQuery>
  );
};
PersonalProfileContainer.displayName = "PersonalProfileContainer";
export default PersonalProfileContainer;
