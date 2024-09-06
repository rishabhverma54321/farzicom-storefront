import React from "react";
import { customEventTrigger, getMetadataValue, parseJson, triggerHomepageBannerEvent } from "@utils/misc";
import { CachedImage } from "@components/molecules/CachedImage";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { useWindowWidth } from "@hooks/useWindowWidth";
import { TypedSectionWithCustomMetadataProducts } from "../queries";
import { CUSTOM_PRODUCT_METADATA_FIELDS } from "Themes/config";
import CustomVisibilitySensor from "@components/molecules/CustomVisibilitySensor";
import { useAuthState } from "@saleor/sdk";
// import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";

const Collection1New = ({ sectionData, bannerPosition }) => {
  // props.data?.collection1New?
  const [width] = useWindowWidth();
  const { user } = useAuthState();
  const handleDots = (dots: any) => {
    dots = dots.slice(0, 3);
    return <ul>{dots}</ul>;
  };

  return (
    <TypedSectionWithCustomMetadataProducts
      variables={{
        firstPage: 1,
        name: "Collection 1 New",
        productMetafields: CUSTOM_PRODUCT_METADATA_FIELDS
      }}
    >
      {({ data, laoding }) => {
        const   collection1Section =
          data?.section?.edges.length && data?.section?.edges[0];
        const collection1SectionData =
          collection1Section &&
          getMetadataValue(
            collection1Section.node?.collections.edges[0].node.metadata,
            "subNavbarCard"
          ) &&
          parseJson(
            getMetadataValue(
              collection1Section.node?.collections.edges[0].node.metadata,
              "subNavbarCard"
            )
          );
        const collection1SectionButton =
          collection1Section &&
          getMetadataValue(
            collection1Section.node?.metadata,
            "buttonDetails"
          ) &&
          parseJson(
            getMetadataValue(collection1Section.node?.metadata, "buttonDetails")
          );

        const bannerdata =
          collection1Section &&
          getMetadataValue(collection1Section.node?.metadata, "bannerdata") &&
          parseJson(
            getMetadataValue(collection1Section.node?.metadata, "bannerdata")
          );
        
        const collectionName =
          collection1Section?.node?.collections?.edges[0]?.node?.name;

        return (
          <>
            {collection1Section && (
              <>
                <div className="ourInsta-main-container boxShadowContainer">
                  <div className="whatsNewContent">
                    {/* {collection1Section.node?.backgroundImage?.url && (
                        <Card
                          content={{
                            image: collection1Section.node?.backgroundImage?.url,
                            // image: "plixlifefc/assets/weight_banner.png",
    
                            button: {
                              text: `${
                                collection1SectionButton?.text || "Shop All"
                              }`,
                              link: `${
                                collection1SectionButton?.link || "/page/shop"
                              }`,
                            },
                            imageDimensions: {
                              width: 500,
                            },
                            imgixProps: {
                              htmlAttributes: {
                                alt: "Weight",
                              },
                            },
                          }}
                          cardClass="whatsNewLeftCard"
                        />
                      )} */}
                    <CustomVisibilitySensor
                      onChange={inViewport => {
                        if (inViewport) {
                          triggerHomepageBannerEvent(
                            collection1Section.node?.id,
                            collectionName,
                            bannerPosition,
                            user
                          );
                        }
                      }}
                    >
                      <div className="weight_banner">
                        <CachedImage
                          url={bannerdata?.bannerimage}
                          isNextImage={true}
                          alt="Weight"
                          nextImageLayout="fill"
                          nextImageObjectFit="contain"
                        />
                        <a
                          onClick={() => {
                            // if (gtmConfig.shopAllCta.enable) {
                            //   customEventTrigger(
                            //     gtmConfig.shopAllCta.value,
                            //     user,
                            //     {
                            //       heading_name: collectionName,
                            //     }
                            //   );
                            // }
                            triggerHomepageBannerEvent(
                              collection1Section.node?.id,
                              collectionName,
                              bannerPosition,
                              user,
                              "click"
                            );
                          }}
                          href={bannerdata?.buttonUrl}
                        >
                          {bannerdata?.buttonText}
                        </a>
                      </div>
                    </CustomVisibilitySensor>

                    <div className="weight_banner mobileOnly">
                      <CustomVisibilitySensor
                        onChange={inViewport => {
                          if (inViewport) {
                            triggerHomepageBannerEvent(
                              collection1Section.node?.id,
                              collectionName,
                              bannerPosition,
                              user
                            );
                          }
                        }}
                      >
                        <>
                          {/* <p>{bannerdata?.tag}</p> */}
                          <CachedImage
                            url={bannerdata?.bannerimageOnly}
                            isNextImage={true}
                            nextImageLayout="fill"
                            nextImageObjectFit="contain"
                          />
                          <CachedImage
                            className="wb_sideicon"
                            url={bannerdata?.sideIcon}
                            isNextImage={true}
                            nextImageLayout="fill"
                            nextImageObjectFit="contain"
                          />
                          <a
                            href={bannerdata?.buttonUrl}
                            onClick={() => {
                              // if (gtmConfig.shopAllCta.enable) {
                              //   customEventTrigger(
                              //     gtmConfig.shopAllCta.value,
                              //     user,
                              //     {
                              //       heading_name: collectionName,
                              //     }
                              //   );
                              // }
                              triggerHomepageBannerEvent(
                                collection1Section.node?.id,
                                collectionName,
                                bannerPosition,
                                user,
                                "click"
                              );
                            }}
                          >
                            {bannerdata?.buttonText}
                          </a>
                        </>
                      </CustomVisibilitySensor>
                    </div>

                    <div className="whatsNewProductContainer">
                      <div className="whatsNewProductContainer__overlay" />
                      {collection1Section.node.collections.edges[0] && (
                        <MemoizedProductList
                          products={collection1Section?.node?.collections?.edges[0]?.node?.products?.edges?.map(
                            product => product?.node
                          )}
                          isCarousel={width > 720}
                          productListClassname="whatsNewProductContainer__productList"
                          from="HomePage"
                          ctTitle={collectionName}
                          // refetch={refetch}
                          carouselProps={{
                            infinite:
                              collection1Section.node.collections.edges[0].node
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
                            name: collection1SectionData?.title || "",
                            tagColor: collection1SectionData?.tagColor,
                          }}
                          productCardClassname="whatsNewProductContainer__productCard"
                          productListId={
                            collection1Section?.node?.collections?.edges[0]
                              ?.node?.id
                          }
                          // button={false}
                          // priceUl
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        );
      }}
    </TypedSectionWithCustomMetadataProducts>
  );

  // if (collection1Section && collection1SectionData)
  //   return (
  //     <>
  //       {collection1Section && (
  //         <>
  //           <div className="ourInsta-main-container boxShadowContainer">
  //             <div className="whatsNewContent">
  //               {/* {collection1Section.node?.backgroundImage?.url && (
  //                   <Card
  //                     content={{
  //                       image: collection1Section.node?.backgroundImage?.url,
  //                       // image: "plixlifefc/assets/weight_banner.png",

  //                       button: {
  //                         text: `${
  //                           collection1SectionButton?.text || "Shop All"
  //                         }`,
  //                         link: `${
  //                           collection1SectionButton?.link || "/page/shop"
  //                         }`,
  //                       },
  //                       imageDimensions: {
  //                         width: 500,
  //                       },
  //                       imgixProps: {
  //                         htmlAttributes: {
  //                           alt: "Weight",
  //                         },
  //                       },
  //                     }}
  //                     cardClass="whatsNewLeftCard"
  //                   />
  //                 )} */}
  //               <div className="weight_banner">
  //                 <CachedImage
  //                   url={bannerdata?.bannerimage}
  //                   isNextImage={true}
  //                   nextImageLayout="fill"
  //                   nextImageObjectFit="contain"
  //                 />
  //                 <a href={bannerdata?.buttonUrl}>{bannerdata?.buttonText}</a>
  //               </div>

  //               <div className="weight_banner mobileOnly">
  //                 <p>{bannerdata?.tag}</p>
  //                 <CachedImage
  //                   url={bannerdata?.bannerimageOnly}
  //                   isNextImage={true}
  //                   nextImageLayout="fill"
  //                   nextImageObjectFit="contain"
  //                 />
  //                 <CachedImage
  //                   className="wb_sideicon"
  //                   url={bannerdata?.sideIcon}
  //                   isNextImage={true}
  //                   nextImageLayout="fill"
  //                   nextImageObjectFit="contain"
  //                 />
  //                 <a href={bannerdata?.buttonUrl}>{bannerdata?.buttonText}</a>
  //               </div>

  //               <div className="whatsNewProductContainer">
  //                 <div className="whatsNewProductContainer__overlay" />
  //                 {collection1Section.node.collections.edges[0] && (
  //                   <MemoizedProductList
  //                     products={collection1Section?.node?.collections?.edges[0]?.node?.products?.edges?.map(
  //                       product => product?.node
  //                     )}
  //                     isCarousel={width > 720}
  //                     productListClassname="whatsNewProductContainer__productList"
  //                     from="HomePage"
  //                     ctTitle="Plixlife Homepage"
  //                     // refetch={refetch}
  //                     carouselProps={{
  //                       infinite:
  //                         collection1Section.node.collections.edges[0].node
  //                           .products.edges.length > 3,
  //                       variableWidth: true,
  //                     }}
  //                     mobileCarouselProps={{
  //                       arrows: false,
  //                       dots: true,
  //                       appendDots: handleDots,
  //                     }}
  //                     desktopCarouselProps={{
  //                       arrows: true,
  //                       dots: true,
  //                       appendDots: handleDots,
  //                       slidesToScroll: 1,
  //                     }}
  //                     slidesOnDesktop={3}
  //                     slidesOnTab={2}
  //                     slidesOnMobile={2}
  //                     slidesToScroll={1}
  //                     cardTag={{
  //                       name: collection1SectionData?.title || "",
  //                       tagColor: collection1SectionData?.tagColor,
  //                     }}
  //                     productCardClassname="whatsNewProductContainer__productCard"

  //                     // button={false}
  //                     // priceUl
  //                   />
  //                 )}
  //               </div>
  //             </div>
  //           </div>
  //         </>
  //       )}
  //     </>
  //   );

  // return <> </>;
};

export default React.memo(Collection1New);
