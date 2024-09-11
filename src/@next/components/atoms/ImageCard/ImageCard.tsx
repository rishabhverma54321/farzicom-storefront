import React from "react";
import * as S from "./style";
import { CLIENT } from "Themes/config";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";

export interface IImageCardProps {
  src: string;
  title: string;
  description: string;
  className?: string;
}

export const ImageCard: React.FC<IImageCardProps> = ({
  src,
  title,
  description,
  className,
}) => {
  return (
    <>
      {CLIENT === clients.PLIXLIFEFC || CLIENT === clients.BODY_FIRST ? (
        <S.Container className={`${className}`}>
          {src && <S.Img src={src} className={`${className}__image`} />}
          <div>
            {title && (
              <S.Title className={`${className}__title`}> {title} </S.Title>
            )}
            <S.Description className={`${className}__description`}>
              {description}
            </S.Description>
          </div>
        </S.Container>
      ) : (
        <S.Container className={`${className}`}>
          {src && <S.Img src={src} className={`${className}__image`} />}
          {title && (
            <S.Title className={`${className}__title`}> {title} </S.Title>
          )}
          <S.Description className={`${className}__description`}>
            {description}
          </S.Description>
        </S.Container>
      )}
    </>
  );
};
ImageCard.displayName = "ImageCard";
export default ImageCard;
