import React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import GreenTickProfile from "images/profileSvg/GreenTickProfile";
import LeftArrowSVG from "images/profileSvg/LeftArrowSVG";
import CompanyProfileEdit from "../CompanyProfileEdit/CompanyProfileEdit";
import IconInfoContainer from "../IconInfoContainer/IconInfoContainer";
import PersonalProfileEdit from "../PersonalProfileEdit/PersonalProfileEdit";
import * as S from "./style";
// company info edit

export interface IEditInfoContainerProps {
  titleContent: string;
  link: string;
  popupTitle: string;
}

export const EditInfoContainer: React.FC<IEditInfoContainerProps> = ({
  titleContent,
  link,
  popupTitle,
}) => {
  return (
    <S.Container>
      <S.HeadingContainer>
        <MyCustomLink href={link}>
          <LeftArrowSVG />
        </MyCustomLink>
        <S.Heading>{titleContent}</S.Heading>
      </S.HeadingContainer>
      <S.LowerContainer>
        <S.LowerContainerHeader>
          {popupTitle === "company" ? (
            <CompanyProfileEdit />
          ) : (
            <PersonalProfileEdit />
          )}
        </S.LowerContainerHeader>
      </S.LowerContainer>
      <S.SaveChangesContainer>
        <IconInfoContainer
          iconSVG={<GreenTickProfile />}
          content="Save Changes"
        />
      </S.SaveChangesContainer>
    </S.Container>
  );
};
EditInfoContainer.displayName = "EditInfoContainer";
export default EditInfoContainer;
