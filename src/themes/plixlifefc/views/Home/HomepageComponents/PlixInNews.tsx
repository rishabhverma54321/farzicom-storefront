import React, { useEffect, useState } from "react";
import { CachedImage } from "@components/molecules/CachedImage";
import {
  getMetadataValue,
  parseJson,
  imageURLReplaceWithCDN,
} from "@utils/misc";
import Marquee from "react-fast-marquee";
import styles from "../scss/index.module.scss";

const PlixInNews = ({ sectionData }) => {
  const brandLogosSection = sectionData?.edges.length && sectionData?.edges[0];
  const brandLogosSectionData =
    brandLogosSection &&
    getMetadataValue(brandLogosSection?.node.metadata, "reviews") &&
    parseJson(getMetadataValue(brandLogosSection?.node.metadata, "reviews"));

  const brandLogosSectionHeading =
    brandLogosSection &&
    getMetadataValue(brandLogosSection?.node.metadata, "heading") &&
    parseJson(getMetadataValue(brandLogosSection?.node.metadata, "heading"));

  const [showAfterJS, setShowAfterJS] = useState(false);

  useEffect(() => {
    setShowAfterJS(true);
  }, []);

  if (brandLogosSectionData)
    return (
      <>
        {brandLogosSection && (
          <div className="brandLogosSection">
            <div className="plix_news_side_icon">
              <CachedImage
                className="wb_sideicon"
                url="https://plixlifefc-media.farziengineer.co/hosted/plix_news_side_icon-71deb03e2345-729bb07828b0.png"
                isNextImage
                nextImageLayout="fill"
                nextImageObjectFit="contain"
              />
            </div>
            <div className="brandLogosSection__first">
              <h2 className="header">Plix In News</h2>
              <div className="new_header_icon">
                <CachedImage
                  className="wb_sideicon"
                  url="https://plixlifefc-media.farziengineer.co/hosted/news_header_icon-e0db5d5ac7ee-de3cb44cdbd3.png"
                  isNextImage
                  nextImageLayout="fill"
                  nextImageObjectFit="contain"
                />
              </div>
              <div className="text">
                Our goal of empowering your health starts with our extraordinary
                ingredients. We use clinically backed wholefood ingredients to
                create blends which empower your body, mind and soul.
              </div>
              {/* <ProductHeader
                  heading={brandLogosSectionHeading || ""}
                  headerClass="homepage_header_h1"
                />

                <MyRating
                  rating={brandLogosSectionData.star}
                  isReadOnly
                  color="#000"
                />

                <div className="brandLogosSection__text">
                  {brandLogosSectionData.number}{" "}
                  <strong>{brandLogosSectionData.star}-Star Reviews</strong>
                </div> */}
            </div>
            <div className="brandLogosSection__second">
              {showAfterJS ? (
                <Marquee speed={40}>
                  {brandLogosSection?.node?.images?.edges.map((edge, index) => {
                    const imageUrlImgixScr = imageURLReplaceWithCDN(
                      edge?.node.url
                    );

                    return (
                      <div
                        className={`brandLogosSection__second__img__container ${styles.brandLogoImageWrapper}`}
                        key={index}
                      >
                        <CachedImage
                          key={edge?.node.id}
                          url={imageUrlImgixScr}
                          alt={edge?.node.alt || `Artboard ${index + 1}`}
                          isNextImage
                          nextImageLayout="fill"
                          nextImageObjectFit="contain"
                        />
                      </div>
                    );
                  })}
                </Marquee>
              ) : (
                <>
                  {brandLogosSection?.node?.images?.edges.map((edge, index) => {
                    const imageUrlImgixScr = imageURLReplaceWithCDN(
                      edge?.node.url
                    );

                    return (
                      <div
                        className={`brandLogosSection__second__img__container ${styles.brandLogoImageWrapper}`}
                        key={index}
                      >
                        <CachedImage
                          key={edge?.node.id}
                          url={imageUrlImgixScr}
                          alt={edge?.node.alt}
                          isNextImage
                          nextImageLayout="fill"
                          nextImageObjectFit="contain"
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </>
    );

  return <> </>;
};

export default React.memo(PlixInNews);
