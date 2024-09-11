import { CachedImage } from "@components/molecules/CachedImage";
import Card from "@components/molecules/Card";
import ProductHeader from "@components/molecules/ProductHeader";
import FaqAccordian from "@components/organisms/FaqAccordian";
import React, { useState } from "react";

const BenefitsSection: React.FC<{ benefitsData: any }> = ({ benefitsData }) => {
  return (
    <>
      {benefitsData && (
        <>
          <div className="benefitsSection__wrapper container">
            <ProductHeader
              headerClass="benefitsSection__header"
              heading={benefitsData.heading}
            />
          </div>
          <CachedImage
            url={benefitsData.image}
            className="benefitsSection__image"
            imgixSizes="100vw"
          />
          <CachedImage
            url={benefitsData.mobileImage}
            className="benefitsSection__imageMobile"
            imgixSizes="100vw"
          />
        </>
      )}
    </>
  );
};

export default React.memo(BenefitsSection);
