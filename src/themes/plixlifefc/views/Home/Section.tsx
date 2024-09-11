import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";
import Media from "react-media";
import Marquee from "react-fast-marquee";
import {
  ProductHeader,
  ButtonPostion,
} from "@components/molecules/ProductHeader";
import { Card } from "@components/molecules/Card";
import { cardtag } from "@components/molecules/ProductCardPlixlife";
import { Gap } from "@components/atoms/Gap";
import { MyRating } from "@components/atoms/MyRating";
import CardsContainer from "@components/organisms/CardsContainer";
import { useAuth, useAuthState, useCheckout, useWallet } from "@saleor/sdk";
import { META_DEFAULTS } from "Themes/config";
import { largeScreen } from "@styles/constants";
// import GreenArrowRightPlix2 from "images/GreenArrowRightPlix2.png";

import { getMetadataValue } from "@utils/misc";

// @ts-ignore

// @ts-ignore

import MyCustomLink from "@components/next-react/MyCustomLink";

import MemoLeftArrowPlix from "@components/atoms/SvgIcons/LeftArrowPlix";
import MemoRightArrowPlix from "@components/atoms/SvgIcons/RightArrowPlix";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import MemoHalfCirclesPlix from "@components/atoms/SvgIcons/HalfCirclesPlix";
import MemoSideCirlcesPlix from "@components/atoms/SvgIcons/SideCirlcesPlix";
import MemoStarRingsPlix from "@components/atoms/SvgIcons/StarRingsPlix";
import { useWindowWidth } from "@hooks/useWindowWidth";
import Star from "@components/atoms/SvgIcons/Star";
import gtmConfig from "Themes/lib/gtmConfig.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import makeClevertap from "Themes/lib/makeClevertap.js";

import MemoGreenArrowRightPlixTwo from "@components/atoms/SvgIcons/GreenArrowRightPlixTwo";
import { TypedSectionWithoutChildrenQuery } from "./queries";

// @ts-check

