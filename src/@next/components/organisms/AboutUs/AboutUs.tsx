import React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import desktopImage from "images/about-us/about-us-d.png";

import mx1 from "images/about-us/m-about-us-1x.png";
import mx1_5 from "images/about-us/m-about-us-1_5x.png";
import mx2 from "images/about-us/m-about-us-2x.png";

import { largeScreen } from "@styles/constants";
import * as S from "./style";

export interface IAboutUsProps {}

export const AboutUs: React.FC<IAboutUsProps> = () => {
  return (
    <>
      <S.AboutUsContainer>
        <MyCustomLink href="/page/about-us/">
          <picture>
            <source
              media={`(max-width: ${largeScreen - 1}px)`}
              srcSet={`
                ${mx2},
                ${mx1} 1.5x,
                ${mx1_5} 2x,
              `}
            />
            <source
              media={`(min-width: ${largeScreen})px`}
              srcSet={`
                ${desktopImage}
              `}
            />
            <img src={desktopImage} alt="Read about us" />
          </picture>
        </MyCustomLink>
      </S.AboutUsContainer>
    </>
  );
};

AboutUs.displayName = "AboutUs";
export default AboutUs;
