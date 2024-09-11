import React from "react";
import style from "../scss/index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";
import Marquee from "react-fast-marquee";

export interface IBrandLogosInfo {
  enable: boolean;
  logos: Array<string>;
}

const BrandLogos = ({ BrandLogo }: { BrandLogo: IBrandLogosInfo }) => {
  return (
    <div className={style.brandlogo}>
      <Marquee speed={40}>
        {Array.isArray(BrandLogo?.logos) && BrandLogo?.logos?.length ? (
          BrandLogo?.logos?.map((img, index) => {
            return (
              <div
                className={`brandLogosSection__second__img__container ${style.brandlogo_img}`}
                key={index}
              >
                <CachedImage
                  key={index + 1}
                  url={img}
                  alt={`Artboard ${index + 1}`}
                  isNextImage
                  nextImageLayout="fill"
                  nextImageObjectFit="contain"
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </Marquee>
    </div>
  );
};

export default BrandLogos;
