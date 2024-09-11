import React from "react";
import styles from "../scss/index.module.scss";
import { QuizGraph } from "@components/molecules";
import { getMetadataValue, parseJson } from "@utils/misc";
import { CachedImage } from "@components/molecules/CachedImage";
import { useRouter } from "next/router";

export interface IQuizConcern {
  enable: boolean;
  heading: string;
  icon: string;
}

const QuizWeightLossSection = ({ metadata }: { metadata: Array<any> }) => {
  const router = useRouter()
  const userName = router?.query?.name || "";
  const weight = router?.query?.weight || "";
  const weightGoal: string = router?.query?.weightGoal as string | "";
  const quizWeightLossSection: IQuizConcern =
    metadata &&
    getMetadataValue(metadata, "weight_loss_section") &&
    parseJson(getMetadataValue(metadata, "weight_loss_section"));
  return (
    <div className={styles.quizpage_concern}>
      <h2>Hi {userName},</h2>
      <div className={styles.quizpage_concern_title}>
        <span className={styles.quizpage_concern_title_icon}>
          {quizWeightLossSection?.icon ? (
            <CachedImage
              isNextImage
              url={quizWeightLossSection?.icon}
              nextImageLayout="fill"
            />
          ) : (
            <></>
          )}
        </span>
        Your current weight is {weight} kgs and you have indicated your desire
        to lose {weightGoal}.
      </div>
      <QuizGraph metaData={metadata} />
    </div>
  );
};

export default QuizWeightLossSection;
