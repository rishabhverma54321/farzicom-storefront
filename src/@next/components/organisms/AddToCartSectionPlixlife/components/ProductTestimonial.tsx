import { getMetadataValue, parseJson } from "@utils/misc";
import React from "react";
import styles from "../scss/index.module.scss";
import parse from "html-react-parser";
import { CachedImage } from "@components/molecules/CachedImage";
import MemoVerifiedGreenTick from "@components/atoms/SvgIcons/VerifiedGreenTick";

const ProductTestimonial = ({ data }: { data?: any }) => {
  if (data) {
    return (
      <div className={styles.testimonial}>
        <h3 className={styles.testimonial_heading}>{data?.heading || ""}</h3>
        <h4 className={styles.testimonial_heading_sub}>
          {parse(`${data?.sub_heading || ""}`)}
        </h4>
        <div className={styles.testimonial_container}>
          <div className={styles.testimonial_container_img}>
            <CachedImage
              url={data?.testimonial?.img}
              isNextImage
              nextImageLayout="fill"
            />
          </div>
          <div className={styles.testimonial_container_details}>
            <div className={styles.testimonial_container_details_name}>
              <h3>{data?.testimonial?.name || ""}</h3>
              <span>
                <MemoVerifiedGreenTick />
              </span>
            </div>
            <p className={styles.testimonial_container_details_text}>
              {data?.testimonial?.text || ""}
            </p>
          </div>
        </div>
        <div className={styles.testimonial_reivew}>
          {parse(`${data?.review || ""}`)}
        </div>
      </div>
    );
  }
  return <></>;
};

export default ProductTestimonial;
