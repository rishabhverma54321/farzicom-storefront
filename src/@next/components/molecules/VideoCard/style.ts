import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 100%;
  margin: 10px 0;
`;

export const content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
export const atag = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
`;
export const Video = styled.iframe<{ isPlayed?: boolean }>`
  /* display: ${props => (props.isPlayed ? "block" : "none")}; */
  width: 100%;
 
  aspect-ratio: 7/4;
`;

export const Thumbnail = styled.img<{ isPlayed: boolean }>`
// opacity: ${props => (props.isPlayed ? 0 : 1)}
// position:  ${props => (props.isPlayed ? "absolute" : "relative")}
display: ${props => (props.isPlayed ? "none" : "block")};

width: 100%;
height: 60vh;

${media.smallScreen`
height: 35vh;
object-fit: cover;
border-radius: 8px;
`}
`;

export const CardInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  text-transform: capitalize;
  margin-bottom: 10px;

  ${media.mediumScreen`
    margin-bottom:5px;
  `}
`;

export const Title = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: #282c3f;
  line-height: 20px;
  width: 100%;
  padding-top: 12px;

  ${media.mediumScreen`
    padding-top: 4px;
  `}
`;

export const DescriptionContainer = styled.div``;

export const Description = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-align: center;

  /* padding: 10px 0; */
`;
