import React, { useEffect, useState } from "react";
import { getMetadataValue, HAIR_QUIZ_STATE, parseJson } from "@utils/misc";
import {
  clearQuizStateLocal,
  QuizCardHeader,
  QuizProgressbar,
} from "@components/molecules";
import HairQuizForm from "./components/HairQuizForm";
import style from "./scss/index.module.scss";

const HairQuiz = ({ metadata }: { metadata: Array<any> }) => {
  const [selectedHeader, setSelectedHeader] = useState(0);
  const [progressPercent, setProgressPrecent] = useState({
    progress: 0,
    defaultWidth: 3,
  });
  const [openRevisitPopup, setRevisitPopup] = useState(false);

  const quizHeaderData =
    metadata &&
    getMetadataValue(metadata, "quiz_header") &&
    parseJson(getMetadataValue(metadata, "quiz_header"));

  const [updatedHeaderData, setUpdatedHeaderData] = useState(quizHeaderData);
  const getQuizStateLocal =
    typeof window !== "undefined"
      ? parseJson(localStorage.getItem(HAIR_QUIZ_STATE))
      : null;

  const handleHeader = (value: number, formikValues?: any) => {
    const updatedQuizHeaderData =
      formikValues?.question5 === "Female"
        ? { ...quizHeaderData, steps: quizHeaderData?.steps?.slice(0, 3) }
        : quizHeaderData;
    setUpdatedHeaderData(updatedQuizHeaderData);
    setSelectedHeader(value);
  };

  useEffect(() => {
    if (getQuizStateLocal && !getQuizStateLocal?.isSubmitted) {
      setRevisitPopup(true);
    }
  }, []);

  const handleProgressPrecent = (value: number) => {
    setProgressPrecent({
      progress: value,
      defaultWidth: 3,
    });
  };

  const handleResume = () => {
    setRevisitPopup(false);
  };

  const handleRestart = () => {
    clearQuizStateLocal(HAIR_QUIZ_STATE);
    handleProgressPrecent(3);
    setSelectedHeader(0);
    setRevisitPopup(false);
  };

  return (
    <div className={style.quizpage}>
      <div className={style.quizpage_header}>
        {quizHeaderData?.header || ""}
      </div>
      {openRevisitPopup ? (
        <HairQuiz.Revisit
          handleResume={handleResume}
          handleRestart={handleRestart}
        />
      ) : (
        <>
          {/* <div className={style.quizpage_cards}>
            {quizHeaderData?.enable ? (
              <QuizCardHeader
                selectedHeader={selectedHeader}
                headerData={updatedHeaderData}
              />
            ) : (
              <></>
            )}
          </div> */}
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
          <HairQuizForm
            metadata={metadata}
            handleHeader={handleHeader}
            handleProgressPrecent={handleProgressPrecent}
          />
        </>
      )}
    </div>
  );
};

HairQuiz.Revisit = ({ handleResume, handleRestart }) => {
  return (
    <section className={style.quizpage_revisit}>
      <h1>Hello!</h1>
      <p>You haven’t fully completed the Plix Hair Quiz.</p>

      <button onClick={handleResume} className={style.resumeButton}>
        RESUME WHERE I LEFT
      </button>
      <button onClick={handleRestart} className={style.restartButton}>
        RESTART QUIZ
      </button>
    </section>
  );
};

export default HairQuiz;
