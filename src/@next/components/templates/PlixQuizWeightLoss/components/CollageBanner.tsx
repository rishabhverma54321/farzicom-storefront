import React from "react";
import style from "../scss/index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";

export interface ICollageBanner {
    enable: boolean;
    text: string;
    top: {
        head: string;
        subHead: string;
    }
    mob_image: string;
    desk_image: string;
}

const CollageBanner = ({ data, pageConfig }: { data: ICollageBanner; pageConfig?:any }) => {
    return (
        <div className={`${style.newContainer} ${style.beautyBanner}`} style={{ marginBottom: "2rem" }}>
            <div>
                <div style={{color: `${pageConfig?.headingColor || ""}`}} className={style.beautyBannerHead}>{data?.top?.head}</div>
                <div className={style.beautyBannerSubHead}>{data?.top?.subHead}</div>
                {
                    data?.mob_image ?
                        <div className={`${style.beautyBannerImageContainer} ${style.beautyBannerSection_mob}`}>
                            <CachedImage
                                url={data?.mob_image}
                                alt={data?.text}
                                isNextImage
                                nextImageLayout="fill"
                            />
                        </div>
                        : <></>
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
            </div>
        </div>
    );
};

export default CollageBanner;
