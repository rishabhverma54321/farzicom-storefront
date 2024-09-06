import React, { useState } from "react";
import {
  customEventTrigger,
  getMetadataValue,
  parseJson,
  imageURLReplaceWithCDN,
} from "@utils/misc";
import { CachedImage } from "@components/molecules/CachedImage";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import { useAuthState } from "@saleor/sdk";

const PledgeATree = ({ sectionData }) => {
  // props.data?.pledgeTree
  const pleadgeTree = sectionData?.edges?.length && sectionData?.edges[0];

  const { user } = useAuthState();

  const pleadgeTreeNewData =
    pleadgeTree &&
    getMetadataValue(pleadgeTree.node.metadata, "pledgeTreeData") &&
    parseJson(getMetadataValue(pleadgeTree.node.metadata, "pledgeTreeData"));

  const backgroundImageUrlWithImgix = imageURLReplaceWithCDN(
    "https://plixlifefc-media.farziengineer.co/hosted/pledge_background_image-bc9fe38c31ef.png"
  );
  return (
    <>
      {pleadgeTreeNewData && (
        <div
          className="pledge_tree"
          style={{ backgroundImage: `url(${backgroundImageUrlWithImgix})` }}
        >
          <div className="inner_pledge_tree">
            <div className="pledge_icon">
              <CachedImage
                url={pleadgeTreeNewData?.primaryLogo}
                isNextImage={true}
                alt="Pledge A Tree"
                nextImageLayout="fill"
                nextImageObjectFit="contain"
              />
            </div>
            <div className="leaficon_mobileOnly">
              <CachedImage
                className="leaficon"
                url={pleadgeTreeNewData?.secondaryLogo}
                isNextImage={true}
                nextImageLayout="fill"
                nextImageObjectFit="contain"
              />
            </div>
            <div className="content">
              <h2>{pleadgeTreeNewData?.title}</h2>
              <p>{pleadgeTreeNewData?.subtext}</p>
              <a
                href={pleadgeTreeNewData?.buttonUrl}
                onClick={() => {
                  if (gtmConfig.learnMoreClick.enable) {
                    customEventTrigger(gtmConfig.learnMoreClick.value, user, {
                      heading_name: pleadgeTreeNewData?.title,
                    });
                  }
                }}
              >
                {pleadgeTreeNewData?.buttonText}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(PledgeATree);
