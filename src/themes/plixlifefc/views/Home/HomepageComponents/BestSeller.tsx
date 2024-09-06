import React, { useState } from "react";
import { customEventTrigger, getMetadataValue, parseJson } from "@utils/misc";
import {
  ButtonPostion,
  ProductHeader,
} from "@components/molecules/ProductHeader";
import MemoGreenArrowRightPlixTwo from "@components/atoms/SvgIcons/GreenArrowRightPlixTwo";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { TypedCollectionWithProducts } from "../queries";
import { ContainerSkeleton } from "@components/molecules/ContainerSkeleton";
import { CUSTOM_PRODUCT_METADATA_FIELDS } from "Themes/config";
import { useAuthState } from "@saleor/sdk";
import gtmConfig from "Themes/lib/gtmConfig";
const handleDots = (dots: any) => {
  dots = dots.slice(0, 3);
  return <ul>{dots}</ul>;
};
function mmatchPropsAreEqual(prevMatch, nextMatch) {
  if (prevMatch.bestSellerSectionNavData) {
    return (
      prevMatch.bestSellerSectionNavData.length ===
      nextMatch.bestSellerSectionNavData.length
    );
  }
  return true;
}
const BestSellerSectionComponent: React.FC<any> = React.memo(
  ({
    bestSellerSection,
    bestSellerSectionNavData,
    bestSellerSectionNavMetaData,
    firstCollectionData,
  }) => {
    const { user } = useAuthState();

    const [bestSellerActiveId, setBestSellerActiveId] = useState(
      bestSellerSectionNavData && bestSellerSectionNavData?.length
        ? bestSellerSectionNavData[0].id
        : ""
    );

    const [products, setProducts] = useState<any>(
      firstCollectionData?.collection?.products?.edges?.map((edge) => edge.node)
    );
    const [bestSellerActiveName, setBestSellerActiveName] = useState<any>({
      name:
        bestSellerSectionNavData && bestSellerSectionNavData?.length
          ? bestSellerSectionNavMetaData[0]?.meta?.title
          : "",
      tagColor:
        bestSellerSectionNavData && bestSellerSectionNavData?.length
          ? bestSellerSectionNavMetaData[0]?.meta?.tagColor
          : "",
    });
    return (
      <>
        {bestSellerSection && (
          <div className="container bestseller_container new_container">
            <ProductHeader
              headingh2="Best Sellers"
              headerClass="bestSellerSection"
              navbar={{
                data: bestSellerSectionNavData,
                navbarHandler: (id) => {
                  setBestSellerActiveId(id);
                  if (bestSellerActiveId !== id) {
                    customEventTrigger("best_seller_section_click", user, {
                      cta_name: bestSellerSectionNavMetaData?.find(
                        (data) => data.id === id
                      )?.meta.title,
                    });
                  }
                  setBestSellerActiveName({
                    name: bestSellerSectionNavMetaData?.find(
                      (data) => data.id === id
                    )?.meta.title,
                    tagColor: bestSellerSectionNavMetaData?.find(
                      (data) => data.id === id
                    )?.meta.tagColor,
                  });
                },
                initialLink: bestSellerSectionNavData[0].text,
              }}
              button={{
                text: "Shop All",
                position: ButtonPostion.WITH_HEADER,
                rightIcon: <MemoGreenArrowRightPlixTwo fontSize="16px" />,
                link: "/collection/best-sellers/99/",
                onClick: () => {
                  if (gtmConfig.shopAllCta.enable) {
                    customEventTrigger(gtmConfig.shopAllCta.value, user, {
                      heading_name: "Best Seller",
                    });
                  }
                },
              }}
              heading={""}
            />

            {bestSellerActiveId === firstCollectionData?.collection?.id ? (
              <MemoizedProductList
                products={products || []}
                isCarousel
                from="HomePage"
                ctTitle="Best Sellers"
                // refetch={refetch}
                carouselProps={{
                  infinite: true,
                }}
                mobileCarouselProps={{
                  arrows: false,
                  dots: true,
                  appendDots: handleDots,
                }}
                desktopCarouselProps={{
                  arrows: true,
                  dots: true,
                  appendDots: handleDots,
                }}
                slidesOnMobile={2}
                slidesOnDesktop={4}
                cardTag={bestSellerActiveName}
                // button={false}
                // priceUl
                key={bestSellerActiveId}
                productListId={bestSellerSection?.node?.id}
              />
            ) : (
              <TypedCollectionWithProducts
                variables={{
                  firstPage: 1,
                  id: bestSellerActiveId,
                  productMetafields: CUSTOM_PRODUCT_METADATA_FIELDS,
                }}
                fetchPolicy="cache-first"
              >
                {({ data, loading }) => {
                  const productsArray = data?.collection?.products?.edges?.map(
                    (edge) => edge.node
                  );

                  if (loading) {
                    return (
                      <ContainerSkeleton
                        render={{
                          button: true,
                          image: true,
                          description: true,
                        }}
                        cardCount={4}
                        headerSkeletonClass="productCardSkeleton"
                      />
                    );
                  }
                  if (data && !loading) {
                    return (
                      <MemoizedProductList
                        products={productsArray || []}
                        isCarousel
                        from="HomePage"
                        ctTitle="Best Sellers"
                        // refetch={refetch}
                        carouselProps={{
                          infinite:
                            productsArray &&
                            Array.isArray(productsArray) &&
                            productsArray?.length > 4,
                        }}
                        mobileCarouselProps={{
                          arrows: false,
                          dots: true,
                          appendDots: handleDots,
                        }}
                        desktopCarouselProps={{
                          arrows: true,
                          dots: true,
                          appendDots: handleDots,
                        }}
                        slidesOnMobile={2}
                        slidesOnDesktop={4}
                        cardTag={bestSellerActiveName}
                        // button={false}
                        // priceUl
                        key={bestSellerActiveId}
                        productListId={bestSellerSection?.node?.id}
                      />
                    );
                  }
                  return <></>;
                }}
              </TypedCollectionWithProducts>
            )}
          </div>
        )}
      </>
    );
  },
  mmatchPropsAreEqual
);
BestSellerSectionComponent.displayName = "BestSellerSectionComponent";

