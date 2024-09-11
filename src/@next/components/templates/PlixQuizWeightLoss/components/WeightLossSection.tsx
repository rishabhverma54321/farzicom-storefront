import React from "react";
import style from "../scss/index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";
import QuizButton from "./QuizButton";

export interface IWeightLossInfo {
  enable: boolean;
  heading: string;
  sub_heading: string;
  text: string;
  desk_img: string;
  mob_img: string;
  bottom: {
    text: string;
    url: string;
  };
}

const WeightLossSection = ({ data, handleQuizEvents, isSkin = false }: { data: IWeightLossInfo, handleQuizEvents: any, isSkin: boolean }) => {
  return (
    <div className={`${style.weightloss} ${style.newContainer}`}>
      <div className={style.weightloss_mob}>
        <h3 className={style.weightloss_heading}>{data?.heading}</h3>
        <h4 className={style.weightloss_sub_heading}>{data?.sub_heading}</h4>
        {data?.mob_img ? (
          <div className={style.weightloss_img_mob}>
            <CachedImage
              url={data?.mob_img}
              isNextImage
              nextImageLayout="fill"
            />
          </div>
        ) : (
          <></>
        )}
        <div className={style.weightloss_text}>{data?.text}</div>
        <QuizButton
          onClick={() => {
            handleQuizEvents(`${data?.bottom?.text}`);
          }}
          url={data?.bottom?.url}
          text={data?.bottom?.text}
          isSkin={isSkin}
        />
      </div>
      <div className={style.weightloss_desk}>
        <div className={style.weightloss_desk_left}>
          <h3 className={style.weightloss_heading}>{data?.heading}</h3>
          <h4 className={style.weightloss_sub_heading}>
            {data?.sub_heading}
          </h4>
          <div className={style.weightloss_text}>{data?.text}</div>
          <QuizButton
            onClick={() => {
              handleQuizEvents(`${data?.bottom?.text}`);
            }}
            url={data?.bottom?.url}
            text={data?.bottom?.text}
            isSkin={isSkin}
          />
        </div>
        <div className={style.weightloss_desk_right}>
          {data?.desk_img ? (
            <div className={style.weightloss_img_desk}>
              <CachedImage
                url={data?.desk_img}
                isNextImage
                nextImageLayout="fill"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeightLossSection;
