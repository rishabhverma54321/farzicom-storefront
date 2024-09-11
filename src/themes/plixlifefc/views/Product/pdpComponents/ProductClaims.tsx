import React from "react";
import { CachedImage } from "@components/molecules/CachedImage";
import styles from "../scss/index.module.scss";

const ProductClaims = ({ data }) => {
  if (data && data?.enable) {
    return (
      <section className={styles.productClaim}>
        <div className={styles.container}>
          <div className={styles.imageContainer_desktop}>
            <CachedImage url={data?.image_desk} isNextImage nextImageLayout="fill" />
          </div>
          <div className={styles.imageContainer_mobile}>
            <CachedImage url={data?.image_mob} isNextImage nextImageLayout="fill" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.firstSection}>
              {data?.section?.percent ? (
                <div>
                  <div className={styles.textlarge}>
                  <p className={styles.smallText}>Upto</p>
                  <h3 className={styles.bigText_percent}>
                    {data?.section?.percent} <span>%</span>
                  </h3>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className={styles.bigText}>{data?.section?.days}</h3>
                  <p className={styles.smallText}>days</p>
                </div>
              )}
              <p className={styles.description}>{data?.section?.text}</p>
            </div>
            <div className={styles.secondSection}>
              <div>
                <p className={styles.percentage}>
                  <p className={styles.bigTextNew}>
                    {data?.section2?.percent}
                    <span>%</span>
                  </p>
                  <p className={styles.descriptionNew}>
                    {data?.section2?.text}
                  </p>
                </p>
              </div>
              <div>
                <p className={styles.bigTextNew}>{data?.section3?.days} day</p>
                <p className={styles.descriptionNew}>{data?.section3?.text}</p>
              </div>
            </div>
            <p className={styles.disclaimer}>{data?.bottom_text}</p>
          </div>
        </div>
      </section>
    );
  }
  return <></>;
};

export default ProductClaims;
