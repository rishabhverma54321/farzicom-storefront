import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const YoutubeContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;
export const MainImg = styled.img`
  width: 80%;

  ${media.smallScreen`
    width: 100%;
  `}
`;
export const PlayImg = styled.img`
  position: absolute;
  top: 40%;
  right: 40%;
`;
