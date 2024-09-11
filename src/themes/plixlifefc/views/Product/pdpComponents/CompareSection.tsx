import { CachedImage } from "@components/molecules/CachedImage";
import Card from "@components/molecules/Card";
import ProductHeader from "@components/molecules/ProductHeader";
import React, { useState } from "react";

const CompareSection: React.FC<{ compareSectionData: any }> = ({
  compareSectionData,
}) => {
  return (
    <>
      {compareSectionData && (
        <>
          <div className="compareSection__wrapper container">
            <ProductHeader
              headerClass="compareSection__heading"
              heading={compareSectionData.heading}
            />
            <ProductHeader
              headerClass="compareSection__subHeading"
              heading={compareSectionData.subHeading}
            />
          </div>
          <div className="compareSection__image">
            <CachedImage
              url={compareSectionData?.image}
              className="compareSection__image__desktop"
              imgixSizes="100vw"
            />
            <CachedImage
              url={compareSectionData?.imageMobile}
              className="compareSection__image__mobile"
              imgixSizes="100vw"
            />
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(CompareSection);
