import { getMetadataValue, parseJson } from "@utils/misc";
import React from "react";
import styles from "./scss/index.module.scss";
import Script from "next/script";
import { CachedImage } from "@components/molecules/CachedImage";

export interface IPlixQuizWidgetProps {
  content?: {
    metadata?: {};
  };
}

export const PlixQuizWidget: React.FC<IPlixQuizWidgetProps> = ({ content }) => {
  const metadata = content?.metadata || [];
  const quizBanner =
    getMetadataValue(metadata, "quiz_banner") &&
    parseJson(getMetadataValue(metadata, "quiz_banner"));

  const quizRhWidget =
    getMetadataValue(metadata, "quizRhWidget") &&
    parseJson(getMetadataValue(metadata, "quizRhWidget"));

  return (
    <div className={styles.quizWidget}>
      {quizRhWidget?.enable ? (
        <Script
          id="revenuehunt-quiz"
          src="https://admin.revenuehunt.com/embed.js"
        />
      ) : (
        <></>
      )}
      {quizBanner && quizBanner?.enable ? (
        <div className={styles.quizWidget_banner}>
          {quizBanner?.mob_img ? (
            <div className={styles.quizWidget_banner_mob}>
              <CachedImage
                isNextImage
                url={quizBanner?.mob_img}
                nextImageLayout="fill"
              />
            </div>
          ) : (
            <></>
          )}
          {quizBanner?.desk_img ? (
            <div className={styles.quizWidget_banner_desk}>
              <CachedImage
                isNextImage
                url={quizBanner?.desk_img}
                nextImageLayout="fill"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {quizRhWidget?.enable ? (
        <div
          className={`rh-widget rh-inline ${styles.quizWidget_widget}`}
          data-url="https://admin.revenuehunt.com/public/quiz/JRHkkV"
        ></div>
      ) : (
        <></>
      )}
    </div>
  );
};
PlixQuizWidget.displayName = "PlixQuizWidget";
export default PlixQuizWidget;
