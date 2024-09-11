import { Card } from "@components/molecules/Card";
import { ContainerSkeleton } from "@components/molecules/ContainerSkeleton";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { useWindowWidth } from "@hooks/useWindowWidth";
import { mediumScreen } from "@styles/constants";
import { Breadcrumbs } from "@temp/components";
import { TypedSectionWithoutChildrenQuery } from "@temp/themes/plixlifefc/views/Home/queries";
import { RichTextContent } from "@components/atoms/RichTextContent";
import { getMetadataValue, parseJson } from "@utils/misc";
import React from "react";
import Media from "react-media";
import LazyLoad from "react-lazyload";
import { SectionDetailsWithoutChildrenPlix } from "@temp/themes/plixlifefc/views/Home/gqlTypes/SectionDetailsWithoutChildrenPlix";
import { SaleTimer } from "@components/organisms";
import * as S from "./styles";
import MyCustomLink from "@components/next-react/MyCustomLink";

export interface ISalesPageProps {
  content: any;
  breadcrumbs: any;

  sectionName?: string;
  sectionName2?: string;

  sectionData?: SectionDetailsWithoutChildrenPlix;
  sectionData2?: SectionDetailsWithoutChildrenPlix;
}

export const Banner1: React.FC<any> = ({ metadata }) => {
  const bannerData =
    metadata &&
    getMetadataValue(metadata, "bannerData") &&
    JSON.parse(getMetadataValue(metadata, "bannerData"));

  const linkInBanner = bannerData?.banner1?.link;
  if (linkInBanner) {
    return (
      <MyCustomLink href={linkInBanner}>
        <div className="whyPlixbanner minWhyPlixHeight ">
          <Media
            query={{ minWidth: mediumScreen }}
            render={() => (
              <Card
                content={{ image: bannerData?.banner1.image }}
                cardClass=""
              />
            )}
          />

          <Media
            query={{ maxWidth: mediumScreen }}
            render={() => (
              <Card
                content={{ image: bannerData?.banner1.imageMobile }}
                cardClass=""
              />
            )}
          />
        </div>
      </MyCustomLink>
    );
  }

  return (
    <>
      <div className="whyPlixbanner minWhyPlixHeight ">
        <Media
          query={{ minWidth: mediumScreen }}
          render={() => (
            <Card content={{ image: bannerData?.banner1.image }} cardClass="" />
          )}
        />

        <Media
          query={{ maxWidth: mediumScreen }}
          render={() => (
            <Card
              content={{ image: bannerData?.banner1.imageMobile }}
              cardClass=""
            />
          )}
        />
      </div>
    </>
  );
};
export const Banner2: React.FC<any> = ({ metadata }) => {
  const bannerData =
    metadata &&
    getMetadataValue(metadata, "bannerData") &&
    JSON.parse(getMetadataValue(metadata, "bannerData"));

  return (
    <>
      <div className="whyPlixbanner">
        <Media
          query={{ minWidth: mediumScreen }}
          render={() => (
            <Card content={{ image: bannerData?.banner2.image }} cardClass="" />
          )}
        />

        <Media
          query={{ maxWidth: mediumScreen }}
          render={() => (
            <Card
              content={{ image: bannerData?.banner2.imageMobile }}
              cardClass=""
            />
          )}
        />
      </div>
    </>
  );
};
export const SalesPage: React.FC<ISalesPageProps> = ({
  content,
  breadcrumbs,
  sectionName,
  sectionName2,
  sectionData,
  sectionData2,
}) => {
  const contentMeta = content?.metadata;
  const [width] = useWindowWidth();

  const section_name_1 = sectionName || "Sales Page 1";
  // const section_name_2 = sectionName2 || "Sales Page 2";

  const SaleTimerData =
    getMetadataValue(contentMeta, "saleTimer") &&
    JSON.parse(getMetadataValue(contentMeta, "saleTimer"));

  const collections1 = sectionData?.section?.edges[0]?.node?.collections?.edges;
  const collections2 =
    sectionData2?.section?.edges[0]?.node?.collections?.edges;

  const sectionMetaData1 = sectionData?.section?.edges[0]?.node?.metadata;
  const sectionMetaData2 = sectionData2?.section?.edges[0]?.node?.metadata;

  const CollectionsOrder1 =
    getMetadataValue(sectionMetaData1, "collection_order") &&
    parseJson(getMetadataValue(sectionMetaData1, "collection_order"));

  const CollectionsOrder2 =
    getMetadataValue(sectionMetaData2, "collection_order") &&
    parseJson(getMetadataValue(sectionMetaData2, "collection_order"));

  const collectionsData1 =
    CollectionsOrder1 && Array.isArray(CollectionsOrder1)
      ? CollectionsOrder1?.map((item: any) => {
          return collections1?.find((find: any) => find?.node?.name === item);
        })
          ?.concat(
            collections1?.filter(
              (remaning: any) =>
                !CollectionsOrder1.includes(remaning?.node?.name)
            )
          )
          ?.filter((categorydataItem: any) => categorydataItem !== undefined)
      : collections1;

  const collectionsData2 =
    CollectionsOrder2 && Array.isArray(CollectionsOrder2)
      ? CollectionsOrder2?.map((item: any) => {
          return collections2?.find((find: any) => find?.node?.name === item);
        })
          ?.concat(
            collections2?.filter(
              (remaning: any) =>
                !CollectionsOrder2.includes(remaning?.node?.name)
            )
          )
          ?.filter((categorydataItem: any) => categorydataItem !== undefined)
          ?.concat()
      : collections2;

  const TermsAndCondition: React.FC<any> = ({ content }) => {
    if (content && content?.contentJson) {
      return (
        <div className="terms-conditions container">
          <RichTextContent
            descriptionJson={content?.contentJson}
            className="plixlife__rich__text"
          />
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <Banner1 metadata={contentMeta} />
      <Banner2 metadata={contentMeta} />
      <Media
        query={{ minWidth: mediumScreen }}
        render={() => (
          <div className="container">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        )}
      />
      {SaleTimerData ? <SaleTimer {...SaleTimerData} /> : <></>}
      {sectionData &&
      sectionData?.section?.edges?.length &&
      collectionsData1?.length ? (
        <main className="collection1MinHeight">
          <>
            {collectionsData1?.map(edge => {
              const collectionMetadata = edge.node.metadata;

              const meta =
                collectionMetadata &&
                getMetadataValue(edge.node.metadata, "subNavbarCard") &&
                JSON.parse(
                  getMetadataValue(edge.node.metadata, "subNavbarCard")
                );
              const collectionName =
                meta && meta.title ? meta.title : edge.node.name;

              return (
                <>
                  <S.SalesHeading backgroundcolor={meta?.tagColor}>
                    {collectionName}
                  </S.SalesHeading>
                  <section className="container">
                    <MemoizedProductList
                      products={edge.node.products?.edges.map(
                        edge => edge.node
                      )}
                      productListId={edge?.node?.id}
                      ctTitle={`${edge?.node?.name}`}
                      isCarousel={false}
                      cardTag={{
                        name: collectionName,
                        tagColor: meta?.tagColor,
                      }}
                      preventClickToPdp={
                        sectionName === "Valentines Sales Page"
                      }
                    />
                  </section>
                </>
              );
            })}
          </>
        </main>
      ) : (
        <> </>
      )}

      {sectionData2 &&
      sectionData2?.section?.edges?.length &&
      collectionsData2?.length ? (
        <>
          {collectionsData2?.map(edge => {
            const collectionMetadata = edge.node.metadata;

            const meta =
              collectionMetadata &&
              getMetadataValue(edge.node.metadata, "subNavbarCard") &&
              JSON.parse(getMetadataValue(edge.node.metadata, "subNavbarCard"));
            const collectionName =
              meta && meta.title ? meta.title : edge.node.name;

            return (
              <>
                <S.SalesHeading backgroundcolor={meta?.tagColor}>
                  {collectionName}
                </S.SalesHeading>
                <section className="container">
                  <MemoizedProductList
                    products={edge.node.products?.edges.map(edge => edge.node)}
                    isCarousel={false}
                    productListId={edge?.node?.id}
                    ctTitle={`${edge?.node?.name}`}
                    cardTag={{
                      name: collectionName,
                      tagColor: meta?.tagColor,
                    }}
                    preventClickToPdp={sectionName === "Valentines Sales Page"}
                  />
                </section>
              </>
            );
          })}
        </>
      ) : (
        <> </>
      )}
      <TermsAndCondition content={content} />
    </>
  );
};
SalesPage.displayName = "SalesPage";
export default SalesPage;