const Section: React.FC = () => {
  const [width] = useWindowWidth();
  const handleDots = (dots: any) => {
    dots = dots.slice(0, 3);
    return <ul>{dots}</ul>;
  };

  const { user } = useAuthState();
  // const { getWalletAmount } = useWallet();
  const { getWalletAmount } = useCheckout();

  useEffect(() => {
    if (user) {
      const clevertap = makeClevertap();
      getWalletAmount().then(walletAmount => {
        const ctp = {
          Name: `${user.firstName} ${user.lastName}`,
          Email: user.email,
          Phone: user?.defaultBillingAddress?.phone,
          Identity: user?.defaultBillingAddress?.phone?.replace("+", ""),
          "Net Cashback": walletAmount.data,
        };
        //
        clevertap.onUserLogin.push({
          Site: ctp,
        });
      });
    }
    if (clevertapEvents.pageViews.enable) {
      const clevertap = makeClevertap();
      clevertap.event.push(clevertapEvents.pageViews.value, {
        URL: window.location.href,
        Title: META_DEFAULTS.title,
      });
    }
    if (gtmConfig.pageViews.enable) {
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }
  }, []);

  const BrandLogoSection: React.FC = () => {
    return (
      <>
        <TypedSectionWithoutChildrenQuery
          variables={{
            firstPage: 1,
            name: "Brand Logos",
          }}
        >
          {({ data, loading }) => {
            const brandLogosSection =
              data.section.edges.length && data.section.edges[0];
            const brandLogosSectionData =
              brandLogosSection &&
              getMetadataValue(brandLogosSection.node.metadata, "reviews") &&
              JSON.parse(
                getMetadataValue(brandLogosSection.node.metadata, "reviews")
              );
            if (brandLogosSectionData && !loading)
              return (
                <>
                  {brandLogosSection && (
                    <div className="brandLogosSection">
                      <div className="brandLogosSection__first">
                        <MyRating
                          rating={brandLogosSectionData.star}
                          isReadOnly
                          color="#000"
                        />
                        <div className="brandLogosSection__text">
                          {brandLogosSectionData.number}{" "}
                          <strong>
                            {brandLogosSectionData.star}-Star Reviews
                          </strong>
                        </div>
                      </div>
                      <div className="brandLogosSection__second">
                        <Marquee speed={40}>
                          {brandLogosSection.node.images.edges.map(edge => (
                            <div>
                              <img
                                key={edge.node.id}
                                src={edge.node.url}
                                alt={edge.node.alt}
                              />
                            </div>
                          ))}
                        </Marquee>
                      </div>
                    </div>
                  )}
                </>
              );

            return <> </>;
          }}
        </TypedSectionWithoutChildrenQuery>
      </>
    );
  };

  const BestSellerSectionComponent: React.FC<any> = ({
    bestSellerSection,
    bestSellerSectionNavData,
    bestSellerSectionNavMetaData,
    refetch,
  }) => {
    const [bestSellerActiveId, setBestSellerActiveId] = useState(
      bestSellerSectionNavData && bestSellerSectionNavData.length
        ? bestSellerSectionNavData[0].id
        : ""
    );
    const [bestSellerActiveName, setBestSellerActiveName] = useState<cardtag>({
      name:
        bestSellerSectionNavData && bestSellerSectionNavData.length
          ? bestSellerSectionNavMetaData[0].meta.title
          : "",
      tagColor:
        bestSellerSectionNavData && bestSellerSectionNavData.length
          ? bestSellerSectionNavMetaData[0].meta.tagColor
          : "",
    });
    return (
      <>
        {bestSellerSection && (
          <div className="container">
            <ProductHeader
              heading="Best Sellers"
              headerClass="bestSellerSection"
              navbar={{
                data: bestSellerSectionNavData,
                navbarHandler: (id, text) => {
                  setBestSellerActiveId(id);
                  setBestSellerActiveName({
                    name: bestSellerSectionNavMetaData?.find(
                      data => data.id === id
                    )?.meta.title,
                    tagColor: bestSellerSectionNavMetaData?.find(
                      data => data.id === id
                    )?.meta.tagColor,
                  });
                },
                initialLink: bestSellerSectionNavData[0].text,
              }}
              button={{
                text: "Shop All",
                position: ButtonPostion.WITH_HEADER,
                rightIcon: <MemoGreenArrowRightPlixTwo width="16px" />,
              }}
            />

            <MemoizedProductList
              products={bestSellerSection.node.collections.edges
                .filter(edge => edge.node.id === bestSellerActiveId)[0]
                .node.products.edges.map(product => product.node)}
              isCarousel
              from="HomePage"
              ctTitle="Plixlife Homepage"
              refetch={refetch}
              carouselProps={{
                infinite:
                  bestSellerSection.node.collections.edges.filter(
                    edge => edge.node.id === bestSellerActiveId
                  )[0].node.products.edges.length > 4,
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
            />
          </div>
        )}
      </>
    );
  };

  const BestSellerSection: React.FC = () => {
    return (
      <>
        <TypedSectionWithoutChildrenQuery
          variables={{
            firstPage: 1,
            name: "Best Sellers",
          }}
        >
          {({ data, loading, refetch }) => {
            const bestSellerSection =
              data.section.edges.length && data.section.edges[0];
            const bestSellerSectionNavData =
              bestSellerSection &&
              bestSellerSection.node.collections.edges.map(edge => ({
                text: edge.node.name,
                id: edge.node.id,
              }));

            const bestSellerSectionNavMetaData =
              bestSellerSection &&
              bestSellerSection.node.collections.edges.map(edge => {
                const meta =
                  getMetadataValue(edge.node.metadata, "subNavbarCard") &&
                  JSON.parse(
                    getMetadataValue(edge.node.metadata, "subNavbarCard")
                  );

                return {
                  id: edge.node.id,
                  meta,
                };
              });

            if (bestSellerSection && bestSellerSectionNavData && !loading)
              return (
                <>
                  <BestSellerSectionComponent
                    bestSellerSection={bestSellerSection}
                    bestSellerSectionNavData={bestSellerSectionNavData}
                    bestSellerSectionNavMetaData={bestSellerSectionNavMetaData}
                    refetch={refetch}
                  />
                </>
              );

            return <> </>;
          }}
        </TypedSectionWithoutChildrenQuery>
      </>
    );
  };

  const PlantBasedSection: React.FC = () => {
    return (
      <>
        <TypedSectionWithoutChildrenQuery
          variables={{
            firstPage: 1,
            name: "Plant based suppliments",
          }}
        >
          {({ data, loading }) => {
            const plantBasedSection =
              data.section.edges.length && data.section.edges[0];
            const plantBasedSectionData =
              plantBasedSection &&
              getMetadataValue(plantBasedSection.node.metadata, "cardData") &&
              JSON.parse(
                getMetadataValue(plantBasedSection.node.metadata, "cardData")
              );

            const plantBasedSectionAdditionalInfoData =
              plantBasedSection &&
              getMetadataValue(
                plantBasedSection.node.metadata,
                "additionalInfo"
              ) &&
              JSON.parse(
                getMetadataValue(
                  plantBasedSection.node.metadata,
                  "additionalInfo"
                )
              );
            if (plantBasedSection && plantBasedSectionData && !loading)
              return (
                <>
                  {plantBasedSection && (
                    <div className="plantBasedSection">
                      <div className="plantBasedSection__container">
                        <div className="plantBasedSection__container__left">
                          <Card
                            cardClass="plantBasedSection__container__left__card"
                            content={{
                              ...plantBasedSectionData,
                              description: (
                                <div>
                                  <div
                                    style={{
                                      fontSize: "14px",
                                      lineHeight: "160%",
                                      color: "rgba(33, 33, 33, 0.7)",
                                    }}
                                  >
                                    {" "}
                                    {plantBasedSectionData.description}
                                  </div>
                                  {plantBasedSectionAdditionalInfoData && (
                                    <CardsContainer
                                      cardClass="plantBasedSection__container__left__card__additionalInfoCardsContainer__card"
                                      containerClass="plantBasedSection__container__left__card__additionalInfoCardsContainer"
                                      data={plantBasedSectionAdditionalInfoData.map(
                                        data => ({
                                          ...data,
                                          title: (
                                            <div className="plantBasedSection__container__left__card__additionalInfoCardsContainer__card__title__textContainer">
                                              <div> {data.title.line1} </div>
                                              <div> {data.title.line2} </div>
                                            </div>
                                          ),
                                        })
                                      )}
                                    />
                                  )}
                                </div>
                              ),
                            }}
                          />
                        </div>
                        <img
                          className="plantBasedSection__container__right"
                          src={plantBasedSection.node?.backgroundImage?.url}
                          alt="plant"
                        />
                      </div>
                    </div>
                  )}
                </>
              );

            return <> </>;
          }}
        </TypedSectionWithoutChildrenQuery>
      </>
    );
  };

  const Collection1Section: React.FC = () => {
    return (
      <>
        <TypedSectionWithoutChildrenQuery
          variables={{
            firstPage: 1,
            name: "Collection 1",
          }}
        >
          {({ data, loading, refetch }) => {
            const collection1Section =
              data.section.edges.length && data.section.edges[0];
            const collection1SectionData =
              collection1Section &&
              getMetadataValue(
                collection1Section.node?.collections.edges[0].node.metadata,
                "subNavbarCard"
              ) &&
              JSON.parse(
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
              JSON.parse(
                getMetadataValue(
                  collection1Section.node?.metadata,
                  "buttonDetails"
                )
              );
            if (collection1Section && collection1SectionData && !loading)
              return (
                <>
                  {collection1Section && (
                    <>
                      <div className="ourInsta-main-container boxShadowContainer">
                        <div className="whatsNewContent">
                          {collection1Section.node?.backgroundImage?.url && (
                            <Card
                              content={{
                                image:
                                  collection1Section.node?.backgroundImage?.url,
                                button: {
                                  text: `${
                                    collection1SectionButton?.text || "Shop All"
                                  }`,
                                  link: `${
                                    collection1SectionButton?.link ||
                                    "/page/shop"
                                  }`,
                                },
                              }}
                              cardClass="whatsNewLeftCard"
                            />
                          )}
                          <div className="whatsNewProductContainer">
                            <div className="whatsNewProductContainer__overlay" />
                            {collection1Section.node.collections.edges[0] && (
                              <MemoizedProductList
                                products={collection1Section.node.collections.edges[0].node.products.edges.map(
                                  product => product.node
                                )}
                                isCarousel={width > 720}
                                productListClassname="whatsNewProductContainer__productList"
                                from="HomePage"
                                ctTitle="Plixlife Homepage"
                                refetch={refetch}
                                carouselProps={{
                                  infinite:
                                    collection1Section.node.collections.edges[0]
                                      .node.products.edges.length > 3,
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

            return <> </>;
          }}
        </TypedSectionWithoutChildrenQuery>
      </>
    );
  };

  const NutritionSection: React.FC = () => {
    return (
      <>
        <TypedSectionWithoutChildrenQuery
          variables={{
            firstPage: 1,
            name: "Nutritionist",
          }}
        >
          {({ data, loading }) => {
            const nutritionSection =
              data.section.edges.length && data.section.edges[0];
            const nutritionSectionData =
              nutritionSection &&
              getMetadataValue(nutritionSection.node.metadata, "banner") &&
              JSON.parse(
                getMetadataValue(nutritionSection.node.metadata, "banner")
              );

            if (nutritionSection && nutritionSectionData && !loading)
              return (
                <>
                  {nutritionSection && (
                    <div className="nutritionSection container">
                      <Media
                        query={{ minWidth: largeScreen }}
                        render={() => (
                          <img
                            src={nutritionSectionData?.imageWeb}
                            alt="nutrition"
                          />
                        )}
                      />
                      <Media
                        query={{ maxWidth: largeScreen }}
                        render={() => (
                          <img
                            src={nutritionSectionData?.imageMobile}
                            alt="nutrition"
                          />
                        )}
                      />
                      <button className="nutritionSection-btn">
                        <MyCustomLink href={nutritionSectionData?.link || "/"}>
                          {nutritionSectionData?.buttonText || "Email Now"}
                        </MyCustomLink>
                      </button>
                    </div>
                  )}
                </>
              );

            return <> </>;
          }}
        </TypedSectionWithoutChildrenQuery>
      </>
    );
  };

  const Collection2Section: React.FC = () => {
    return (
      <>
        <TypedSectionWithoutChildrenQuery
          variables={{
            firstPage: 1,
            name: "Collection 2",
          }}
        >
          {({ data, loading, refetch }) => {
            const collection2Section =
              data.section.edges.length && data.section.edges[0];
            const collection2SectionData =
              collection2Section &&
              getMetadataValue(
                collection2Section.node?.collections.edges[0]?.node.metadata,
                "subNavbarCard"
              ) &&
              JSON.parse(
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
              JSON.parse(
                getMetadataValue(
                  collection2Section.node?.metadata,
                  "buttonDetails"
                )
              );
            if (collection2Section && collection2SectionData && !loading)
              return (
                <>
                  {collection2Section && (
                    <>
                      <div className="ourInsta-main-container boxShadowContainer">
                        <div className="whatsNewContent">
                          {collection2Section.node?.backgroundImage?.url && (
                            <Card
                              content={{
                                image:
                                  collection2Section.node?.backgroundImage?.url,
                                button: {
                                  text: `${
                                    collection2SectionButton?.text || "Shop All"
                                  }`,
                                  link: `${
                                    collection2SectionButton?.link ||
                                    "/page/shop"
                                  }`,
                                },
                              }}
                              cardClass="whatsNewLeftCard"
                            />
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
                                ctTitle="Plixlife Homepage"
                                refetch={refetch}
                                carouselProps={{
                                  infinite:
                                    collection2Section.node.collections.edges[0]
                                      .node.products.edges.length > 3,
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

            return <> </>;
          }}
        </TypedSectionWithoutChildrenQuery>
      </>
    );
  };

  const TestimonialSection: React.FC = () => {
    return (
      <>
        <TypedSectionWithoutChildrenQuery
          variables={{
            firstPage: 1,
            name: "Testimonials",
          }}
        >
          {({ data, loading }) => {
            const testimonialSection =
              data.section.edges.length && data.section.edges[0];
            const testimonialData =
              testimonialSection &&
              getMetadataValue(
                testimonialSection.node.metadata,
                "cardContainerData"
              ) &&
              JSON.parse(
                getMetadataValue(
                  testimonialSection.node.metadata,
                  "cardContainerData"
                )
              );

            if (testimonialSection && testimonialData && !loading)
              return (
                <>
                  {testimonialSection && (
                    <>
                      <div className="testimonialSection container">
                        <div className="testimonialSection__svg1">
                          <MemoHalfCirclesPlix fontSize="64px" />
                        </div>
                        <div className="testimonialSection__svg2">
                          <MemoSideCirlcesPlix fontSize="80px" />
                        </div>
                        <ProductHeader
                          heading="What the pros say"
                          headerClass="testimonialHeader"
                        />
                        <div className="testimonialSection__container">
                          <CardsContainer
                            data={testimonialData.map(testimonial => ({
                              ...testimonial,
                              title: (
                                <>
                                  <div>{testimonial.title.name}</div>
                                  <div>{testimonial.title.remark}</div>
                                  <MyRating
                                    rating={parseInt(
                                      testimonial.title.star,
                                      10
                                    )}
                                    isReadOnly
                                  />
                                </>
                              ),
                            }))}
                            cardClass=""
                            containerClass="testimonialSection__container__cardsContainer"
                            isCarousel={{
                              slidesOnDesktop: 1,
                              slidesOnTab: 1,
                              slidesOnMobile: 1,
                              rightArrow: (
                                <MemoRightArrowPlix fontSize="52px" />
                              ),
                              leftArrow: <MemoLeftArrowPlix fontSize="52px" />,
                            }}
                            carouselProps={{
                              className: "testimonial-cerousel",
                              defaultControlsConfig: {
                                pagingDotsClassName: "pagingDotsClassName",
                              },
                              wrapAround: true,
                            }}
                            mobileCarouselProps={{
                              renderCenterLeftControls: () => null,
                              renderCenterRightControls: () => null,
                              wrapAround: true,
                            }}
                            tabCarouselProps={{
                              renderCenterLeftControls: () => null,
                              renderCenterRightControls: () => null,
                              wrapAround: true,
                            }}
                            desktopCarouselProps={{
                              wrapAround: true,
                            }}
                          >
                            {testimonialData.map(testimonial => (
                              <div className="testimonialSection__container__div ">
                                <Card
                                  cardClass="testimonialSection__container__div__card"
                                  content={{
                                    ...testimonial,
                                    image: (
                                      <div>
                                        <img
                                          src={testimonial.image}
                                          alt="testimonial"
                                        />
                                        <MemoStarRingsPlix fontSize="64px" />
                                      </div>
                                    ),
                                    title: (
                                      <div className="testimonialSection__container__div__card__title__container">
                                        <div className="testimonialSection__container__div__card__title__container__heading1">
                                          {" "}
                                          {testimonial.title.name}
                                        </div>
                                        <div className="testimonialSection__container__div__card__title__container__heading2">
                                          {" "}
                                          {testimonial.title.remark}
                                        </div>
                                        <MyRating
                                          rating={parseInt(
                                            testimonial.title.star,
                                            10
                                          )}
                                          isReadOnly
                                        />
                                      </div>
                                    ),
                                  }}
                                />
                              </div>
                            ))}
                          </CardsContainer>
                        </div>
                      </div>
                    </>
                  )}
                </>
              );

            return <> </>;
          }}
        </TypedSectionWithoutChildrenQuery>
      </>
    );
  };

  const TextStripSection: React.FC = () => {
    return (
      <>
        <TypedSectionWithoutChildrenQuery
          variables={{
            firstPage: 1,
            name: "Text Strip",
          }}
        >
          {({ data, loading }) => {
            const textStripSection =
              data.section.edges.length && data.section.edges[0];
            const textStripSectionData =
              textStripSection &&
              getMetadataValue(textStripSection.node.metadata, "testData") &&
              JSON.parse(
                getMetadataValue(textStripSection.node.metadata, "testData")
              );

            if (textStripSection && textStripSectionData && !loading)
              return (
                <>
                  {textStripSection && (
                    <div className="textStripSection">
                      <Marquee speed={40}>
                        {textStripSectionData.map(text => (
                          <div className="textItem">
                            <Star />
                            <span>{text}</span>
                          </div>
                        ))}
                        {textStripSectionData.map(text => (
                          <div className="textItem">
                            <Star />
                            <span>{text}</span>
                          </div>
                        ))}
                      </Marquee>
                    </div>
                  )}
                </>
              );

            return <> </>;
          }}
        </TypedSectionWithoutChildrenQuery>
      </>
    );
  };

  return (
    <>
      <BrandLogoSection />

      <Gap size="1rem" largeScreenSize="4vw" />

      <BestSellerSection />

      <Gap size="1rem" largeScreenSize="4vw" />

      <PlantBasedSection />

      <Gap size="1rem" largeScreenSize="4vw" />

      <Collection1Section />

      <Gap size="1rem" />

      <NutritionSection />

      <Gap size="1rem" />

      <Collection2Section />

      <Gap size="1rem" />

      <TestimonialSection />

      <TextStripSection />
    </>
  );
};

export default React.memo(Section);
