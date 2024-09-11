import React, { ReactNode } from "react";
import { redirectToWhatsapp } from "../../../pages/YarzbazarPage/utils/misc";
import * as S from "./style";

export interface IIconInfoContainerProps {
  iconSVG: ReactNode;
  content: string;
  iconClass?: string;
  hasOnClick?: boolean;
}

export const IconInfoContainer: React.FC<IIconInfoContainerProps> = ({
  iconSVG,
  content,
  iconClass,
  hasOnClick,
}) => {
  return (
    <>
      {hasOnClick ? (
        <S.Container
          className={`${iconClass}__icon`}
          onClick={e => redirectToWhatsapp()}
        >
          {iconSVG}
          <S.ContentContainer className={`${iconClass}__text`}>
            {content}
          </S.ContentContainer>
        </S.Container>
      ) : (
        <S.Container className={`${iconClass}__icon`}>
          {iconSVG}
          <S.ContentContainer className={`${iconClass}__text`}>
            {content}
          </S.ContentContainer>
        </S.Container>
      )}
    </>
  );
};
IconInfoContainer.displayName = "IconInfoContainer";
export default IconInfoContainer;
