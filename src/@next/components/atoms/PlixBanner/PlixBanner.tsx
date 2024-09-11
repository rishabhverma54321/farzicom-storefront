import { CachedImage } from "@components/molecules/CachedImage";
import { smallScreen } from "@styles/constants";
import React from "react";
import Media from "react-media";
import * as S from "./style";

interface BannerData {
  label: string;
  link?: string;
  imgUrl?: string;
  mobileImgUrl?: string;
  imgAlt: string;
}

export interface IPlixBannerProps {
  content: BannerData;
}

export const PlixBanner: React.FC<IPlixBannerProps> = ({ content }) => {
  return (
    <S.Wrapper>
      <S.DesktopImage>
        <CachedImage
          url={content?.imgUrl}
          imgixProps={{ imgixParams: { sharp: 0 } }}
          imgixSizes="50vw"
          alt={content.imgAlt}
        />
      </S.DesktopImage>
      <S.MobileImage>
        <CachedImage url={content?.mobileImgUrl} alt={content.imgAlt} />
      </S.MobileImage>
    </S.Wrapper>
  );
};
PlixBanner.displayName = "PlixBanner";
export default PlixBanner;
