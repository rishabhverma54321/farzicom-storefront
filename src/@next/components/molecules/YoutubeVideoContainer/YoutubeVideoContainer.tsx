import React, { useContext } from "react";
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components/Overlay";
import PlayIcon from "images/playIcon.png";
import * as S from "./styles";

export interface IYoutubeVideoContainerProps {
  url: string;
  mainImgSrc: string;
  setVideoWatched?: React.Dispatch<React.SetStateAction<boolean>>;
  cardClass?: string;
}

export const YoutubeVideoContainer: React.FC<IYoutubeVideoContainerProps> = ({
  url,
  mainImgSrc,
  setVideoWatched,
  cardClass,
}) => {
  const overlay = useContext(OverlayContext);
  const { show } = overlay;

  const context: InnerOverlayContextInterface = {
    data: {
      url,
    },
  };

  return (
    <>
      <S.YoutubeContainer
        className={cardClass}
        onClick={() => {
          if (setVideoWatched) setVideoWatched(true);
          show(OverlayType.youtubeVideoPlayer, OverlayTheme.modal, context);
        }}
      >
        <S.MainImg className={`${cardClass}__image`} src={mainImgSrc} />
        <S.PlayImg src={PlayIcon} />
      </S.YoutubeContainer>
    </>
  );
};
YoutubeVideoContainer.displayName = "YoutubeVideoContainer";
export default YoutubeVideoContainer;
