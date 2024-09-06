import React, { useState } from "react";
import { customEventTrigger, getMetadataValue, parseJson } from "@utils/misc";
import { CachedImage } from "@components/molecules/CachedImage";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import { useAuthState } from "@saleor/sdk";
import Link from "next/link";
import MyCustomLink from "@components/next-react/MyCustomLink";
export const Ingredientfeature = ({ sectionData }) => {
  // props.data?.takeCare?
  const takeCare = sectionData?.edges?.length && sectionData?.edges[0];

  const takeCareNewData =
    takeCare &&
    getMetadataValue(takeCare.node.metadata, "takecareData") &&
    parseJson(getMetadataValue(takeCare.node.metadata, "takecareData"));

  const { user } = useAuthState();

  return (
    <>
      {takeCareNewData && (
        <div className="ingredient_feature_wrapper">
          <div className="take_care_sideicon">
            <CachedImage
              url="https://plixlifefc-media.farziengineer.co/hosted/take-care-side-icon2-f2782c37dd67-a28d65606dea.png"
              isNextImage={true}
              nextImageLayout="fill"
              nextImageObjectFit="contain"
            />
          </div>
          <div className="take_care_sideicon3">
            <CachedImage
              url="https://plixlifefc-media.farziengineer.co/hosted/take-care-side-icon3-eb6ad84318b0-12f1aca14258.png"
              isNextImage={true}
              nextImageLayout="fill"
              nextImageObjectFit="contain"
            />
          </div>
          <div className="inner_ingredient_feature">
            <div className="content_section">
              <h2>{takeCareNewData?.title}</h2>
              <p>{takeCareNewData?.subtitle} </p>
              <span
                onClick={() => {
                  if (gtmConfig.learnMoreClick.enable) {
                    customEventTrigger(gtmConfig.learnMoreClick.value, user, {
                      heading_name: takeCareNewData?.title,
                    });
                  }
                }}
              >
                <MyCustomLink href={takeCareNewData?.buttonUrl}>
                  {takeCareNewData?.buttonText}
                </MyCustomLink>
              </span>
              <div className="arrow_icon">
                <CachedImage
                  url="https://plixlifefc-media.farziengineer.co/hosted/take-care-arrow-4d0df733ac77-e0687e6e50b5.png"
                  isNextImage={true}
                  nextImageLayout="fill"
                  nextImageObjectFit="contain"
                />
              </div>
            </div>

            <div className="feature_section">
              {takeCareNewData &&
                takeCareNewData.features.map((data, i) => (
                  <div className="feature" key={i}>
                    <CachedImage
                      url={data?.logo}
                      alt={data?.alt || 'default-image'}
                      isNextImage={true}
                      nextImageLayout="fill"
                      nextImageObjectFit="contain"
                    />
                    <span className="Vegan">{data?.text}</span>
                  </div>
                ))}
            </div>
              <div className="learn_more" 
                onClick={() => {
                    if (gtmConfig.learnMoreClick.enable) {
                      customEventTrigger(gtmConfig.learnMoreClick.value, user, {
                        heading_name: takeCareNewData?.title,
                      });
                    }
                }}
              >
              <a href={takeCareNewData?.buttonUrl}>
                {takeCareNewData?.buttonText}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Ingredientfeature);
