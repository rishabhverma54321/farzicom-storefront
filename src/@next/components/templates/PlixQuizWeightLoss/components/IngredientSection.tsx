import React from "react";
import style from "../scss/index.module.scss";
import QuizButton from "./QuizButton";
import { CachedImage } from "@components/molecules/CachedImage";

export interface IngredientSectionInfo {
    enable: boolean;
    heading: string;
    sub_heading: string;
    desk_img: string;
    mob_img: string;
    mob_img2: string;
    text: string;
    bottom: {
        url: string;
        text: string;
    };
}

const IngredientSection = ({ data, isSkin = false }: { data: IngredientSectionInfo, isSkin: boolean }) => {
    return (
        <div className={`${style.newContainer} ${style.ingredients}`}>
            <h2 className={style.ingredients_heading_mob}>{data?.heading}</h2>
            <div className={style.ingredients_image_mob}>
                {data?.mob_img ? (
                    <CachedImage
                        url={data?.mob_img}
                        isNextImage
                        nextImageLayout="fill"
                    />
                ) : (
                    <></>
                )}
            </div>
            <div className={style.ingredients_image_desk}>
                {data?.mob_img ? (
                    <CachedImage
                        url={data?.desk_img}
                        isNextImage
                        nextImageLayout="fill"
                    />
                ) : (
                    <></>
                )}
            </div>
            <div className={style.ingredients_container}>
                <h2 className={style.ingredients_heading_desk}>{data?.heading}</h2>
                <h3 className={style.ingredients_sub_heading}>{data?.sub_heading}</h3>
                <p className={style.ingredients_description}>{data?.text}</p>
                <div className={style.ingredients_button}>
                    <QuizButton url={data?.bottom?.url} text={data?.bottom?.text} isSkin={isSkin} />
                </div>
            </div>
            {data?.mob_img2 ? (
                <div className={style.ingredients_image_mob2}>
                    <CachedImage
                        url={data?.mob_img2}
                        isNextImage
                        nextImageLayout="fill"
                    />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default IngredientSection;
