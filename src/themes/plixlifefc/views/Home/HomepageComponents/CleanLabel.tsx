import React from "react";
import { getMetadataValue, parseJson } from "@utils/misc";
import { CachedImage } from "@components/molecules/CachedImage";

const CleanlabelNew = ({ sectionData }) => {
  // props.data?.cleanLabel
  const cleanlabelSection = sectionData?.edges?.length && sectionData?.edges[0];

  const CleanlabelNewdata =
    cleanlabelSection &&
    getMetadataValue(cleanlabelSection.node.metadata, "cleanLabelData") &&
    parseJson(
      getMetadataValue(cleanlabelSection.node.metadata, "cleanLabelData")
    );

  return (
    <>
      {CleanlabelNewdata && (
        <>
          <div className="clean_label">
            <CachedImage
              url={CleanlabelNewdata.primaryImage}
              isNextImage={true}
              nextImageLayout="fill"
              alt="Banner image"
              nextImageObjectFit="contain"
              imgixSizes="100vw"
            />
          </div>
          <div className="clean_label mobileOnly">
            <CachedImage
              url={CleanlabelNewdata.secondaryImage}
              alt="Banner image"
              isNextImage={true}
              nextImageLayout="fill"
              nextImageObjectFit="contain"
            />
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(CleanlabelNew);
