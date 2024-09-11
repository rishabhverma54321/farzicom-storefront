import { CachedImage } from "@components/molecules/CachedImage";
import { getMetadataValue, parseJson } from "@utils/misc";
import React from "react";
import styles from "../scss/index.module.scss";

const InstructionsDetail = ({ month, text }) => {
  return (
    <div className={styles.quizpage_transformation_monthInstructions}>
      <h3 className={styles.quizpage_transformation_monthTitle}>{month}</h3>
      <p className={styles.quizpage_transformation_monthText}>{text}</p>
    </div>
  );
};

export const TransformationPlan = ({
  metadata,
  className,
}: {
  metadata: any;
  className?: string;
}) => {
  const transformationData =
    metadata &&
    getMetadataValue(metadata, "transformation_section") &&
    parseJson(getMetadataValue(metadata, "transformation_section"));

  if (
    transformationData?.enable &&
    Array.isArray(transformationData?.instructions) &&
    transformationData?.instructions?.length
  ) {
    return (
      <section
        className={`${styles.quizpage_transformation_section} ${className}`}
      > 
        <div
          className={`${styles.quizpage_transformation_instructionsHeader} ${className}_instructionHeader`}
        >
          {transformationData?.heading || ""}
        </div>
        <article className={styles.quizpage_transformation_instructionsContent}>
          <aside className={styles.quizpage_transformation_imageGallery}>
            <div className={styles.quizpage_transformation_imageGallery_line} />
            {transformationData?.instructions?.map(item => (
              <div className={styles.quizpage_transformation_image}>
                <div
                  className={`${styles.quizpage_transformation_circleImage}`}
                >
                  <CachedImage
                    url={item?.image}
                    isNextImage
                    nextImageLayout="fill"
                  />
                </div>
              </div>
            ))}
          </aside>
          <div className={styles.quizpage_transformation_instructionsText}>
            {transformationData?.instructions.map((instruction, index) => (
              <InstructionsDetail
                key={index}
                month={instruction.month}
                text={instruction.text}
              />
            ))}
          </div>
        </article>
      </section>
    );
  }
  return <></>;
};

TransformationPlan.displayName = "TransformationPlan";

export default TransformationPlan;
