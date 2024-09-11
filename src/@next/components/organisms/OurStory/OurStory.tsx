import React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import ourStoryImg from "images/our-story.png";
// import { MetaWrapper } from "@temp/components";
import * as S from "./style";

export interface IOurStoryProps {
  // image: string,
  text: string;
}

export const OurStory: React.FC<IOurStoryProps> = ({ text }) => {
  return (
    <>
      <S.Div>
        <S.ImgDiv>
          <MyCustomLink href="/page/our-story">
            <S.Img src={ourStoryImg} />
          </MyCustomLink>
        </S.ImgDiv>
        <S.TextDiv>
          <S.P>{text}</S.P>
        </S.TextDiv>
      </S.Div>
    </>
  );
};

OurStory.displayName = "OurStory";
export default OurStory;
