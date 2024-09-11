import React, { ReactNode } from "react";
import * as S from "./styles";

export interface IProfileInfoWrapperProps {
  profileInfoComponents: Array<ReactNode>;
}

export const ProfileInfoWrapper: React.FC<IProfileInfoWrapperProps> = ({
  profileInfoComponents,
}) => {
  return (
    <S.Container>
      {profileInfoComponents.map((content, idx) => {
        return <div key={idx}>{content}</div>;
      })}
    </S.Container>
  );
};
ProfileInfoWrapper.displayName = "ProfileInfoWrapper";
export default ProfileInfoWrapper;
