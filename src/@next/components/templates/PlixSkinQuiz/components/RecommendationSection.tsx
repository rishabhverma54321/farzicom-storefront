import React from "react";
import style from "../scss/index.module.scss";
import { IRecommendationSectionProps } from "../types/interface";
import { dataCollector } from "braintree-web";
import MemoNutritionPlus from "@components/atoms/SvgIcons/MemoNutritionPlus";

const RecommendationSection = ({
  data,
  quizDetails,
  month,
}: {
  data: IRecommendationSectionProps;
  quizDetails: any;
  month: string;
}) => {
  if (!data?.enable) {
    return <></>;
  }
  return (
    <div className={`${style.quizpage_recommend} ${style.quizpage_padding}`}>
      <div className={style.quizpage_bannerContainer}>
        <div className={style.quizpage_bannerContainer_headings}>
          <h3>{data?.heading}</h3>
          <div>{month}</div>
          <p>{data?.bottom_text}</p>
        </div>
        <div className={style.recommendedBox}>
          <div className={style.recommended}>
            <div className={style.recommended_container}>
              <div className={style.recommended_container_percent}>
                {data?.caution?.percentage || ""}
                <span>%</span>
              </div>
              <h3 className={style.recommended_container_heading}>
                {data?.caution?.heading || ""}
              </h3>
            </div>
          </div>
          <div className={style.recommended_text}>
            <MemoNutritionPlus /> {data?.caution?.bottom_text || ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationSection;
