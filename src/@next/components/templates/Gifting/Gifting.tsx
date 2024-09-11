import React from "react";
import * as styles from "./index.module.scss";
import { getMetadataValue, parseJson } from "@utils/misc";
import MyCustomLink from "@components/next-react/MyCustomLink";
import Card from "@components/molecules/Card";
import { Banner2, FaqSection, TermsAndCondition } from "../BuildYourBox/BuildYourBox";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";

export default function Gifting({ sectionData, page }) {

  const Banner1New: React.FC<any> = ({ bannerData }) => {
    const linkInBanner = bannerData?.link;

    if (!bannerData) {
      return <></>;
    }
    if (linkInBanner) {
      return (
        <MyCustomLink href={linkInBanner}>
          <div className="whyPlixbanner minWhyPlixHeight ">
            <div className={styles.formBanner}>
              <Card content={{ image: bannerData?.image }} cardClass="" />
            </div>

            <div className={styles.formBannerMobile}>
              <Card content={{ image: bannerData?.imageMobile }} cardClass="" />
            </div>
          </div>
        </MyCustomLink>
      );
    }

    return (
      <>
        <div className="whyPlixbanner minWhyPlixHeight ">
          <div className={styles.formBanner}>
            <Card content={{ image: bannerData?.image }} cardClass="" />
          </div>

          <div className={styles.formBannerMobile}>
            <Card content={{ image: bannerData?.imageMobile }} cardClass="" />
          </div>
        </div>
      </>
    );
  };

  const bannerData =
    page?.metadata &&
    getMetadataValue(page?.metadata, "bannerData") &&
    parseJson(getMetadataValue(page?.metadata, "bannerData"));

  const banner1 = bannerData?.banner1;
  const banner3 = bannerData?.banner3;
  const collection =
    sectionData?.section?.edges[0]?.node?.collections?.edges[0]?.node;
  const products = collection?.products;
  const faqData =
  page?.metadata &&
  getMetadataValue(page?.metadata, "faqData") &&
  parseJson(getMetadataValue(page?.metadata, "faqData"));

  return (
    <>
      <Banner1New bannerData={banner1} />
      <Banner2 metadata={page?.metadata} />
      <div className="container">
        <MemoizedProductList
          products={products?.edges.map(edge => edge.node)}
          productListId={collection?.id}
          ctTitle={`${collection?.name}`}
          isCarousel={false}
          cardTag={{
            name: collection?.name,
            // tagColor: meta?.tagColor,
          }}
        />
      </div>
      <Banner1New bannerData={banner3} />
      <div className="container">
      {faqData && <FaqSection faqData={faqData} />}
      </div>

      <TermsAndCondition content={page} />
    </>
  );
}
