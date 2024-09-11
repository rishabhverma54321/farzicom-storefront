import React from "react";
import Media from "react-responsive";
import { Gap } from "@components/atoms/Gap/styled";
import { CachedImage } from "@components/molecules/CachedImage";
import { largeScreen } from "@styles/constants";

import image1 from "images/instagram/1.png";
import image2 from "images/instagram/2.png";
import image3 from "images/instagram/3.png";
import image4 from "images/instagram/4.png";
import image5 from "images/instagram/5.png";
import image6 from "images/instagram/6.png";
import image7 from "images/instagram/7.png";
import image8 from "images/instagram/8.png";
import image9 from "images/instagram/9.png";
import image10 from "images/instagram/10.png";
import image11 from "images/instagram/11.png";
import image12 from "images/instagram/12.png";
import image13 from "images/instagram/13.png";
import image14 from "images/instagram/14.png";
import image15 from "images/instagram/15.png";

import * as S from "./InstagramShowcase.styled";
import IkkaiInstagramIcon from "./instagram-ikkai.png";

export interface IInstagramShowcaseProps {}

export const InstagramShowcase: React.FC<IInstagramShowcaseProps> = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
  ];

  const url = "https://www.instagram.com/ikkai.beauty";

  return (
    <>
      <S.Wrapper>
        <S.Heading>Find Our Post On Instagram</S.Heading>
        <S.SubHeading>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <S.InstaIndicator>
              <S.InstaImage src={IkkaiInstagramIcon} alt="" />
              <S.InstaText>@ikkai.beauty</S.InstaText>
            </S.InstaIndicator>
          </a>
        </S.SubHeading>
        <Gap size="1rem" customSize={{ breakpoint: "1400px", size: "2rem" }} />

        <Media minWidth={largeScreen}>
          <S.ImagesWrapper>
            {images.map(image => (
              <S.Image key={image}>
                <CachedImage url={image} isStaticImage />
              </S.Image>
            ))}
          </S.ImagesWrapper>
        </Media>

        <Media maxWidth={largeScreen - 1}>
          <S.ImagesWrapper>
            {images.slice(0, 9).map(image => (
              <S.Image key={image}>
                <CachedImage url={image} isStaticImage />
              </S.Image>
            ))}
          </S.ImagesWrapper>
        </Media>
      </S.Wrapper>
    </>
  );
};

InstagramShowcase.displayName = "InstagramShowcase";
export default InstagramShowcase;
