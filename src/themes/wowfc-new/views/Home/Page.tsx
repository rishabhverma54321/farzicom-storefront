import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./scss/index.module.scss";

// import "./scss/index.scss";

import Media from "react-media";
import CardsContainer from "@components/organisms/CardsContainer";

import HomeShowcase from "@components/organisms/HomeShowcase";
import { useAuthState, useCart, useCheckout, useWallet } from "@saleor/sdk";
import { META_DEFAULTS } from "Themes/config";
import { mediumScreen, smallScreen } from "@styles/constants";
import { IsJsonString } from "@utils/IsJSON";

import { getMetadataValue, useImageURLReplaceWithCDN } from "@utils/misc";

import {
  generateCollectionUrl,
  getUtmData,
  getGclid,
  loadScript,
} from "@temp/core/utils";

// @ts-ignore
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { ProductsList_section_edges_node_collections_edges_node } from "./gqlTypes/ProductsList";
import LiveOrganic from "../components/LiveOrganic/LiveOrganic";
import { byConcernHeader } from "../../imageWithTextAssets";
// @ts-check
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import HomeBanner from "@components/molecules/HomeBanner";
import ProductHeader, {
  ButtonPostion,
} from "@components/molecules/ProductHeader";
import Card from "@components/molecules/Card";
import { Gap } from "@components/atoms/Gap";
import CustomizeButton from "@components/atoms/CustomizeButton";
import CareAccordian from "@components/organisms/CareAccordian";
import { useCustomLocation } from "@hooks/useCustomLocation";
import useMediaQuery from "@hooks/useMediaQuery";
import { HomePageQueryNext } from "./gqlTypes/HomePageQueryNext";
import BlogPost from "@components/organisms/BlogPost";
import { ButtonNext } from "@components/farzicom-ui-kit/ButtonNext";
import { DoubleArrow } from "@components/atoms/SvgIcons";
import { useCustomHistory } from "@hooks/useCustomHistory";
import MemoRightArrowSVG2 from "@components/atoms/SvgIcons/RightArrowSVG2";
import Image from "next/image";
import MyCustomLink from "@components/next-react/MyCustomLink";
import LazyLoad from "react-lazyload";

