import React, { useState } from "react";
import { getMetadataValue, parseJson } from "@utils/misc";
import { QuizCardHeader, QuizProgressbar } from "@components/molecules";
import style from "./scss/index.module.scss";
import SkinQuizForm from "./components/SkinQuizForm";

const SkinQuiz = ({ metadata }: { metadata: Array<any> }) => {
  const [selectedHeader, setSelectedHeader] = useState(0);
  const [progressPercent, setProgressPrecent] = useState({
    progress: 0,
    defaultWidth: 3,
  });

  const quizHeaderData =
    metadata &&
    getMetadataValue(metadata, "quiz_header") &&
    parseJson(getMetadataValue(metadata, "quiz_header"));

  const handleHeader = (value: number) => {
    setSelectedHeader(value);
  };

  const handleProgressPrecent = (value: number) => {
    setProgressPrecent({
      progress: value,
      defaultWidth: 3,
    });
  };

  return (
    <div className={style.quizpage}>
      <div className={style.quizpage_header}>
        {quizHeaderData?.header || ""}
      </div>
      <div className={style.quizpage_cards}>
        {quizHeaderData?.enable ? (
          <QuizCardHeader
            selectedHeader={selectedHeader}
            headerData={quizHeaderData}
          />
        ) : (
          <></>
        )}
      </div>
      {progressPercent ? (
        <div className={style.quizpage_progressbar}>
          <QuizProgressbar
            progress={progressPercent?.progress}
            defaultWidth={progressPercent?.defaultWidth}
          />
        </div>
      ) : (
        <></>
      )}
      <SkinQuizForm
        metadata={metadata}
        handleHeader={handleHeader}
        handleProgressPrecent={handleProgressPrecent}
      />
    </div>
  );
};

export default SkinQuiz;
