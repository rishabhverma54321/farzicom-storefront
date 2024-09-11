import { IQuizConcern } from "@components/molecules";
import React from "react";
import MemoPushPinIcon from "@components/atoms/SvgIcons/MemoPushPinIcon";
import { CachedImage } from "@components/molecules/CachedImage";
import style from "../scss/index.module.scss";
import { truncateString } from "@utils/misc";

interface ISkinQuizResultsConcern {
  quizConcernSection: IQuizConcern;
  quizDetails: any;
}

const ConcernHeader = ({ heading }: { heading: string }) => {
  return (
    <div className={style.quizpage_results_concern_box_heading}>
      <MemoPushPinIcon /> {heading}
    </div>
  );
};

const ConcernCard = ({
  card,
  className,
}: {
  card: any;
  className?: string;
}) => {
  return (
    <div className={style.quizpage_results_concern_box_card}>
      <div
        className={`${style.quizpage_results_concern_box_card_container} ${className}`}
      >
        {card?.image ? (
          <div
            className={style.quizpage_results_concern_box_card_container_image}
          >
            <CachedImage url={card?.image} isNextImage nextImageLayout="fill" />
          </div>
        ) : (
          <></>
        )}
        <p>{truncateString(card?.key || "", 28)}</p>
      </div>
    </div>
  );
};

const ConcernSection = ({ quizDetails }: { quizDetails: any }) => {
  const quizCollections =
    (quizDetails?.productCollection &&
      Object?.values(quizDetails?.productCollection)) ||
    null;
  const primaryConcern = quizCollections && quizCollections[0];
  const SecondaryConcern = quizCollections && quizCollections[1];
  const otherConcern = quizCollections && quizCollections.slice(2);

  if (!quizCollections) {
    return <></>;
  }

  return (
    <div className={style.quizpage_results_concern_box}>
      <div className={style.quizpage_results_concern_box_first}>
        {primaryConcern ? (
          <div>
            <ConcernHeader heading="Your Primary Concern:" />
            <ConcernCard
              card={primaryConcern}
              className={style.quizpage_results_concern_box_card_firstImage}
            />
          </div>
        ) : (
          <></>
        )}
        {SecondaryConcern ? (
          <div>
            <ConcernHeader heading="Your Secondary Concern:" />
            <ConcernCard
              card={SecondaryConcern}
              className={style.quizpage_results_concern_box_card_firstImage}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      {Array.isArray(otherConcern) && otherConcern?.length ? (
        <div className={style.quizpage_results_concern_box_second}>
          <ConcernHeader heading="You’re also experiencing" />
          <div className={style.quizpage_results_concern_box_second_card}>
            {otherConcern.map(item => (
              <ConcernCard card={item} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const SkinQuizResultsConcern: React.FC<ISkinQuizResultsConcern> = ({
  quizConcernSection,
  quizDetails,
}) => {
  const questions = quizDetails?.questionValues || "";

  return (
    <div className={style.quizpage_results_concern}>
      <h2>Hi {questions?.name || ""}</h2>
      <div className={style.quizpage_results_concern_title}>
        <span className={style.quizpage_results_concern_title_icon}>
          {quizConcernSection?.icon ? (
            <CachedImage
              isNextImage
              url={quizConcernSection?.icon}
              nextImageLayout="fill"
            />
          ) : (
            <></>
          )}
        </span>
        {quizConcernSection?.heading}
      </div>
      <ConcernSection quizDetails={quizDetails} />
    </div>
  );
};

export default SkinQuizResultsConcern;
