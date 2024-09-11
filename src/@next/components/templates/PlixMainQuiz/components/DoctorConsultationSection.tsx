import React from "react";
import { getMetadataValue, parseJson } from "@utils/misc";
import { CachedImage } from "@components/molecules/CachedImage";
import style from "../scss/index.module.scss";

const DoctorConsultationSection = ({ metadata }: { metadata: Array<any> }) => {
  const doctorConsultation =
    metadata &&
    getMetadataValue(metadata, "doctor_consultation_new") &&
    parseJson(getMetadataValue(metadata, "doctor_consultation_new"));

  if (doctorConsultation && doctorConsultation?.enable) {
    return (
      <div className={style.quizpage_doctorCons}>
        <div className={style.quizpage_doctorCons_text}>
          <h2 className={style.quizpage_doctorCons_text_heading}>
            {doctorConsultation?.heading}
          </h2>
          {Array.isArray(doctorConsultation?.list) ? (
            <ul className={style.quizpage_doctorCons_text_list}>
              {doctorConsultation?.list?.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
        {doctorConsultation?.image ? (
          <div className={style.quizpage_doctorCons_image}>
            <div className={style.quizpage_doctorCons_image_container}>
              <CachedImage
                url={doctorConsultation?.image}
                isNextImage
                nextImageLayout="fill"
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
  return <></>;
};

export default DoctorConsultationSection;
