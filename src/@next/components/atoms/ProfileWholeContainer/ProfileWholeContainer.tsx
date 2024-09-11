import React from "react";
import PersonalProfileContainer from "../PersonalProfileContainer/PersonalProfileContainer";
import * as S from "./style";

export interface IProfileWholeContainerProps {}

export const ProfileWholeContainer: React.FC<IProfileWholeContainerProps> = () => {
  return (
    <S.Container>
      {/* <ProfileContainerWrapper /> */}
      <PersonalProfileContainer />
    </S.Container>
  );
};
ProfileWholeContainer.displayName = "ProfileWholeContainer";
export default ProfileWholeContainer;
