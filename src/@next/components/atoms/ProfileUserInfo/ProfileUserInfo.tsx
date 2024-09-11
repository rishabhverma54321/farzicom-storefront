import React from "react";
import * as S from "./style";

export interface IProfileUserInfoProps {
  userProfileInfo: Array<String>;
  classStyle?: string;
}

export const ProfileUserInfo: React.FC<IProfileUserInfoProps> = ({
  userProfileInfo,
  classStyle,
}) => {
  return (
    <S.Container className={classStyle}>
      {userProfileInfo.map((info, idx) => {
        return <p key={idx}>{info}</p>;
      })}
    </S.Container>
  );
};
ProfileUserInfo.displayName = "ProfileUserInfo";
export default ProfileUserInfo;
