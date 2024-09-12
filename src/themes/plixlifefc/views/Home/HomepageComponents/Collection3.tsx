import React from "react";
import {
  customEventTrigger,
  getMetadataValue,
  parseJson,
  triggerHomepageBannerEvent,
  imageURLReplaceWithCDN,
} from "@utils/misc";
import Image from "next/image";
import { TypedSectionWithCustomMetadataProducts } from "../queries";
import Card from "@components/molecules/Card/Card";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { useWindowWidth } from "@hooks";
import { CUSTOM_PRODUCT_METADATA_FIELDS } from "@temp/themes/plixlifefc/config";
import { CustomVisibilitySensor } from "@components/farzicom-ui-kit/CustomVisibilitySensor";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import { useAuthState } from "@saleor/sdk";

const Collection3 = ({bannerPosition}) => {
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
          name: "Collection 3",
          productMetafields: CUSTOM_PRODUCT_METADATA_FIELDS
        }}
      >
        {({ data, laoding }) => {
          const collection3Section =
            data?.section?.edges.length && data?.section?.edges[0];
          const collection3SectionData =
            collection3Section &&
            getMetadataValue(
              collection3Section.node?.collections.edges[0]?.node.metadata,
              "subNavbarCard"
            ) &&
            parseJson(
              getMetadataValue(
                collection3Section.node?.collections.edges[0]?.node.metadata,
                "subNavbarCard"
              )
            );
          const collection3SectionButton =
            collection3Section &&
            getMetadataValue(
              collection3Section.node?.metadata,
              "buttonDetails"
            ) &&
            parseJson(
              getMetadataValue(
                collection3Section.node?.metadata,
                "buttonDetails"
              )
            );
          
          const collectionName =
            collection3Section?.node?.collections?.edges[0]?.node?.name;
          if (collection3Section && collection3SectionData) {
            return (
              <>
                <div className="ourInsta-main-container boxShadowContainer">
                  <div className="whatsNewContent">
                    {collection3Section.node?.backgroundImage?.url && (
                      <CustomVisibilitySensor
                        onChange={inViewport => {
                          if (inViewport) {
                            triggerHomepageBannerEvent(
                              collection3Section.node?.id,
                              collectionName,
                              bannerPosition,
                              user
                            );
                          }
                        }}
                      >
                      <Card
                        content={{
                          image: collection3Section.node?.backgroundImage?.url,
                          button: {
                            text: `${
                              collection3SectionButton?.text || "Shop All"
                            }`,
                            link: `${
                              collection3SectionButton?.link || "/page/shop"
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
                                collection3Section.node?.id,
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
                              alt: "Plant Based Skin Supplement",
                            },
                          },
                        }}
                        cardClass="whatsNewLeftCard"
                      />
                      </CustomVisibilitySensor>
                    )}
                    <div className="whatsNewProductContainer">
                      <div className="whatsNewProductContainer__overlay" />
                      {collection3Section.node.collections.edges[0] && (
                        <MemoizedProductList
                          products={collection3Section.node.collections.edges[0].node.products.edges.map(
                            product => product.node
                          )}
                          isCarousel={width > 720}
                          productListClassname="whatsNewProductContainer__productList"
                          from="HomePage"
                          ctTitle={collectionName}
                          // refetch={refetch}
                          carouselProps={{
                            infinite:
                              collection3Section.node.collections.edges[0].node
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
                            name: collection3SectionData?.title || "",
                            tagColor: collection3SectionData?.tagColor,
                          }}
                          productCardClassname="whatsNewProductContainer__productCard"
                          productListId={
                            collection3Section.node.collections.edges[0].node
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
export default React.memo(Collection3);
