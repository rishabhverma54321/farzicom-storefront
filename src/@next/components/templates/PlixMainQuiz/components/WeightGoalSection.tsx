import React from "react";
import { CachedImage } from "@components/molecules/CachedImage";
import MemoRightArraow from "images/profileSvg/RightArraow";
import { useRouter } from "next/router";
import style from "../scss/index.module.scss";

interface WeightGoalSectionProps {
  data: {
    enable: boolean;
    before: {
      image: string;
      text: string;
    };
    after: {
      image: string;
      text: string;
    };
  };
}

const WeightGoalSection: React.FC<WeightGoalSectionProps> = ({ data }) => {
  const router = useRouter();
  const userName = router?.query?.name || "";
  const weight = router?.query?.weight || "";
  const weightGoal: string = router?.query?.weightGoal as string | "";
  function extractNumbersFromString(str: string): number[] {
    const numberPattern = /\d+/g;
    const numbersArray = str.match(numberPattern);
    return numbersArray ? numbersArray.map(Number) : [];
  }

  const filterdWeightGoal = extractNumbersFromString(weightGoal);

  const weightloss: string | number =
    filterdWeightGoal?.length === 2
      ? `${Number(weight) - Number(filterdWeightGoal[1])}` +
        "-" +
        `${Number(weight) - Number(filterdWeightGoal[0])}`
      : Number(weight) - Number(filterdWeightGoal[0]);

  return (
    <div className={style.quizpage_weightloss}>
      <div className={style.quizpage_weightloss_container}>
        <div className={style.quizpage_weightloss_container_box}>
          {data?.before?.image ? (
            <>
              <div className={style.quizpage_weightloss_container_box_image}>
                <CachedImage
                  url={data?.before?.image}
                  isNextImage
                  nextImageLayout="fill"
                />
              </div>
              <div className={style.quizpage_weightloss_container_box_bottom}>
                <p>{weight}kgs</p>
                <div>{data?.before?.text || ""}</div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className={style.quizpage_weightloss_container_arrow}>
          <MemoRightArraow />
        </div>
        <div className={style.quizpage_weightloss_container_box}>
          {data?.after?.image ? (
            <>
              <div className={style.quizpage_weightloss_container_box_image}>
                <CachedImage
                  url={data?.after?.image}
                  isNextImage
                  nextImageLayout="fill"
                />
              </div>
              <div className={style.quizpage_weightloss_container_box_bottom}>
                <p>{weightloss}kgs</p>
                <div>{data?.after?.text || ""}</div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeightGoalSection;
