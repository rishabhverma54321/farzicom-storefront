import React from "react";
import MemoNewplixlogo from "@components/atoms/SvgIcons/NewPlixLogoSVG";
import style from "./scss/index.module.scss";

export const QuizHeader = () => {
  return (
    <div className={style.quizheader}>
      <div className={style.quizheader_logo}>
        <MemoNewplixlogo />
      </div>
    </div>
  );
};

QuizHeader.displayname = "QuizHeader";
export default QuizHeader;
