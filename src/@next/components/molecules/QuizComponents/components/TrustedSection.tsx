import React from "react";
import { CachedImage } from "@components/molecules/CachedImage";
import { ITrustedSection } from "../interfaces/skin_interfaces";
import style from "../scss/index.module.scss";

export const TrustedSection = ({
  data,
  quizDetails,
}: {
  data: ITrustedSection;
  quizDetails: any;
}) => {
  const quizPrimaryValue =
    quizDetails?.questionValues[`${quizDetails?.primaryQuestion}`];

  const ImageData = data[`${quizPrimaryValue}`];

  if (!data?.enable || !quizPrimaryValue) {
    return <></>;
  }

  return (
    <div className={style.quizpage_trustedSection}>
      <div className={`${style.quizpage_trustedSection_heading}`}>
        {data?.heading || ""}
      </div>

      <div className={`${style.quizpage_trustedSection_heading_sub}`}>
        {data?.sub_heading || ""}
      </div>
      {ImageData?.image_desk ? (
        <div className={style.quizpage_trustedSection_image_desk}>
          <CachedImage
            url={ImageData?.image_desk}
            isNextImage
            imgixSizes="80vw"
            nextImageLayout="fill"
          />
        </div>
      ) : (
        <></>
      )}
      {ImageData?.image_mob ? (
        <div className={style.quizpage_trustedSection_image_mob}>
          <CachedImage
            url={ImageData?.image_mob}
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

TrustedSection.displayName = "TrustedSection";

export default TrustedSection;
