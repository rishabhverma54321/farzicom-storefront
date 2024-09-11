import React, { useState } from "react";
import { CustomizeButton } from "@components/atoms/CustomizeButton";
import MyCustomLink from "@components/next-react/MyCustomLink";

import * as S from "./style";

export interface Data {
  video?: string;
  thumbnail?: string;
  title?: string | React.ReactNode;
  navigation?: string;
  description?: string | React.ReactNode;
  button?: {
    text: string;
    link: string;
    leftIcon?: string;
    rightIcon?: string;
  };
}
export interface IVideoCardProps {
  content: Data;
  cardClass: string;
}

export const VideoCard: React.FC<IVideoCardProps> = ({
  content,
  cardClass,
}) => {
  return (
    <>
      <S.Card className={cardClass}>
        {content?.video && content?.thumbnail && content?.thumbnail !== "" ? (
          <S.VideoContainer className={`${cardClass}__image`}>
            <S.Video
              className="youtube-video-iframe"
              src={content.video}
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </S.VideoContainer>
        ) : (
          <S.VideoContainer className={`${cardClass}__image`}>
            <S.Video
              className={`youtube-video-iframe ${cardClass}__image__videoblock`}
              src={content.video}
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </S.VideoContainer>
        )}

        {content.title && (
          <S.CardInfo className={`${cardClass}__title`}>
            <MyCustomLink href={content.navigation || "/"}>
              {typeof content.title === "string" ? (
                <S.Title>{content.title}</S.Title>
              ) : (
                content.title
              )}
            </MyCustomLink>
          </S.CardInfo>
        )}
        {content.description && (
          <S.DescriptionContainer className={`${cardClass}__description`}>
            {typeof content.description === "string" ? (
              <S.Description>{content.description}</S.Description>
            ) : (
              content.description
            )}
          </S.DescriptionContainer>
        )}

        {content.button && (
          <CustomizeButton
            text={content.button.text}
            leftIcon={content.button.leftIcon}
            rightIcon={content.button.rightIcon}
            link={content.navigation || "/"}
            buttonClass={`${cardClass}__button`}
          />
        )}
      </S.Card>
    </>
  );
};
VideoCard.displayName = "VideoCard";
export default VideoCard;
