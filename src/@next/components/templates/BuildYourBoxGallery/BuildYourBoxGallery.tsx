import React, { useState } from "react";
import ProductHeader from "@components/molecules/ProductHeader";
import FaqAccordian from "@components/organisms/FaqAccordian";
import { RichTextContent } from "@components/atoms/RichTextContent";
import styles from "./scss/index.module.scss";
import * as S from "./style";
import { getMetadataValue, parseJson } from "@utils/misc";
import { useRouter } from "next/router";
import { CachedImage } from "@components/molecules/CachedImage";
import MemoKnefPlix from "@components/atoms/SvgIcons/knefSvgIcon";
import MyCustomLink from "@components/next-react/MyCustomLink";

export const FaqSection = ({ faqData }: { faqData: any }) => {
  const [faqExpanded, setFaqExpanded] = useState(false);
  return (
    <>
      {faqData && (
        <div className={`${styles.faqSection}`}>
          <div className="flex items-center">
            <h2 className={styles.faqSection_heading}>FAQs</h2>
            <MemoKnefPlix fontSize="100px" />
          </div>
          <FaqAccordian
            eventHeaderName="Faq section - byob"
            data={faqExpanded ? faqData : faqData.slice(0, 5)}
            accordianClass="accordian"
          />
          {faqData.length > 5 ? (
            <button
              style={{ margin: "12px auto" }}
              onClick={() => setFaqExpanded(prev => !prev)}
              className="view-more-plix-pdp"
            >
              {faqExpanded ? "View less" : "View more"}
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export const TermsAndCondition: React.FC<any> = ({ content }) => {
  if (content && content?.contentJson) {
    return (
      <div className={`terms-conditions container ${styles.termsCondition}`}>
        <RichTextContent
          descriptionJson={content?.contentJson}
          className="plixlife__rich__text"
        />
      </div>
    );
  }

  return <></>;
};

export interface IBuildYourBoxGalleryProps {
  content: {
    contentJson: any;
    title: string;
    seoDescription: string;
    seoTitle: string;
    slug: string;
    __typename: "Page";
    metadata: { key: string; value: string }[];
  };
}

export const BuildYourBoxGallery: React.FC<IBuildYourBoxGalleryProps> = ({
  content,
}) => {
  const { metadata: pageMeta, slug } = content;
  const router = useRouter();

  const faqData =
    pageMeta &&
    getMetadataValue(pageMeta, "faqData") &&
    parseJson(getMetadataValue(pageMeta, "faqData"));

  const boxDetails =
    pageMeta &&
    getMetadataValue(pageMeta, "boxDetails_new") &&
    parseJson(getMetadataValue(pageMeta, "boxDetails_new"));

  const boxHeadings =
    pageMeta &&
    getMetadataValue(pageMeta, "galleryHeading") &&
    parseJson(getMetadataValue(pageMeta, "galleryHeading"));

  return (
    <>
      <div
        className={`${styles.byobProductList} ${styles.newContainer} byob-gallery`}
      >
        <div className="byob-product-list">
          <div className={styles.byobGalleryHeading}>
            {boxHeadings?.head || "Build your own box with Plix"}
          </div>
          <div className={styles.byobGalleryText}>
            {boxHeadings?.subHead ||
              "Choose any Build Your Own Box below and unlock huge savings on your favorite Plix products! 😍"}
          </div>
          <div className={styles.cardContainer}>
            {boxDetails.map((box, index) => (
              <div key={index} className={styles.card}>
                <MyCustomLink href={box?.redirectUrl || "/"}>
                  <div className={styles.cardHeader}>
                    <div className={styles.itemTitle}>
                      {box?.boxName || "Box " + index}
                    </div>
                    <div className={styles.itemTitle}>
                      {box?.boxPrice || "Rs. 0"}
                    </div>
                  </div>
                  <div className={styles.cardElementContainer}>
                    {box?.imageUrl_mob ? (
                      <div className={styles.cardImage_mob}>
                        <CachedImage
                          url={box?.imageUrl_mob}
                          imgixSizes="(max-width: 540px) 50vw, 70vw"
                          isNextImage
                          nextImageLayout="fill"
                        />
                      </div>
                    ) : (
                      <div className={styles.cardImage} />
                    )}
                    {box?.imageUrl_desk ? (
                      <div className={styles.cardImage_desk}>
                        <CachedImage
                          url={box?.imageUrl_desk}
                          imgixSizes="(max-width: 540px) 50vw, 70vw"
                          isNextImage
                          nextImageLayout="fill"
                        />
                      </div>
                    ) : (
                      <div className={styles.cardImage} />
                    )}
                    <button className={styles.cardButton}>
                      {box?.btnText || "BUILD YOUR BOX"}
                    </button>
                  </div>
                </MyCustomLink>
              </div>
            ))}
          </div>
        </div>
        {faqData && <FaqSection faqData={faqData} />}
      </div>
      <TermsAndCondition content={content} />
    </>
  );
};

BuildYourBoxGallery.displayName = "BuildYourBoxGallery";
export default BuildYourBoxGallery;
