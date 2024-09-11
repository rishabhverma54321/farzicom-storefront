import React, { useState } from "react";
import style from "../scss/index.module.scss";
import Carousel from "@temp/components/ProductCarousel";
import { CachedImage } from "@components/molecules/CachedImage";
import MemoGreenTickNewSvg from "@components/atoms/SvgIcons/GreenTickNewSvg";
import MyRating from "@components/atoms/MyRating";

export interface IReviewSection {
    enable: boolean;
    heading: string;
    sub_heading: string;
    pageConfig?:any;
    reviews: Array<{
        image_mob: string;
        image_desk: string;
        name: string;
        description: string;
        rating: number;
        usedfor: string;
        published: string;
        review_text: string;
        review_date: string;
    }>;
}

const ReviewSection = ({ data, googleRating, pageConfig }: { data: IReviewSection, googleRating: any, pageConfig?:any }) => {
    const [isReadMore, setReadMore] = useState<boolean>(false);
    function truncateString(str: string, maxLength: number) {
        if (str.length > maxLength) {
            return (
                <>
                    {str.slice(0, maxLength) + "..."}{" "}
                    <span
                        onClick={() => {
                            setReadMore(true);
                        }}
                    >
                        Read more
                    </span>
                </>
            );
        } else {
            return str;
        }
    }
    return (
        <div className={`${style.newContainer} ${style.reviewsection}`}>
            <div>
                <h2 style={{color: `${pageConfig?.headingColor || ""}`}} className={style.reviewsection_heading}>{data?.heading}</h2>
                {data?.sub_heading ? <h3 className={style.reviewsection_sub_heading}>
                    {data?.sub_heading}
                </h3> : <></>}
            </div>
            <div className={style.reviewsection_box}>
                {Array.isArray(data?.reviews) && data?.reviews?.length ? (
                    <Carousel
                        slidesOnMobile={1}
                        slidesOnTab={1}
                        slidesOnDesktop={1}
                        slidesToScroll={1}
                        mobileCarouselProps={{
                            arrows: false,
                            dots: true,
                            infinite: false,
                        }}
                        tabCarouselProps={{
                            arrows: false,
                            dots: true,
                            infinite: false,
                            // appendDots: handleDots,
                        }}
                        desktopCarouselProps={{
                            arrows: false,
                            dots: true,
                            infinite: false,
                        }}
                    >
                        {data?.reviews?.map(item => (
                            <div className={style.reviewsection_container}>
                                <div className={style.reviewsection_container_left}>
                                    {item?.image_mob ? (
                                        <div className={style.reviewsection_container_img_mob}>
                                            <CachedImage
                                                url={item?.image_mob}
                                                isNextImage
                                                nextImageLayout="fill"
                                            />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    {item?.image_desk ? (
                                        <div className={style.reviewsection_container_img_desk}>
                                            <CachedImage
                                                url={item?.image_desk}
                                                isNextImage
                                                nextImageLayout="fill"
                                            />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className={style.reviewsection_container_right}>
                                    <div className={style.reviewsection_container_right_upper}>
                                        <div className={style.reviewsection_container_right_name}>
                                            <div>
                                                <h3 className={style.reviewsection_container_name}>
                                                    {item?.name} <MemoGreenTickNewSvg />
                                                </h3>
                                                <h4 className={style.reviewsection_container_review}>
                                                    {item?.review_date}
                                                </h4>
                                            </div>
                                            <div
                                                className={style.reviewsection_container_rating_mob}
                                            >
                                                <MyRating
                                                    rating={Number(item?.rating)}
                                                    isReadOnly
                                                    fontSizeSm="20px"
                                                    color="#FFDB3C"
                                                    showEmptyIconOutlined
                                                />
                                            </div>
                                            <div
                                                className={style.reviewsection_container_rating_desk}
                                            >
                                                <MyRating
                                                    rating={Number(item?.rating)}
                                                    isReadOnly
                                                    fontSizeSm="20px"
                                                    color="#FFA227"
                                                    showEmptyIconOutlined
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                style.reviewsection_container_right_description
                                            }
                                        >
                                            <p
                                                className={
                                                    style.reviewsection_container_description_mob
                                                }
                                            >
                                                {isReadMore ? (
                                                    <>
                                                        {item?.description}{" "}
                                                        <span
                                                            onClick={() => {
                                                                setReadMore(false);
                                                            }}
                                                        >
                                                            Read less
                                                        </span>
                                                    </>
                                                ) : (
                                                    truncateString(item?.description, 150)
                                                )}
                                            </p>
                                            <p
                                                className={
                                                    style.reviewsection_container_description_desk
                                                }
                                            >
                                                {isReadMore ? (
                                                    <>
                                                        {item?.description}{" "}
                                                        <span
                                                            onClick={() => {
                                                                setReadMore(false);
                                                            }}
                                                        >
                                                            Read less
                                                        </span>
                                                    </>
                                                ) : (
                                                    truncateString(item?.description, 200)
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={style.reviewsection_container_right_bottom}>
                                        <div className={style.reviewsection_container_bottom}>
                                            <div>Used for:</div>
                                            <p>{item?.usedfor}</p>
                                        </div>
                                        <div className={style.reviewsection_container_bottom}>
                                            {item?.review_text}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;