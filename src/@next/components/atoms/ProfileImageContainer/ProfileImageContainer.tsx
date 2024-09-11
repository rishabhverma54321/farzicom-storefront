import React from "react";
import * as S from "./style";

export interface IProfileImageContainerProps {
  profileImg?: any;
  className?: string;
  data?: any;
  firstName?: any;
  lastName?: any;
  companyName?: any;
}

export const ProfileImageContainer: React.FC<IProfileImageContainerProps> = ({
  profileImg,
  className,
  data,
  firstName,
  lastName,
  companyName,
}) => {
  const firstInitial = firstName?.charAt(0).toUpperCase();
  const lastInitial = lastName?.charAt(0).toUpperCase();

  return (
    <S.Container className={className}>
      <S.PrimaryImg className={`${className}__primary-img`}>
        {className === "personal" ? (
          `${firstInitial}${lastInitial}`
        ) : profileImg ? (
          <img src={profileImg} alt="company-img" />
        ) : (
          `${companyName[0].substring(0, 1)}`
        )}
      </S.PrimaryImg>
      {className === "personal" && profileImg && (
        <S.SecondaryImg src={profileImg} />
      )}
    </S.Container>
  );
};
ProfileImageContainer.displayName = "ProfileImageContainer";
export default ProfileImageContainer;
