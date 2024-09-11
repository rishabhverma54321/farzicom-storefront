import React from "react";
import {
  customEventTrigger,
  getMetadataValue,
  parseJson,
  useImageURLReplaceWithCDN,
} from "@utils/misc";
import { MyCustomLink } from "@components/next-react/MyCustomLink";
import { CachedImage } from "@components/molecules/CachedImage";
import styles from "../scss/index.module.scss";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";

const NutritionistNew = ({ sectionData }) => {
  // props.data?.nutritionistNew?
  const nutritionSection = sectionData?.edges.length && sectionData?.edges[0];

  const nutritionSectionData =
    nutritionSection &&
    getMetadataValue(nutritionSection.node.metadata, "banner") &&
    parseJson(getMetadataValue(nutritionSection.node.metadata, "banner"));
  if (nutritionSection && nutritionSectionData) {
    return (
      <div className="nutritionSection container">
        <div 
          className={`show-on-desktop ${styles.imageSectionWrapperDesktop}`}
          onClick={() => {
            if (
              gtmConfig.membershipJoinNowClick.enable &&
              nutritionSectionData?.link?.includes("membership")
            ) {
              customEventTrigger(
                gtmConfig.membershipJoinNowClick.value,
                user,
                {
                  heading_name: "Membership Banner - Homepage",
                }
              );
            }
          }}
        >
          <MyCustomLink href={nutritionSectionData?.link}>
            <CachedImage
              url={nutritionSectionData?.imageWeb}
              alt="nutrition"
              imgixSizes="50vw"
              isNextImage
              nextImageLayout="fill"
              nextImageObjectFit="contain"
            />
          </MyCustomLink>
        </div>

        <div 
          className={`show-on-mobile ${styles.imageSectionWrapperMobile}`} 
          onClick={() => {
            if (
              gtmConfig.membershipJoinNowClick.enable &&
              nutritionSectionData?.link?.includes("membership")
            ) {
              customEventTrigger(
                gtmConfig.membershipJoinNowClick.value,
                user,
                {
                  heading_name: "Membership Banner - Homepage",
                }
              );
            }
          }}>
          <MyCustomLink href={nutritionSectionData?.link}>
            <CachedImage
              url={nutritionSectionData?.imageMobile}
              alt="nutrition"
              imgixSizes="50vw"
              isNextImage
              nextImageLayout="fill"
              nextImageObjectFit="contain"
            />
          </MyCustomLink>
        </div>
      </div>
    );
  }
  return <></>;
};

export default React.memo(NutritionistNew);
