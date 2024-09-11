import { styled } from "@styles/themes";

export const YoutubeVideoPlayerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    float: right;
    cursor: pointer;
  }
`;

export const Wrapper = styled.div`
  width: 640px;
  margin: auto;
  background: white;
  padding: 0px;
  margin-top: 5%;
  height: 100%;
  max-width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
`;
