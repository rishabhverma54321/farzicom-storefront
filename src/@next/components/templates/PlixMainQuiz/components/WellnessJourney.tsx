import React from "react";
import styles from "../scss/index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";
import { getMetadataValue, parseJson } from "@utils/misc";

function ContentSection({ children }) {
  return (
    <section className={styles.quizpage_contentSection}>{children}</section>
  );
}

function ContentHeaderVersion1({ data }: { data?: any }) {
  return (
    <header
      className={`${styles.quizpage_contentHeaderversion1} ${styles.quizpage_contentHeader}`}
    >
      <div className={styles.quizpage_contentHeader_desk}>
        <h2 className={styles.quizpage_contentTitle}>{data?.title}</h2>
        <p>“{data?.quote}”</p>
        <div>{data?.name}</div>
      </div>
      <div className={styles.quizpage_contentHeader_mob}>
        <h2 className={styles.quizpage_contentTitle}>{data?.title}</h2>
      </div>
      {data?.image_desk ? (
        <div className={styles.quizpage_coverImagedesk}>
          <CachedImage
            url={data?.image_desk}
            alt={data?.title}
            isNextImage
            nextImageLayout="fill"
          />
        </div>
      ) : (
        <></>
      )}
      {data?.image ? (
        <div className={styles.quizpage_coverImage}>
          <CachedImage
            url={data?.image}
            alt={data?.title}
            isNextImage
            nextImageLayout="fill"
          />
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}

function ContentHeaderVersion2({ data }: { data?: any }) {
  return (
    <header
      className={`${styles.quizpage_contentHeaderversion2} ${styles.quizpage_contentHeader}`}
    >
      <div className={styles.quizpage_contentHeader_desk}>
        <h2 className={styles.quizpage_contentTitle}>{data?.title}</h2>
        <p>“{data?.quote}”</p>
        <div>{data?.name}</div>
      </div>
      <div className={styles.quizpage_contentHeader_mob}>
        <h2 className={styles.quizpage_contentTitle}>{data?.title}</h2>
      </div>
      {data?.image ? (
        <div className={styles.quizpage_coverImage}>
          <CachedImage
            url={data?.image}
            alt={data?.title}
            isNextImage
            nextImageLayout="fill"
          />
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}

function WellnessJourney({
  metadata,
  quizVersion,
}: {
  metadata: Array<any>;
  quizVersion?: any;
}) {
  const data =
    metadata &&
    getMetadataValue(metadata, "wellness_journey_section") &&
    parseJson(getMetadataValue(metadata, "wellness_journey_section"));

  if (data?.enable) {
    return (
      <ContentSection>
        {quizVersion === "v1" ? (
          <ContentHeaderVersion1 data={data} />
        ) : (
          <ContentHeaderVersion2 data={data} />
        )}
      </ContentSection>
    );
  }
  return <></>;
}

export default WellnessJourney;
