import React from "react";
import {
  customEventTrigger,
  getMetadataValue,
  parseJson,
  triggerHomepageBannerEvent,
  useImageURLReplaceWithCDN,
} from "@utils/misc";
import { TypedSectionWithCustomMetadataProducts } from "../queries";
import Card from "@components/molecules/Card/Card";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { useWindowWidth } from "@hooks";
import { CUSTOM_PRODUCT_METADATA_FIELDS } from "@temp/themes/plixlifefc/config";
import { useAuthState } from "@saleor/sdk";
import { CustomVisibilitySensor } from "@components/farzicom-ui-kit/CustomVisibilitySensor";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";

const NewLaunches = ({bannerPosition}) => {
  const handleDots = (dots: any) => {
    dots = dots.slice(0, 3);
    return <ul>{dots}</ul>;
  };
  const [width] = useWindowWidth();
  const { user } = useAuthState();
  return (
    <>
      <TypedSectionWithCustomMetadataProducts
        variables={{
          firstPage: 1,
          name: "New Launches",
          productMetafields: CUSTOM_PRODUCT_METADATA_FIELDS
        }}
      >
        {({ data, loading }) => {
          const collection2Section =
            data?.section?.edges.length && data?.section?.edges[0];
          const collection2SectionData =
            collection2Section &&
            getMetadataValue(
              collection2Section.node?.collections.edges[0]?.node.metadata,
              "subNavbarCard"
            ) &&
            parseJson(
              getMetadataValue(
                collection2Section.node?.collections.edges[0]?.node.metadata,
                "subNavbarCard"
              )
            );
          const collection2SectionButton =
            collection2Section &&
            getMetadataValue(
              collection2Section.node?.metadata,
              "buttonDetails"
            ) &&
            parseJson(
              getMetadataValue(
                collection2Section.node?.metadata,
                "buttonDetails"
              )
            );

            const collectionName =
            collection2Section?.node?.collections?.edges[0]?.node?.name;
          if (collection2Section && collection2SectionData) {
            return (
              <>
                <div className="ourInsta-main-container boxShadowContainer">
                  <div className="whatsNewContent">
                    {collection2Section.node?.backgroundImage?.url && (
                      <CustomVisibilitySensor
                        onChange={inViewport => {
                          if (inViewport) {
                            triggerHomepageBannerEvent(
                              collection2Section.node?.id,
                              collectionName,
                              bannerPosition,
                              user
                            );
                          }
                        }}
                      >
                      <Card
                        content={{
                          image: collection2Section.node?.backgroundImage?.url,
                          button: {
                            text: `${
                              collection2SectionButton?.text || "Shop All"
                            }`,
                            link: `${
                              collection2SectionButton?.link || "/page/shop"
                            }`,
                            handleClick: () => {
                              if (gtmConfig.shopAllCta.enable) {
                                customEventTrigger(
                                  gtmConfig.shopAllCta.value,
                                  user,
                                  {
                                    heading_name: collectionName,
                                  }
                                );
                              }
                              triggerHomepageBannerEvent(
                                collection2Section.node?.id,
                                collectionName,
                                bannerPosition,
                                user,
                                "click"
                              );
                            },
                          },
                          imageDimensions: {
                            width: 500,
                          },
                          imgixProps: {
                            htmlAttributes: {
                              alt: "Performance",
                            },
                          },
                        }}
                        cardClass="whatsNewLeftCard"
                      />
                      </CustomVisibilitySensor>
                    )}
                    <div className="whatsNewProductContainer">
                      <div className="whatsNewProductContainer__overlay" />
                      {collection2Section.node.collections.edges[0] && (
                        <MemoizedProductList
                          products={collection2Section.node.collections.edges[0].node.products.edges.map(
                            product => product.node
                          )}
                          isCarousel={width > 720}
                          productListClassname="whatsNewProductContainer__productList"
                          from="HomePage"
                          ctTitle={collectionName}
                          // refetch={refetch}
                          carouselProps={{
                            infinite:
                              collection2Section.node.collections.edges[0].node
                                .products.edges.length > 3,
                            variableWidth: true,
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
                            slidesToScroll: 1,
                          }}
                          slidesOnDesktop={3}
                          slidesOnTab={2}
                          slidesOnMobile={2}
                          slidesToScroll={1}
                          cardTag={{
                            name: collection2SectionData?.title || "",
                            tagColor: collection2SectionData?.tagColor,
                          }}
                          productCardClassname="whatsNewProductContainer__productCard"
                          productListId={
                            collection2Section.node.collections.edges[0].node
                              ?.id
                          }
                          // button={false}
                          // priceUl
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          }
          return <> </>;
        }}
      </TypedSectionWithCustomMetadataProducts>
    </>
  );
};

export default React.memo(NewLaunches);
