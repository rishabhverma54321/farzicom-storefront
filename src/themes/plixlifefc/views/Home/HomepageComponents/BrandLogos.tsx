import React, { useState } from "react";
import { CachedImage } from "@components/molecules/CachedImage";
import { getMetadataValue, parseJson } from "@utils/misc";

export const NewPlixbrandLogo = ({ sectionData }) => {
  // props.data?.nutritionBrand
  const nutritionBranddata =
    sectionData?.edges?.length && sectionData?.edges[0];

  const nutritionBrandNewdata =
    nutritionBranddata &&
    getMetadataValue(nutritionBranddata.node.metadata, "branddata") &&
    parseJson(getMetadataValue(nutritionBranddata.node.metadata, "branddata"));

  return (
    <>
      {nutritionBrandNewdata && (
        <div className="brandlogo_wrapper">
          <div className="inner_brandlogo">
            <div className="content">
              <h1
                dangerouslySetInnerHTML={{
                  __html: nutritionBrandNewdata.title,
                }}
              ></h1>
              <div className="logo_wrapper">
                {nutritionBrandNewdata.features.map((feature, i) => (
                  <div className="logo_feature" key={i}>
                    <CachedImage
                      url={feature.logo}
                      alt={feature.alt || 'nutrition-brand'}
                      isNextImage={true}
                      nextImageLayout="fill"
                      nextImageObjectFit="contain"
                    />
                    <p>{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="brand__logo1">
            <CachedImage
              url="https://plixlifefc-media.farziengineer.co/hosted/brand-left-image-0ef0062e6516-cf7df94ac207.png"
              isNextImage={true}
              nextImageLayout="fill"
              nextImageObjectFit="contain"
            />
          </div>
          <div className="brand__logo1 mobileOnly">
            <CachedImage
              url="https://plixlifefc-media.farziengineer.co/hosted/brand-left-image-mobile-411d1ed2ac02-2071cdea4b99.png"
              isNextImage={true}
              nextImageLayout="fill"
              nextImageObjectFit="contain"
            />
          </div>
          <div className="brand_logo2">
            <CachedImage
              url="https://plixlifefc-media.farziengineer.co/hosted/brand-right-image-d5a09e3d5a58-0a10efff7cba.png"
              isNextImage={true}
              nextImageLayout="fill"
              nextImageObjectFit="contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(NewPlixbrandLogo);
