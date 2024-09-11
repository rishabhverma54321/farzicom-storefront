import { IQuizConcern } from "@components/molecules";
import React from "react";
import MemoPushPinIcon from "@components/atoms/SvgIcons/MemoPushPinIcon";
import { CachedImage } from "@components/molecules/CachedImage";
import style from "../scss/index.module.scss";
import { truncateString } from "@utils/misc";

interface IHairQuizResultsConcern {
  quizConcernSection: IQuizConcern;
  quizDetails: any;
  quizPrimarySection: any;
}
const ConcernHeader = ({ heading }: { heading: string }) => {
  return (
    <div className={style.quizpage_results_concern_box_heading}>
      <MemoPushPinIcon /> {heading}
    </div>
  );
};

const ConcernSection = ({
  quizDetails,
  quizPrimarySection,
}: {
  quizDetails: any;
  quizPrimarySection: any;
}) => {
  const quizCollections =
    (quizDetails?.productCollection &&
      Object?.values(quizDetails?.productCollection)) ||
    null;
  const primaryConcern = quizPrimarySection;

  if (!quizCollections) {
    return <></>;
  }

  return (
    <div className={style.quizpage_results_concern_box}>
      {primaryConcern ? (
        <div className={style.quizpage_results_concern_box_first}>
          <div>
            <ConcernHeader heading="Your Primary Concern:" />
            <p>{primaryConcern?.text}</p>
          </div>
          {primaryConcern?.image ? (
            <div
              className={
                style.quizpage_results_concern_box_card_container_image_mob
              }
            >
              <CachedImage
                url={primaryConcern?.image}
                isNextImage
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
    </div>
  );
};

const HairQuizResultsConcern: React.FC<IHairQuizResultsConcern> = ({
  quizConcernSection,
  quizDetails,
  quizPrimarySection,
}) => {
  const questions = quizDetails?.questionValues || "";
  return (
    <div className={style.quizpage_results_concern}>
      <div>
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
        <ConcernSection
          quizDetails={quizDetails}
          quizPrimarySection={quizPrimarySection}
        />
      </div>
      {quizPrimarySection?.image ? (
        <div
          className={
            style.quizpage_results_concern_box_card_container_image_desk
          }
        >
          <CachedImage
            url={quizPrimarySection?.image}
            isNextImage
            nextImageLayout="fill"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HairQuizResultsConcern;