const Page: React.FC<{
  data: HomePageQueryNext;
}> = ({ data }) => {
  const { user } = useAuthState();
  const { items } = useCart();
  const { getWalletAmount } = useCheckout();

  const { pathname } = useCustomLocation();
  const history = useCustomHistory();
  const [byConcernData, setByConcernData] = useState("ALL");

  useEffect(() => {
    if (user) {
      const clevertap = makeClevertap();
      // getWalletAmount().then(walletAmount => {
      //   const ctp = {
      //     Name: `${user.firstName} ${user.lastName}`,
      //     Email: user.email,
      //     Phone: user?.defaultBillingAddress?.phone,
      //     Identity: user?.defaultBillingAddress?.phone,
      //     "Net Cashback": walletAmount.data,
      //   };

      //   clevertap.onUserLogin.push({
      //     Site: ctp,
      //   });
      // });
    }
    const utm_data = getUtmData(pathname);
    if (clevertapEvents.pageVisit.enable) {
      const clevertap = makeClevertap();
      clevertap.event.push(clevertapEvents.pageVisit.value, {
        gaUserId: getGclid(),
        clickSource: utm_data,
        timeStamp: Date.now(),
        pageTitle: document.title,
        customerEmail: user?.email,
        customerPhone: user?.defaultBillingAddress?.phone,
        quantity: items?.length || 0,
        URL: window.location.href,
      });
    }
    if (gtmConfig.pageViews.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
        ecommerce: {
          "Page Views": {
            URL: window.location.href,
            Title: META_DEFAULTS.title,
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("load", () => {
      const elsightScript = loadScript(
        "https://static.elfsight.com/platform/platform.js"
      );

      return () => {
        document.body.removeChild(elsightScript);
      };
    });
  }, []);

  const getBGColor = (
    collection: ProductsList_section_edges_node_collections_edges_node
  ): any => {
    const fromMetadata = collection.metadata.filter(item => {
      if (item.key === "color") return item.value;
    });
    const color = fromMetadata.length > 0 ? fromMetadata[0].value : "white";
    return color;
  };

  const SubNavbar = () => {
    const isBreakpoint = useMediaQuery(mediumScreen);

    const metaData = data.subnavbar.edges[0]?.node?.metadata;

    const collectionsValue =
      getMetadataValue(metaData, "collections") &&
      JSON.parse(getMetadataValue(metaData, "collections"));

    const assignedCollections =
      data.subnavbar.edges[0]?.node?.collections?.edges;

    const subNavbarData = collectionsValue?.map(item => {
      const assignedId = assignedCollections.filter(element => {
        return element?.node?.name == item?.name;
      })[0]?.node?.id;

      return {
        image: item?.image,
        title: item?.name,
        navigation: item?.navigation,
      };
    });

    if (subNavbarData && isBreakpoint) {
      return (
        <div className="container wow-subnavbar">
          <CardsContainer
            data={subNavbarData}
            cardClass="subNavbarCard"
            containerClass="subNavbarContainer"
            isCarousel={{
              slidesOnDesktop: 4,
              slidesOnTab: 4,
              slidesOnMobile: 4,
            }}
            mobileCarouselProps={{
              renderCenterLeftControls: () => null,
              renderCenterRightControls: () => null,
            }}
            carouselProps={{
              renderBottomCenterControls: () => null,
            }}
          >
            {subNavbarData.map(item => {
              const imageUrlImgixScr = useImageURLReplaceWithCDN(item?.image);

              return (
                <div className={styles.subNavbarContainer}>
                  <MyCustomLink href={item?.navigation}>
                    <div>
                      {imageUrlImgixScr && (
                        <Image
                          src={imageUrlImgixScr}
                          width="60px"
                          height="60px"
                          priority
                          className={styles.subNavbarImage}
                        />
                      )}
                      {item?.title && (
                        <div className={styles.subNavbarTitle}>
                          {" "}
                          {item?.title}{" "}
                        </div>
                      )}
                    </div>
                  </MyCustomLink>
                </div>
              );
            })}
          </CardsContainer>
        </div>
      );
    }

    return <> </>;
  };
  const HomepageIcons = () => {
    const metaData = data.homePageIcons.edges[0].node.metadata;
    const iconData =
      getMetadataValue(metaData, "icons") &&
      JSON.parse(getMetadataValue(metaData, "icons"));
    const headerData =
      getMetadataValue(metaData, "header") &&
      JSON.parse(getMetadataValue(metaData, "header"));

    if (iconData)
      return (
        <div className="homepageIcons">
          <LiveOrganic
            bg="#FDF7F1"
            liveOrganicData={iconData}
            header={headerData}
          />
        </div>
      );
    return <> </>;
  };

  const FeaturedCollection = () => {
    const collectionsOrder =
      getMetadataValue(
        data.featuredCollections.edges[0]?.node?.metadata,
        "collection_order"
      ) &&
      JSON.parse(
        getMetadataValue(
          data.featuredCollections.edges[0]?.node?.metadata,
          "collection_order"
        )
      );

    return collectionsOrder.map(orderItem => {
      const FilteredCollection = data.featuredCollections.edges[0]?.node?.collections.edges.filter(
        ({ node: collection }, index) => {
          return (
            ` ${orderItem.name}` == collection.name ||
            orderItem.name == collection.name
          );
        }
      );

      return FilteredCollection?.map(({ node: collection }, index) => (
        <React.Fragment key={index}>
          <HomeShowcase
            id={collection.id}
            url={generateCollectionUrl(collection.id, collection.name)}
            name={collection.name}
            products={collection?.products}
            color={getBGColor(collection)}
            ctTitle={META_DEFAULTS?.title}
            metadata={collection.metadata}
            className="product-list-class"
            productCardButton
            productCardClassname="lotusNewCardClass"
            key={index}
            button={{
              text: "Show More",
              position: ButtonPostion.WITH_HEADER,
              link: generateCollectionUrl(collection.id, collection.name),
              rightIcon: (
                <MemoRightArrowSVG2 fontSize="18px" stroke="#56774D" />
              ),
            }}
          />
        </React.Fragment>
      ));
    });
  };

  const OrganicRanges = () => {
    return (
      <>
        {data.ourOrganicRanges.edges.map((item, index) => {
          if (item?.node?.name === "Our Organic Ranges") {
            // const organicData = JSON.parse(JSON.parse(item.node.metadata));

            const organicData =
              IsJsonString(
                getMetadataValue(item?.node?.metadata, "organicData")
              ) &&
              JSON.parse(getMetadataValue(item?.node?.metadata, "organicData"));
            const organicMobileData =
              IsJsonString(
                getMetadataValue(item?.node?.metadata, "organicMobileData")
              ) &&
              JSON.parse(
                getMetadataValue(item?.node?.metadata, "organicMobileData")
              );
            const organicTitle =
              IsJsonString(getMetadataValue(item?.node?.metadata, "title")) &&
              JSON.parse(getMetadataValue(item?.node?.metadata, "title"));
            return (
              <div className="container" key={index}>
                <ProductHeader
                  heading={organicTitle?.text || item?.node.name}
                  headerClass="organicHeader"
                />
                {organicMobileData && (
                  <Media
                    query={{ maxWidth: smallScreen }}
                    render={() => (
                      <CardsContainer
                        data={organicMobileData}
                        cardClass="organicCard"
                        containerClass="organicContainer"
                      />
                    )}
                  />
                )}
                {organicData && (
                  <Media
                    query={{ minWidth: smallScreen }}
                    render={() => (
                      <CardsContainer
                        data={organicData}
                        cardClass="organicCard"
                        containerClass="organicContainer"
                      />
                    )}
                  />
                )}
              </div>
            );
          }
        })}
      </>
    );
  };

  const WhatsNew = () => {
    return (
      <>
        {data.whatsNew.edges.map((item, index) => {
          if (item?.node.name === "Whats New") {
            // const whatsNewData = JSON.parse(JSON.parse(item.node.metadata));
            const whatsNewData =
              getMetadataValue(item?.node.metadata, "whatsNewData") &&
              JSON.parse(getMetadataValue(item?.node.metadata, "whatsNewData"));
            const WhatsNewLeftData = {
              ...whatsNewData.left,
              description: "",
            };
            const whatsNewTitle =
              getMetadataValue(item?.node.metadata, "title") &&
              JSON.parse(getMetadataValue(item?.node.metadata, "title"));

            return (
              <div className="ourInsta-main-container" key={index}>
                <ProductHeader
                  heading={whatsNewTitle?.text || item?.node.name}
                  title={whatsNewTitle?.subTitle || ""}
                  headerClass="organicHeader"
                />

                <div className="whatsNewContent">
                  {WhatsNewLeftData && (
                    <Card
                      content={WhatsNewLeftData}
                      cardClass="whatsNewLeftCard"
                    />
                  )}
                  <div className="whatsNewProductContainer">
                    {data.whatsNew.edges[0]?.node.collections.edges[0] && (
                      <MemoizedProductList
                        products={data.whatsNew.edges[0]?.node.collections.edges[0]?.node.products.edges.map(
                          product => product?.node
                        )}
                        isCarousel
                        from="Wishlist"
                        ctTitle="Buywow Homepage"
                        mobileCarouselProps={{ arrows: false }}
                        slidesOnDesktop={2}
                        productCardClassname="lotusNewCardClass"
                        button={false}
                        bg="#fdf7f1"
                        priceUl
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </>
    );
  };

  const PurestCare = () => {
    return (
      <>
        {data.purestCare.edges.map((item, index) => {
          if (item?.node.name === "The purest care for pure beauty") {
            const pureCareData =
              getMetadataValue(item?.node.metadata, "accordian") &&
              JSON.parse(getMetadataValue(item?.node.metadata, "accordian"));
            const careTitleDescription =
              getMetadataValue(item?.node.metadata, "titleDescription") &&
              JSON.parse(
                getMetadataValue(item?.node.metadata, "titleDescription")
              );
            const careButton =
              getMetadataValue(item?.node.metadata, "button") &&
              JSON.parse(getMetadataValue(item?.node.metadata, "button"));

            const careTitle =
              getMetadataValue(item?.node.metadata, "title") &&
              JSON.parse(getMetadataValue(item?.node.metadata, "title"));

            const rightCard =
              getMetadataValue(item?.node.metadata, "rightCard") &&
              JSON.parse(getMetadataValue(item?.node.metadata, "rightCard"));
            return (
              <div className="care-main-container" key={index}>
                <div>
                  <ProductHeader
                    title={careTitle?.subText || ""}
                    heading={careTitle?.text || item?.node.name}
                    headerClass="testimonialHeader"
                  />
                  <Media
                    query={{ maxWidth: mediumScreen }}
                    render={() => (
                      <>
                        {rightCard && <Card content={rightCard} cardClass="" />}
                      </>
                    )}
                  />
                  {careTitleDescription && (
                    <Card
                      content={careTitleDescription}
                      cardClass="careContentCard"
                    />
                  )}
                  <CareAccordian data={pureCareData} />
                  {/* <CustomizeButton
                text={careButton?.title || "READ MORE"}
                link={careButton?.navigation || ""}
                rightIcon={careButton?.rightIcon || "true"}
                buttonClass="careButton"
              /> */}
                </div>
                <Media
                  query={{ minWidth: mediumScreen }}
                  render={() => (
                    <>
                      {rightCard && (
                        <Card content={rightCard} cardClass="careRightCard" />
                      )}
                    </>
                  )}
                />
              </div>
            );
          }
        })}
      </>
    );
  };

  const ByConcern = () => {
    const concernData = data.byConcern.edges[0]?.node.collections.edges
      .filter(edge => {
        if (byConcernData === "ALL") return true;
        if (
          getMetadataValue(edge?.node.metadata, "category") &&
          getMetadataValue(edge?.node.metadata, "category").toUpperCase() ===
            byConcernData
        )
          return true;
      })
      .map(item => {
        return {
          image: `${
            item?.node?.backgroundImage
              ? item?.node?.backgroundImage.url
              : "/images/no-photo.svg"
          }`,
          title: `${item?.node?.name}`,
          navigation: generateCollectionUrl(item?.node?.id, item?.node?.name),
        };
      });
    const concernHandler = (id: string, text: string) => {
      setByConcernData(text);
    };

    if (concernData && concernData?.length)
      return (
        <div className="container" style={{ backgroundColor: "#FDF7F1" }}>
          <ProductHeader
            heading={data.byConcern.edges[0]?.node.name}
            title=""
            headerClass="byconcernHeader"
            navbar={{
              ...byConcernHeader.navbar,
              navbarHandler: concernHandler,
            }}
          />
          <CardsContainer
            data={concernData}
            containerClass="byconcernContainer"
            cardClass="byconcernCard"
          />
        </div>
      );
    return <> </>;
  };

  const CustomerSay = () => {
    return (
      <>
        {data.customersSay.edges.map((item, index) => {
          if (item?.node.name === "What our customer’s say") {
            const testimonialData =
              getMetadataValue(item?.node.metadata, "testimonialData") &&
              JSON.parse(
                getMetadataValue(item?.node.metadata, "testimonialData")
              );

            const testimonialLeftData =
              testimonialData && testimonialData.leftCard;

            const testimonialTitle =
              getMetadataValue(item?.node.metadata, "title") &&
              JSON.parse(getMetadataValue(item?.node.metadata, "title"));

            return testimonialData ? (
              <div
                className="ourInsta-main-container"
                style={{ backgroundColor: "white" }}
                key={index}
              >
                <ProductHeader
                  heading={testimonialTitle?.text || item?.node.name}
                  title={testimonialTitle?.subTitle || ""}
                  headerClass="testimonialHeader"
                />
                <div className="sub-testimonial-container">
                  {/* {testimonialLeftData && (
                    <Card
                      content={testimonialLeftData}
                      cardClass="testimonialLeftCard"
                    />
                  )} */}
                  {testimonialData && (
                    <CardsContainer
                      data={testimonialData.testimonials}
                      cardClass="testimonialRightCard"
                      containerClass="o testimonialRightCardContainer"
                      isCarousel={{
                        slidesOnDesktop: 1,
                        slidesOnTab: 1,
                        slidesOnMobile: 1,
                      }}
                      carouselProps={{
                        className: "testimonial-cerousel",
                        wrapAround: true,
                      }}
                      mobileCarouselProps={{
                        // renderCenterLeftControls: () => null,
                        // renderCenterRightControls: () => null,
                        wrapAround: true,
                      }}
                      desktopCarouselProps={{
                        wrapAround: true,
                      }}
                    />
                  )}
                </div>
              </div>
            ) : (
              <></>
            );
          }
        })}
      </>
    );
  };

  const InstaPost = () => {
    return (
      <>
        {data.instagramShots.edges.map((item, index) => {
          if (item?.node.name === "Instagram Shots") {
            const instagramData =
              getMetadataValue(item?.node.metadata, "instagramData") &&
              JSON.parse(
                getMetadataValue(item?.node.metadata, "instagramData")
              );

            const instagramIcon =
              getMetadataValue(item?.node.metadata, "instagramIconMobile") &&
              JSON.parse(
                getMetadataValue(item?.node.metadata, "instagramIconMobile")
              );

            const instagramHeader =
              getMetadataValue(item?.node.metadata, "header") &&
              JSON.parse(getMetadataValue(item?.node.metadata, "header"));

            const instaheader = {
              heading: "Our Instagram Shots",
              title: "Hey!",
              button: {
                text: `${instagramIcon?.text}`,
                link: `${instagramIcon?.link}`,
                leftIcon: "true",
                rightIcon: "true",
              },
            };

            return (
              <div
                className="ourInsta-main-container elfsight-container"
                key={index}
              >
                <ProductHeader
                  key={index}
                  heading={instagramHeader?.title || item?.node.name}
                  title={instagramHeader?.subTitle || ""}
                  headerClass="ourInstaHeader"
                  button={{
                    text: "lotus_organicsplus",
                    link: "https://www.instagram.com/lotus_organicsplus/",
                    leftIcon: "true",
                    rightIcon: "true",
                    position: ButtonPostion.WITH_FILTERS,
                  }}
                />
                <div className="elfsight-app-39c67339-bfae-46c2-825f-c17026a1354e"></div>

                <Media
                  query={{ maxWidth: "720px" }}
                  render={() => (
                    <CustomizeButton
                      text={instaheader.button.text}
                      leftIcon={instaheader.button.leftIcon}
                      rightIcon={instaheader.button.rightIcon}
                      link={instaheader.button.link}
                      buttonClass="instBottomButton"
                    />
                  )}
                />
              </div>
            );
          }
        })}
      </>
    );
  };

  const BlogPostSection = () => {
    const blogsSection =
      data?.blogsSection?.edges.length && data.blogsSection.edges[0];
    const blogsSectionAPI =
      blogsSection &&
      getMetadataValue(blogsSection.node.metadata, "api") &&
      JSON.parse(getMetadataValue(blogsSection.node.metadata, "api"));

    const blogsSectionData =
      blogsSection &&
      getMetadataValue(blogsSection.node.metadata, "data") &&
      JSON.parse(getMetadataValue(blogsSection.node.metadata, "data"));

    const blogPageURL =
      blogsSection &&
      getMetadataValue(blogsSection.node.metadata, "blogPageURL") &&
      JSON.parse(getMetadataValue(blogsSection.node.metadata, "blogPageURL"));

    if (blogsSection && blogsSectionAPI)
      return (
        <>
          <BlogPost
            apiEndpoint={
              blogsSectionAPI ||
              "https://wow.health/blog/wp-json/wp/v2/posts?_embed"
            }
            headerData={blogsSectionData}
            blogPageURL={blogPageURL}
          />
        </>
      );

    return <> </>;
  };

  interface CountUpProps {
    number: number;
    duration: number;
  }

  const CountUp: React.FC<CountUpProps> = ({ number, duration }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = number;
      // if zero, return
      if (start === end) return;

      // find duration per increment
      let totalMilSecDur = duration;
      let incrementTime = (totalMilSecDur / end) * 1000;

      // timer increments start counter
      // then updates count
      // ends if start reaches end
      let timer = setInterval(() => {
        start += 1000;
        setCount(start);

        if (start >= end) {
          clearInterval(timer);
          setCount(number);
        }
      }, incrementTime);
    }, [number, duration]);

    return <>{count.toLocaleString()}</>;
  };

  const SeedSection = () => {
    const metadata =
      data?.seedSection?.edges?.length &&
      data.seedSection.edges[0].node?.metadata;
    const parseJson = (value: any) => {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    };

    const numberOfSeeds =
      getMetadataValue(metadata, "numberOfSeeds") &&
      parseJson(getMetadataValue(metadata, "numberOfSeeds"));

    const banners =
      getMetadataValue(metadata, "banners") &&
      parseJson(getMetadataValue(metadata, "banners"));

    const gif =
      getMetadataValue(metadata, "gif") &&
      parseJson(getMetadataValue(metadata, "gif"));

    const fullWidthCarouselData =
      getMetadataValue(metadata, "fullWidthCarousel") &&
      parseJson(getMetadataValue(metadata, "fullWidthCarousel"));

    const rightCarouselData =
      getMetadataValue(metadata, "rightCarouselData") &&
      parseJson(getMetadataValue(metadata, "rightCarouselData"));

    const wowGreenHandLogo =
      getMetadataValue(metadata, "wowGreenHandLogo") &&
      parseJson(getMetadataValue(metadata, "wowGreenHandLogo"));

    if (data?.seedSection && metadata) {
      return (
        <div className="container">
          <div
            className="heroBanner"
            style={{
              background: `url(${banners?.primary})`,
            }}
          >
            <Card
              content={{
                image: wowGreenHandLogo,
                title: "NATURE IS IN OUR NATURE",
                description:
                  "With the goal of shipping 1 crore seed pouches with every website purchase, our Green Hands Initiative is a conscious step towards a sustainable future.",
              }}
              cardClass="heroBannerContent"
            />

            {numberOfSeeds ? (
              <Card
                content={{
                  title: (
                    <p>
                      <CountUp
                        number={Number(numberOfSeeds.replace(/,/g, ""))}
                        duration={1}
                      />
                    </p>
                  ),
                  description: "SEEDS SHIPPED",
                }}
                cardClass="heroBannerSeeds"
              />
            ) : (
              <></>
            )}

            <div className={styles.buttonContainer}>
              <ButtonNext
                text="View More"
                rightIcon={<DoubleArrow stroke="#fff" />}
                handleClick={() => history.push("/page/wowgreen")}
                variant={1}
                customStyles={styles}
              />
            </div>

            {/* <div className="arrowContainer">
              <a href="#second-para">
                <i className="angle-double-down"></i>
              </a>
            </div> */}
          </div>
        </div>
      );
    }
    return <> </>;
  };
  return (
    <>
      {/* <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script> */}

      <div className="wow-subnavbar">
        <SubNavbar />
      </div>

      <HomeBanner
        carouselTransitionTime={1000}
        banners={data.banners.edges}
        preventMovementUntilSwipeScrollTolerance
        swipeScrollTolerance={30}
      />
      <Gap size="1rem" largeScreenSize="4vw" />

      {/* <HomepageIcons /> */}
      <FeaturedCollection />
      <Gap size="1rem" largeScreenSize="4vw" />

      <OrganicRanges />
      <Gap size="1rem" largeScreenSize="4vw" />

      <WhatsNew />
      <Gap size="1rem" largeScreenSize="4vw" />

      <PurestCare />
      <Gap size="1rem" largeScreenSize="4vw" />

      <ByConcern />
      <Gap size="1rem" largeScreenSize="4vw" />

      <CustomerSay />
      <Gap size="1rem" largeScreenSize="4vw" />

      <LazyLoad offset={100} height={400}>
        <InstaPost />
        <Gap size="1rem" largeScreenSize="4vw" />
      </LazyLoad>

      <LazyLoad offset={100}>
        <BlogPostSection />
        <Gap size="1rem" largeScreenSize="4vw" />
      </LazyLoad>

      <LazyLoad offset={100} height={400}>
        <SeedSection />
        <Gap size="1rem" largeScreenSize="4vw" />
      </LazyLoad>
    </>
  );
};

export default Page;
