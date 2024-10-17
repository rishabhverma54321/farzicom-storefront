import { CachedImage } from "@components/molecules/CachedImage";
import { smallScreen } from "@styles/constants";
import React from "react";
import Media from "react-media";
import * as S from "./style";
import style from "./scss/index.module.scss"

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
    <div className={style.Wrapper}>
      <div className={style.desktopImage}>
        <CachedImage
          url={content?.imgUrl}
          imgixProps={{ imgixParams: { sharp: 0 } }}
          imgixSizes="50vw"
          alt={content.imgAlt}
        />
      </div>
      <div className={style.mobileImage}>
        <CachedImage url={content?.mobileImgUrl} alt={content.imgAlt} />
      </div>
    </div>
  );
};
PlixBanner.displayName = "PlixBanner";
export default PlixBanner;
