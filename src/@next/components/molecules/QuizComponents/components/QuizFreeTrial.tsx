import React from "react";
import styles from "../scss/index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";
import MyCustomLink from "@components/next-react/MyCustomLink";

export const QuizFreeTrial = ({ data }: { data: any }) => {
  if (data && data?.enable) {
    return (
      <div className={styles.quizpage_freetrail}>
        {data?.image ? (
          <div className={styles.quizpage_freetrail_image}>
            <CachedImage url={data?.image} isNextImage nextImageLayout="fill" />
          </div>
        ) : (
          <></>
        )}
        <div className={styles.quizpage_freetrail_box}>
          <h2>{data?.heading}</h2>
          <p>{data?.text}</p>
          <div className={styles.quizpage_freetrail_box_bottom}>
            <MyCustomLink href={data?.bottom?.link || "/"}>
              {data?.bottom?.text}
            </MyCustomLink>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

QuizFreeTrial.displayName = "QuizFreeTrial";

export default QuizFreeTrial;
