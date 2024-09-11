import React from "react";
import style from "../scss/index.module.scss";
import QuizButton from "./QuizButton";

export const ResultSection = ({ data, handleQuizEvents, isSkin = false, pageConfig = null }: { data: any, handleQuizEvents: any, isSkin: boolean, pageConfig?: any }) => {
    return (
        <div className={`${style.newContainer} ${style.resultSection_container}`}>
            <div style={{background: `${pageConfig?.secondaryColor || ""}`}} className={isSkin ? style.skinResultSection : style.resultSection}>
                <div className={style.resultSection_box}>
                    <h2 className={style.resultSection_box_heading}>{data?.heading}</h2>
                    <p className={style.resultSection_box_text}>{data?.sub_heading}</p>
                </div>
                <div>
                    <QuizButton
                        onClick={() => {
                            handleQuizEvents(`${data?.bottom?.text}`);
                        }}
                        url={data?.bottom?.url}
                        text={data?.bottom?.text}
                        pageConfig={pageConfig}
                        isSkin={isSkin}
                    />
                </div>
            </div>
        </div>
    );
};

export default ResultSection;
