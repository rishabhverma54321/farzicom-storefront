import React from "react";
import { CachedImage } from "@components/molecules/CachedImage";
import style from "../scss/index.module.scss";
import { IDoctorConsultation } from "../interfaces/skin_interfaces";

export const DoctorConsultationSection = ({
  data,
}: {
  data: IDoctorConsultation;
}) => {
  if (data && data?.enable) {
    return (
      <div className={style.quizpage_doctorCons}>
        <div className={style.quizpage_doctorCons_container}>
          <div className={style.quizpage_doctorCons_text}>
            <h2 className={style.quizpage_doctorCons_text_heading}>
              {data?.heading}
            </h2>
            {Array.isArray(data?.list) ? (
              <ul className={style.quizpage_doctorCons_text_list}>
                {data?.list?.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <></>
            )}
          </div>
          {data?.image_mob ? (
            <div className={style.quizpage_doctorCons_image}>
              <div className={style.quizpage_doctorCons_image_container}>
                <CachedImage
                  url={data?.image_mob}
                  imgixSizes="80vw"
                  isNextImage
                  nextImageLayout="fill"
                />
              </div>
            </div>
          ) : (
            <></>
          )}
          {data?.image_desk ? (
            <div className={style.quizpage_doctorCons_image_desk}>
              <div className={style.quizpage_doctorCons_image_desk_container}>
                <CachedImage
                  url={data?.image_desk}
                  isNextImage
                  imgixSizes="80vw"
                  nextImageLayout="fill"
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
  return <></>;
};

DoctorConsultationSection.displayName = "DoctorConsultationSectionNew";

export default DoctorConsultationSection;
