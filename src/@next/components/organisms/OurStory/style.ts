import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Div = styled.div<{}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 30px 30px 30px;
  ${media.mediumScreen`
    padding: 0 10px;
  `}
  ${media.mediumScreen`
  padding: 0;
`}
`;
export const ImgDiv = styled.div<{}>`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Img = styled.img<{}>`
  width: 100%;
`;
export const TextDiv = styled.div<{}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58%;
  ${media.largeScreen`
    width: 100%;
  `}
  ${media.mediumScreen`
    width: 100%;
  `}
  ${media.smallScreen`
  width: 100%;
`}
`;
export const P = styled.p<{}>`
  padding: 20px 30px;
  width: 100%;
  text-align: center;
`;
