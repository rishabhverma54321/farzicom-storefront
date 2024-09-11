import React from "react";
import style from "../scss/index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";
import MyRating from "@components/atoms/MyRating";
import MemoGreenTickNewSvg from "@components/atoms/SvgIcons/GreenTickNewSvg";

export interface IGoogleRating {
    enable: boolean;
    img: string;
    rating: string;
    reviews: string;
}

const PageRatings = ({ googleRating }: { googleRating: IGoogleRating }) => {
    return (
        <div className={style.rating}>
            {googleRating?.img ? (
                <div className={style.rating_img}>
                    <CachedImage
                        url={googleRating?.img}
                        isNextImage
                        nextImageLayout="fill"
                    />
                </div>
            ) : (
                <></>
            )}
            <div className={style.rating_container}>
                <div className={style.rating_container_upper}>
                    <h3>{googleRating?.rating}</h3>
                    <MyRating
                        rating={Number(googleRating?.rating)}
                        isReadOnly
                        fontSizeSm="20px"
                        color="#FFDB3C"
                        showEmptyIconOutlined
                    />
                </div>
                <div className={style.rating_container_lower}>
                    <MemoGreenTickNewSvg />
                    <p>{googleRating?.reviews} reveiws</p>
                </div>
            </div>
        </div>
    );
};

export default PageRatings;