export const BestSellersNew = ({ sectionData, firstCollectionData }) => {
  // props.data?.bestSellersNew?
  const bestSellerSection = sectionData?.edges.length && sectionData?.edges[0];
  const tabSequenceWithSlug =
    getMetadataValue(bestSellerSection?.node.metadata, "tabSequenceWithSlug") &&
    parseJson(
      getMetadataValue(bestSellerSection?.node.metadata, "tabSequenceWithSlug")
    );
  const bestSellerSectionNavData = [];
  const bestSellerSectionNavMetaData = [];
  if (tabSequenceWithSlug === undefined) {
    bestSellerSection &&
      bestSellerSection.node.collections.edges.map((edge) => {
        const collectionMetadata = edge.node.metadata;
        const meta =
          collectionMetadata &&
          getMetadataValue(edge.node.metadata, "subNavbarCard") &&
          parseJson(getMetadataValue(edge.node.metadata, "subNavbarCard"));
        const collectionName = meta && meta.title ? meta.title : edge.node.name;
        bestSellerSectionNavData.push({
          text: collectionName,
          id: edge.node.id,
        });

        bestSellerSectionNavMetaData.push({
          id: edge.node.id,
          meta,
        });
      });
  } else {
    const addedCollections = [];
    tabSequenceWithSlug.map((bestSellerSlug) => {
      bestSellerSection &&
        bestSellerSection.node.collections.edges.map((edge) => {
          if (bestSellerSlug === edge.node.slug) {
            addedCollections.push(edge.node.slug);
            const collectionMetadata = edge.node.metadata;
            const meta =
              collectionMetadata &&
              getMetadataValue(edge.node.metadata, "subNavbarCard") &&
              parseJson(getMetadataValue(edge.node.metadata, "subNavbarCard"));
            const collectionName =
              meta && meta.title ? meta.title : edge.node.name;
            bestSellerSectionNavData.push({
              text: collectionName,
              id: edge.node.id,
            });

            bestSellerSectionNavMetaData.push({
              id: edge.node.id,
              meta,
            });
          }
        });
    });

    bestSellerSection &&
      bestSellerSection.node.collections.edges.map((edge) => {
        let collectionFound = false;
        addedCollections.map((addedCollectionSlug) => {
          if (edge.node.slug === addedCollectionSlug) {
            collectionFound = true;
          }
        });
        if (collectionFound === false) {
          addedCollections.push(edge.node.slug);
          const collectionMetadata = edge.node.metadata;
          const meta =
            collectionMetadata &&
            getMetadataValue(edge.node.metadata, "subNavbarCard") &&
            parseJson(getMetadataValue(edge.node.metadata, "subNavbarCard"));
          const collectionName =
            meta && meta.title ? meta.title : edge.node.name;
          bestSellerSectionNavData.push({
            text: collectionName,
            id: edge.node.id,
          });

          bestSellerSectionNavMetaData.push({
            id: edge.node.id,
            meta,
          });
        }
      });
  }
  if (bestSellerSection && bestSellerSectionNavData)
    return (
      <>
        <BestSellerSectionComponent
          bestSellerSection={bestSellerSection}
          bestSellerSectionNavData={bestSellerSectionNavData}
          bestSellerSectionNavMetaData={bestSellerSectionNavMetaData}
          firstCollectionData={firstCollectionData}
          // refetch={refetch}
        />
      </>
    );

  return <> </>;
};

export default React.memo(BestSellersNew);
