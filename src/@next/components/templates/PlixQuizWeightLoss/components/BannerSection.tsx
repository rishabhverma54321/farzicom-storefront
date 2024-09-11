import React from "react";
import style from "../scss/index.module.scss";
import MyCustomLink from "@components/next-react/MyCustomLink";
import { CachedImage } from "@components/molecules/CachedImage";

export interface IBannerSectionInfo {
    enable: boolean;
    mob_banner: string;
    desk_banner: string;
    url: string;
}

const BannerSection = ({
    bannerSection, handleQuizEvents
}: {
    bannerSection: IBannerSectionInfo;
    handleQuizEvents: any;
}) => {
    return (
        <div className={style.banner_section}>
            {bannerSection?.mob_banner ? (
                <MyCustomLink
                    onClick={() => {
                        handleQuizEvents("Banner");
                    }}
                    href={bannerSection?.url || "/"}
                >
                    <div className={style.banner_section_mob}>
                        <CachedImage
                            url={bannerSection?.mob_banner}
                            isNextImage
                            nextImageLayout="fill"
                        />
                    </div>
                </MyCustomLink>
            ) : (
                <></>
            )}
            {bannerSection?.desk_banner ? (
                <div className={style.banner_section_desk}>
                    <MyCustomLink
                        onClick={() => {
                            handleQuizEvents("Banner");
                        }}
                        href={bannerSection?.url || "/"}
                    >
                        <CachedImage
                            url={bannerSection?.desk_banner}
                            isNextImage
                            imgixSizes="70vw"
                            nextImageLayout="fill"
                        />
                    </MyCustomLink>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default BannerSection;
