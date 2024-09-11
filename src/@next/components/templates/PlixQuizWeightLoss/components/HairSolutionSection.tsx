import React from "react";
import style from "../scss/index.module.scss";
import QuizButton from "./QuizButton";

export interface IHairSolutionSectionProps {
  enable: boolean;
  heading: string;
  sub_heading: string;
  para1: string;
  para2: string;
  bottom: {
    text: string;
    url: string;
  };
}
const HairSolutionSection = ({
  data,
  handleQuizEvents,
  isSkin,
  pageConfig,
}: {
  data: IHairSolutionSectionProps;
  handleQuizEvents: any;
  isSkin?: any;
  pageConfig?: any;
}) => {
  return (
    <div className={`${style.hairsolution} ${style.newContainer}`}>
      <h3>{data?.heading}</h3>
      <h2 style={{ color: `${pageConfig?.headingColor || ""}` }}>
        {data?.sub_heading}
      </h2>
      <div className={style.hairsolution_para}>
        <p>{data?.para1}</p>
        <p>{data?.para2}</p>
      </div>
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

export default HairSolutionSection;
