import React from "react";
import style from "../scss/index.module.scss";
import QuizButton from "./QuizButton";

const StickyBottom = ({ data, handleQuizEvents, isSkin = false, pageConfig=null }: { data: any, handleQuizEvents: any, isSkin: boolean; pageConfig?:any }) => {
    return (
        <div className={style.stickybottom}>
            <QuizButton
                onClick={() => {
                    handleQuizEvents(`${data?.bottom?.text}`);
                }}
                url={data?.bottom?.url}
                text={data?.bottom?.text}
                isSkin={isSkin}
                pageConfig={pageConfig}
            />
        </div>
    );
};

export default StickyBottom;
