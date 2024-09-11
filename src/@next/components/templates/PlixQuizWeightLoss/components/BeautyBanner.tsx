import React from "react";
import style from "../scss/index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";

export interface IBeautyBanner {
    enable: boolean;
    text: string;
    mob_image: string;
    desk_image: string;
}

const BeautyBanner = ({ data }: { data: IBeautyBanner }) => {
    return (
        <div className={`${style.newContainer} ${style.beautyBanner}`}>
            {
                data?.mob_image ?
                    <div className={`${style.beautyBannerImageContainer} ${style.beautyBannerSection_mob}`}>
                        <CachedImage
                            url={data?.mob_image}
                            alt={data?.text}
                            isNextImage
                            nextImageLayout="fill"
                        />
                    </div> : <></>
            }
            {
                data?.desk_image ?
                    <div className={`${style.beautyBannerImageContainer} ${style.beautyBannerSection_desk}`}>
                        <CachedImage
                            url={data?.desk_image}
                            alt={data?.text}
                            isNextImage
                            nextImageLayout="fill"
                        />
                    </div> : <></>
            }
        </div >
    );
};

export default BeautyBanner;
