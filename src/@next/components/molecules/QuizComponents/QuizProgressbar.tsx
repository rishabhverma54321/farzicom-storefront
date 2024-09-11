import React from "react";
import style from "./scss/index.module.scss";

export const QuizProgressbar = ({
  progress = 25,
  defaultWidth = null,
  isWeightQuiz = false
}: {
  progress: number;
  defaultWidth: number | null;
  isWeightQuiz : boolean;
}) => {
  return (
    <div className={`${style.progressbar} ${isWeightQuiz? style.weight_progress: ""}`}>
      <label className={style.progressbar_percent}>{progress}%</label>
      <div className={style.progressbar_container}>
        <div
          className={style.progressbar_fill}
          style={{ width: `${progress || defaultWidth}%` }}
        />
      </div>
    </div>
  );
};
QuizProgressbar.displayName = "QuizProgressbar";
export default QuizProgressbar;
