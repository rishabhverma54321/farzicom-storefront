import React from "react";
import style from "../scss/index.module.scss";
import parse from "html-react-parser";
import { getMetadataValue, parseJson } from "@utils/misc";
import { CachedImage } from "@components/molecules/CachedImage";

const Testimonial = ({ metadata }: { metadata: any }) => {
  const testimonial =
    metadata &&
    getMetadataValue(metadata, "testimonial_section") &&
    parseJson(getMetadataValue(metadata, "testimonial_section"));

  if (testimonial && testimonial?.enable) {
    return (
      <div className={style.quizpage_testimonial}>
        <h2 className={style.quizpage_testimonial_heading}>
          {parse(`${testimonial?.heading}`)}
        </h2>
        {testimonial?.image ? (
          <div className={style.quizpage_testimonial_image}>
            <CachedImage
              url={testimonial?.image}
              isNextImage
              nextImageLayout="fill"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
};

export default Testimonial;
