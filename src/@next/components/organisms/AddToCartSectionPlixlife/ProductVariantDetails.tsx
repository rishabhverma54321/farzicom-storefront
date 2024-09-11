import { getMetadataValue, parseJson } from "@utils/misc";
import React, { useState } from "react";
import styles from "./scss/index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";
import MemoProductsPlus from "@components/atoms/SvgIcons/MemoProductsPlus";
import { divide } from "lodash";
import parse from "html-react-parser";
import MemoVerifiedGreenTick from "@components/atoms/SvgIcons/VerifiedGreenTick";
import MemoNutritionPlus from "@components/atoms/SvgIcons/MemoNutritionPlus";
import ProductCombos from "./components/ProductCombos";
import ProductTestimonial from "./components/ProductTestimonial";

const ProductVariantDetails = ({
  selectedVariant,
  metaData,
}: {
  selectedVariant: any;
  metaData: Array<any>;
}) => {
  const variantMetaData = selectedVariant?.metadata;
  const [readmore, setReadmore] = useState(false);
  const ProductCombosData =
    getMetadataValue(variantMetaData, "product_combos") &&
    parseJson(getMetadataValue(variantMetaData, "product_combos"));

  const productTestimonial =
    getMetadataValue(variantMetaData, "product_testimonial") &&
    parseJson(getMetadataValue(variantMetaData, "product_testimonial"));

  const productVariantsBenefits =
    getMetadataValue(metaData, "product_variants_benefits") &&
    parseJson(getMetadataValue(metaData, "product_variants_benefits"));

  const clinicallyTestedSection =
    (productVariantsBenefits && productVariantsBenefits?.clinicallyTested) ||
    null;
  const benefitsSection =
    (productVariantsBenefits && productVariantsBenefits?.product_benefits) ||
    null;
  const bestResults =
    (productVariantsBenefits && productVariantsBenefits?.results) || null;
  const recommended =
    (productVariantsBenefits && productVariantsBenefits?.recommended) || null;

  return (
    <div className={styles.productVariantDetails}>
      {ProductCombosData && !!ProductCombosData?.items?.length ? (
        <ProductCombos
          selectedVariant={selectedVariant}
          data={ProductCombosData}
        />
      ) : (
        <></>
      )}
      <ProductTestimonial data={productTestimonial} />
      {productVariantsBenefits ? (
        <>
          {!readmore ? (
            <div
              onClick={() => {
                setReadmore(prev => !prev);
              }}
              className={styles.expanded}
            >
              Read more
            </div>
          ) : (
            <>
              {clinicallyTestedSection ? (
                <div className={styles.clinicallyTested}>
                  <div className={styles.clinicallyTested_heading}>
                    {clinicallyTestedSection?.emoji ? (
                      <span className={styles.clinicallyTested_emoji}>
                        <CachedImage url={clinicallyTestedSection?.emoji} />
                      </span>
                    ) : (
                      <></>
                    )}
                    <h3>{clinicallyTestedSection?.heading}</h3>
                  </div>
                  <p className={styles.clinicallyTested_description}>
                    {clinicallyTestedSection?.description || ""}
                  </p>
                </div>
              ) : (
                <></>
              )}
              {benefitsSection ? (
                <div className={styles.benefitsSection}>
                  <div className={styles.benefitsSection_heading}>
                    {benefitsSection?.emoji ? (
                      <div className={styles.benefitsSection_heading_img}>
                        <CachedImage
                          url={benefitsSection?.emoji}
                          isNextImage
                          nextImageLayout="fill"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    <h3>{benefitsSection?.heading || ""}</h3>
                  </div>
                  {Array.isArray(benefitsSection?.list) &&
                  !!benefitsSection?.list?.length ? (
                    <ul className={styles.benefitsSection_list}>
                      {benefitsSection?.list?.map((item: string) => (
                        <li>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
              {bestResults ? (
                <div className={styles.bestresult}>
                  <div className={styles.bestresult_heading}>
                    <div className={styles.bestresult_heading_img}>
                      {bestResults?.emoji ? (
                        <CachedImage
                          url={bestResults?.emoji}
                          isNextImage
                          nextImageLayout="fill"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <h3>{bestResults?.heading || ""}</h3>
                  </div>
                  <div className={styles.bestresult_description}>
                    {bestResults?.description || ""}
                  </div>
                  <p className={styles.bestresult_caution}>
                    {bestResults?.caution || ""}
                  </p>
                </div>
              ) : (
                <></>
              )}
              <div
                onClick={() => {
                  setReadmore(prev => !prev);
                }}
                className={styles.expanded}
              >
                Read less
              </div>
            </>
          )}
        </>
      ) : (
        <></>
      )}
      {recommended ? (
        <>
          <div className={styles.recommended}>
            <div className={styles.recommended_container}>
              <div className={styles.recommended_container_percent}>
                {recommended?.percentage || ""}
                <span>%</span>
              </div>
              <h3 className={styles.recommended_container_heading}>
                {recommended?.heading || ""}
              </h3>
            </div>
            <div className={styles.recommended_text}>
              <MemoNutritionPlus /> {recommended?.bottom_text || ""}
            </div>
          </div>
          <p className={styles.recommended_warning}>
            {recommended?.warning || ""}
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductVariantDetails;
