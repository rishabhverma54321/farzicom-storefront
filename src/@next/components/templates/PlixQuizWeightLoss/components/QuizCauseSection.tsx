import React from "react";
import style from "../scss/index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";
import Carousel from "@temp/components/ProductCarousel";
import QuizButton from "./QuizButton";

export interface IWeightGainInfo {
    enable: boolean;
    heading: string;
    bottom: {
        text: string;
        url: string;
    };
    cards: Array<{
        img: string;
        heading: string;
        text: string;
        background_color: string;
    }>;
}

const QuizCauseSection = ({ data, handleQuizEvents, isSkin = false, pageConfig }: { data: IWeightGainInfo, handleQuizEvents: any, isSkin: boolean, pageConfig?:any }) => {
    return (
        <div className={`${style.weightcause} ${style.newContainer}`}>
            <h3 style={{color: `${pageConfig?.headingColor || ""}`}} className={style.weightcause_heading}>{data?.heading || ""}</h3>
            {Array.isArray(data?.cards) && data?.cards?.length ? (
                <div className={style.weightcause_cards}>
                    <Carousel
                        slidesOnMobile={2}
                        slidesOnTab={2}
                        slidesOnDesktop={2}
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
                        {data?.cards?.map(card => (
                            <div
                                style={{ background: `${card?.background_color}` }}
                                className={style.weightcause_cards_container}
                            >
                                <div
                                    style={{ background: `${card?.background_color}` }}
                                    className={style.weightcause_cards_container_list}
                                >
                                    {card?.img ? (
                                        <div className={style.weightcause_cards_container_img}>
                                            <CachedImage
                                                url={card?.img}
                                                isNextImage
                                                nextImageLayout="fill"
                                            />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    <div className={style.weightcause_cards_container_card}>
                                        <h3 className={style.weightcause_cards_container_heading}>
                                            {card?.heading}
                                        </h3>
                                        <p className={style.weightcause_cards_container_text}>
                                            {card?.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            ) : (
                <></>
            )}
            <QuizButton
                onClick={() => {
                    handleQuizEvents(`${data?.bottom?.text}`);
                }}
                pageConfig={pageConfig}
                url={data?.bottom?.url}
                text={data?.bottom?.text}
                isSkin={isSkin}
            />
        </div>
    );
};

export default QuizCauseSection;
