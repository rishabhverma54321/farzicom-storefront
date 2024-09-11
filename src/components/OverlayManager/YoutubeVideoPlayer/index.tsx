import { IconButton } from "@components/atoms/IconButton";
import React from "react";
// import CloseIcon from "@material-ui/icons/Close";
import { Overlay, OverlayContextInterface } from "../..";
import * as S from "./style";

export interface IProps {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const YoutubeVideoPlayer: React.FC<IProps> = ({ testingContext, overlay }) => {
  const {
    hide,
    context: { data },
  } = overlay;

  return (
    <Overlay testingContext={testingContext} context={overlay}>
      <S.Wrapper>
        <S.YoutubeVideoPlayerContainer>
          {/* <CloseIcon onClick={hide} /> */}
          <IconButton
            name="x"
            size={16}
            testingContext="closeModal"
            onClick={hide}
          />

          {/* <ReactPlayer url={data.url} /> */}
          <iframe
            className="youtube-iframe"
            width="560"
            height="315"
            src={data.url}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </S.YoutubeVideoPlayerContainer>
      </S.Wrapper>
    </Overlay>
  );
};

export default YoutubeVideoPlayer;
