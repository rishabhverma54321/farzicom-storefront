import React from "react";
import Media from "react-media";
// import { Banner1 } from "../SalesPage";
import { getMetadataValue, parseJson } from "@utils/misc";
import * as styles from "./index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";
import MyCustomLink from "@components/next-react/MyCustomLink";
import Card from "@components/molecules/Card";

export const Banner1: React.FC<any> = ({ metadata }) => {
  const bannerData =
    metadata &&
    getMetadataValue(metadata, "bannerData") &&
    parseJson(getMetadataValue(metadata, "bannerData"));

  const linkInBanner = bannerData?.banner1?.link;
  if (linkInBanner) {
    return (
      <MyCustomLink href={linkInBanner}>
        <div className="whyPlixbanner minWhyPlixHeight ">
          <div className={styles.formBanner}>
            <Card content={{ image: bannerData?.banner1.image }} cardClass="" />
          </div>

          <div className={styles.formBannerMobile}>
            <Card
              content={{ image: bannerData?.banner1.imageMobile }}
              cardClass=""
            />
          </div>
        </div>
      </MyCustomLink>
    );
  }

  return (
    <>
      <div className="whyPlixbanner minWhyPlixHeight ">
        <div className={styles.formBanner}>
          <Card content={{ image: bannerData?.banner1.image }} cardClass="" />
        </div>

        <div className={styles.formBannerMobile}>
          <Card
            content={{ image: bannerData?.banner1.imageMobile }}
            cardClass=""
          />
        </div>
      </div>
    </>
  );
};

export default function PlixGoogleForm({ content }) {
  const formEmbedLink =
    content?.metadata && getMetadataValue(content?.metadata, "formEmbedLink");
  return (
    <>
      <Banner1 metadata={content?.metadata} />
      {/* <BannerComponent bannerData={bannerData} /> */}
      <div className={`${styles.formWrapper} container`}>
        {formEmbedLink ? (
          <iframe
            src={formEmbedLink}
            className={styles.formEmbed}
            // width="360"
            // height="800"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Loading…
          </iframe>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
