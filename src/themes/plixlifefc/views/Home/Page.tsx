import React, { useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// FIXME:NextJs Make it a CSS module
// import "../Home/scss/index.scss";
import Marquee from "react-fast-marquee";
// import {
//   ProductHeader,
//   ButtonPostion,
// } from "@components/molecules/ProductHeader";
import { cardtag } from "@components/molecules/ProductCardPlixlife";
import { Card } from "@components/molecules/Card";
import { CachedImage } from "@components/molecules/CachedImage";
import { Gap } from "@components/atoms/Gap";
// import { MyRating } from "@components/atoms/MyRating";
import CardsContainer from "@components/organisms/CardsContainer";
import { META_DEFAULTS } from "Themes/config";
import LazyLoad from "react-lazyload";
import {
  getMetadataValue,
  imageURLReplaceWithCDN,
  parseJson,
  customEventTrigger,
  isMember,
  bannerImpressionDatalayer,
  bannerClickDatalayer,
} from "@utils/misc";
// @ts-ignore
import MyCustomLink from "@components/next-react/MyCustomLink";
import { useWindowWidth } from "@hooks/useWindowWidth";
import gtmConfig from "Themes/lib/gtmConfig.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import makeClevertap from "Themes/lib/makeClevertap.js";
import { getDBIdFromGraphqlId } from "@utils/core";
import Image from "next/image";
import HomeBanner from "@components/molecules/HomeBanner";
import dynamic from "next/dynamic";
import { ShopMetaContext } from "@temp/pages/_app.page";
import { useRouter } from "next/router";
import Script from "next/script";
// import CollectionList from "../../../../@next/components/molecules/CollectionList/CollectionList";

// import {
//   TypedSectionWithCollectionQuery,
//   TypedSectionWithoutChildrenQuery,
// } from "./queries";
import { HomePageQueryNextPlixlife } from "./gqlTypes/HomePageQueryNextPlixlife";

import styles from "./scss/index.module.scss";
// import GreenStarNew from "@components/atoms/SvgIcons/Green_star";
// import Carousel from "@temp/components/ProductCarousel";
// import { OverlayContext, OverlayTheme, OverlayType } from "@temp/components";
import Link from "next/link";
import FireWorkReelSection from "../../../../@next/components/organisms/FireWorkReelSection/FireWorkReelSection";
// import MemoQuoteIcon from "@components/atoms/SvgIcons/QuoteIcon";
// import { BestSellersNew } from "./HomepageComponents/BestSeller";
import { ContainerSkeleton } from "@components/molecules/ContainerSkeleton";
import { useAuthState } from "@saleor/sdk";

const BestSellersNew = dynamic(
  () => import("./HomepageComponents/BestSeller"),
  {
    ssr: true,
  }
);

const IngredientSetion = dynamic(
  () => import("./HomepageComponents/IngredientSection"),
  {
    ssr: false,
    // loading: () => (
    //   <div className="container textstrip-loader">
    //     <ContainerSkeleton
    //       render={{ title: true, description: true, image: true }}
    //       cardCount={2}
    //     />
    //   </div>
    // ),
  }
);

const BrandLogos = dynamic(() => import("./HomepageComponents/BrandLogos"), {
  ssr: true,
});

const TextStripNew = dynamic(() => import("./HomepageComponents/TextStrip"), {
  ssr: false,
  // loading: () => (
  //   <div className="container textstrip-loader">
  //     <ContainerSkeleton
  //       render={{ title: true, description: true }}
  //       cardCount={2}
  //     />
  //   </div>
  // ),
});

const PledgeATree = dynamic(() => import("./HomepageComponents/PledgeATree"), {
  ssr: false,
  // loading: () => (
  //   <div className="container textstrip-loader">
  //     <ContainerSkeleton
  //       render={{ title: true, description: true }}
  //       cardCount={2}
  //     />
  //   </div>
  // ),
});

const Collection1 = dynamic(() => import("./HomepageComponents/Collection1"), {
  ssr: false,
  // loading: () => (
  //   <div className="container textstrip-loader">
  //     <ContainerSkeleton
  //       render={{ title: true, description: true }}
  //       cardCount={2}
  //     />
  //   </div>
  // ),
});

const MoneyBack = dynamic(() => import("./HomepageComponents/MoneyBack"), {
  ssr: false,
  // loading: () => (
  //   <div className="container textstrip-loader">
  //     <ContainerSkeleton
  //       render={{ title: true, description: true }}
  //       cardCount={2}
  //     />
  //   </div>
  // ),
});

const NutritionistNew = dynamic(
  () => import("./HomepageComponents/NutritionistNew"),
  {
    ssr: false,
    // loading: () => (
    //   <div className="container textstrip-loader">
    //     <ContainerSkeleton
    //       render={{ title: true, description: true }}
    //       cardCount={2}
    //     />
    //   </div>
    // ),
  }
);

const Collection3 = dynamic(() => import("./HomepageComponents/Collection3"), {
  ssr: false,
  // loading: () => (
  //   <div className="container textstrip-loader">
  //     <ContainerSkeleton
  //       render={{ title: true, description: true }}
  //       cardCount={2}
  //     />
  //   </div>
  // ),
});

const Collection2New = dynamic(
  () => import("./HomepageComponents/Collection2"),
  {
    ssr: false,
    // loading: () => (
    //   <div className="container textstrip-loader">
    //     <ContainerSkeleton
    //       render={{ title: true, description: true }}
    //       cardCount={2}
    //     />
    //   </div>
    // ),
  }
);

const Collection4 = dynamic(() => import("./HomepageComponents/Collection4"), {
  ssr: false,
  // loading: () => (
  //   <div className="container textstrip-loader">
  //     <ContainerSkeleton
  //       render={{ title: true, description: true }}
  //       cardCount={2}
  //     />
  //   </div>
  // ),
});

const CleanLabel = dynamic(() => import("./HomepageComponents/CleanLabel"), {
  ssr: false,
  // loading: () => (
  //   <div className="container textstrip-loader">
  //     <ContainerSkeleton
  //       render={{ title: true, description: true }}
  //       cardCount={2}
  //     />
  //   </div>
  // ),
});

const Testimonials = dynamic(
  () => import("./HomepageComponents/Testimonials"),
  {
    ssr: false,
    // loading: () => (
    //   <div className="container textstrip-loader">
    //     <ContainerSkeleton
    //       render={{ title: true, description: true }}
    //       cardCount={2}
    //     />
    //   </div>
    // ),
  }
);

const NewLaunches = dynamic(() => import("./HomepageComponents/NewLaunches"), {
  ssr: false,
  // loading: () => (
  //   <div className="container textstrip-loader">
  //     <ContainerSkeleton
  //       render={{ title: true, description: true }}
  //       cardCount={2}
  //     />
  //   </div>
  // ),
});

const PlixInNews = dynamic(() => import("./HomepageComponents/PlixInNews"), {
  ssr: false,
  // loading: () => (
  //   <div className="container textstrip-loader">
  //     <ContainerSkeleton
  //       render={{ title: true, description: true }}
  //       cardCount={2}
  //     />
  //   </div>
  // ),
});

const MemoGreenArrowRightPlixTwo = dynamic(() =>
  import("@components/atoms/SvgIcons/GreenArrowRightPlixTwo")
);
const MemoLeftArrowPlix = dynamic(() =>
  import("@components/atoms/SvgIcons/LeftArrowPlix")
);
const MemoRightArrowPlix = dynamic(() =>
  import("@components/atoms/SvgIcons/RightArrowPlix")
);
const MemoHalfCirclesPlix = dynamic(() =>
  import("@components/atoms/SvgIcons/HalfCirclesPlix")
);
const MemoSideCirlcesPlix = dynamic(() =>
  import("@components/atoms/SvgIcons/SideCirlcesPlix")
);
const MemoStarRingsPlix = dynamic(() =>
  import("@components/atoms/SvgIcons/StarRingsPlix")
);
const Star = dynamic(() => import("@components/atoms/SvgIcons/Star"));
const MemoizedProductList = dynamic(() =>
  import("@components/organisms/ProductList/ProductList")
);

// @ts-check
interface IPageProps {
  data: HomePageQueryNextPlixlife;
}

const Page: React.FC<IPageProps> = props => {
  // const { banners, shop } = props;
  const banners = props?.data?.banners;
  // const [width] = useWindowWidth();
  const handleDots = (dots: any) => {
    dots = dots.slice(0, 3);
    return <ul>{dots}</ul>;
  };

  // const [showAfterJS, setShowAfterJS] = useState(false);
  const [collection1Products, setCollection1Products] = useState([]);
  const [showProductCards, setShowProductCards] = useState(false);
  const [showSections, setShowSections] = useState(false);
  const [showthankyouSection, setshowthankyouSection] = useState(false);

  const { user } = useAuthState();

  const router = useRouter();

  useEffect(() => {
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
    // setShowAfterJS(true);
    setCollection1Products(
      props.data?.collection1New?.edges[0]?.node?.collections?.edges[0]?.node
        ?.products?.edges
    );
    setShowProductCards(true);
    setShowSections(true);
  }, []);

  //popup for newuser signup
  useEffect(() => {
    if (router?.query?.newUser) {
      setshowthankyouSection(true);
    }
    // return () => {
    //   document.removeEventListener(
    //     "fw:embed-feed:thumbnail-click",
    //     onFwVideoClick
    //   );
    //   document.removeEventListener("fw:video:click-cta", onFwShopNowCtaClick);
    //   document.removeEventListener("fw:player:quit", onVideoQuit);
    // };
  }, []);

  useEffect(() => {
    const onFwShopNowCtaClick = () => {
      customEventTrigger(gtmConfig.shopNowCta.value, user, {
        heading_name: "Homepage Firework videos",
      });
      if (gtmConfig.fireworkShopNowCtaClick.enable) {
        (window.dataLayer = window.dataLayer || []).push({
          event: gtmConfig.fireworkShopNowCtaClick.value,
          eventAction: "Carrousel_shop_now_click",
          eventCategory: "Carrousel",
          user_ID: user?.id
            ? getDBIdFromGraphqlId(user?.id, "User")
            : undefined,
          user_type: user ? "logged_in" : "logged_out",
          membership_status: isMember(user)
            ? "plix_club_member"
            : "not_a_plix_club_member",
        });
      }
    };

    const onVideoQuit = e => {
      customEventTrigger(gtmConfig.closePopupClick.value, user, {
        heading_name: e?.detail?.video?.caption,
      });
    };

    if (typeof window !== "undefined") {
      // Datalayer custom event on shopnow cta click from firework carousel
      document.addEventListener("fw:video:click-cta", onFwShopNowCtaClick);
      document.addEventListener("fw:player:quit", onVideoQuit);
      // Navigate to the link linked with the video cta and close the player
      document.addEventListener("fw:player:navigate", e => {
        if (e?.detail?.url && typeof e?.detail?.url === "string") {
          router?.push(e.detail.url);
          window?._fwn?.player?.close();
        }
      });
    }
    const onFwVideoClick = () => {
      if (gtmConfig.fwVideoClick.enable) {
        customEventTrigger(gtmConfig.fwVideoClick.value, user, {
          heading_name: "Homepage Videos",
        });
      }
    };

    document.addEventListener("fw:embed-feed:thumbnail-click", onFwVideoClick);
    return () => {
      document.removeEventListener(
        "fw:embed-feed:thumbnail-click",
        onFwVideoClick
      );
      document.removeEventListener("fw:video:click-cta", onFwShopNowCtaClick);
      document.removeEventListener("fw:player:quit", onVideoQuit);
    };
  }, [user]);

  //popup for newuser signup
  useEffect(() => {
    if (router?.query?.newUser) {
      setshowthankyouSection(true);
    }
  }, []);

  // function mmatchPropsAreEqual(prevMatch, nextMatch) {
  //   if (prevMatch.bestSellerSectionNavData) {
  //     return (
  //       prevMatch.bestSellerSectionNavData.length ===
  //       nextMatch.bestSellerSectionNavData.length
  //     );
  //   }
  //   return true;
  // }

  function mmatchPropsAreEqual(prevMatch, nextMatch) {
    if (prevMatch.bestSellerSectionNavData) {
      return (
        prevMatch.bestSellerSectionNavData.length ===
        nextMatch.bestSellerSectionNavData.length
      );
    }
    return true;
  }

  const SubNavbarNew = () => {
    const [showCarousel, setShowCarousel] = useState(false);
    useEffect(() => {
      setShowCarousel(true);
    }, []);
    const subNavbarSection =
      props.data?.subnavbarNew?.edges.length &&
      props.data?.subnavbarNew?.edges[0];
    const subNavbarData =
      subNavbarSection &&
      getMetadataValue(subNavbarSection.node.metadata, "navItems") &&
      parseJson(getMetadataValue(subNavbarSection.node.metadata, "navItems"));
    const subNavbarItems =
      Array.isArray(subNavbarData) &&
      subNavbarData?.map(item => {
        return {
          ...item,
          navigation: item?.url,
          imageDimensions: {
            width: "55px",
            height: "55px",
          },
        };
      });

    if (subNavbarItems)
      return (
        <div className="container">
          <CardsContainer
            data={subNavbarItems}
            cardClass="subNavbarCard"
            containerClass="subNavbarContainer"
            isCarousel={
              showCarousel
                ? {
                    slidesOnDesktop: 4,
                    slidesOnTab: 4,
                    slidesOnMobile: 4,
                  }
                : false
            }
            mobileCarouselProps={{
              renderCenterLeftControls: () => null,
              renderCenterRightControls: () => null,
            }}
            carouselProps={{
              renderBottomCenterControls: () => null,
            }}
          >
            {showCarousel
              ? subNavbarItems?.map((item, index) => {
                  const imageUrlImgixScr = imageURLReplaceWithCDN(
                    item?.image
                  );

                  return (
                    <div
                      className={styles.subNavbarContainer}
                      onClick={() => {
                        customEventTrigger("header_icon_click", user, {
                          cta_name: item?.title,
                        });
                      }}
                    >
                      <MyCustomLink href={item?.navigation}>
                        <div className={styles.subNavbarImageTextContainer}>
                          {imageUrlImgixScr && (
                            <div className={styles.subNavbarImageContainer}>
                              <Image
                                src={imageUrlImgixScr}
                                width={65}
                                height={65}
                                className={styles.subNavbarImage}
                                alt={item?.alt}
                              />
                            </div>
                          )}
                          {item?.title && (
                            <div className={styles.subNavbarTitle}>
                              {item?.title}
                            </div>
                          )}
                        </div>
                      </MyCustomLink>
                    </div>
                  );
                })
              : subNavbarItems?.slice(0, 4)?.map(item => {
                  const imageUrlImgixScr = imageURLReplaceWithCDN(
                    item?.image
                  );

                  return (
                    <div
                      className={styles.subNavbarContainer}
                      onClick={() => {
                        customEventTrigger("header_icon_click", user, {
                          cta_name: item?.title,
                        });
                      }}
                    >
                      <MyCustomLink href={item?.navigation}>
                        <div className={styles.subNavbarImageTextContainer}>
                          {imageUrlImgixScr && (
                            <div className={styles.subNavbarImageContainer}>
                              <Image
                                src={imageUrlImgixScr}
                                width={65}
                                height={65}
                                className={styles.subNavbarImage}
                                // priority
                                alt={item?.imgalt}
                              />
                            </div>
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

    return <></>;
  };

  // const BestSellerSectionComponent: React.FC<any> = React.memo(
  //   ({
  //     bestSellerSection,
  //     bestSellerSectionNavData,
  //     bestSellerSectionNavMetaData,
  //   }) => {
  //     const [bestSellerActiveId, setBestSellerActiveId] = useState(
  //       bestSellerSectionNavData && bestSellerSectionNavData.length
  //         ? bestSellerSectionNavData[0].id
  //         : ""
  //     );
  //     const [bestSellerActiveName, setBestSellerActiveName] = useState<cardtag>(
  //       {
  //         name:
  //           bestSellerSectionNavData && bestSellerSectionNavData.length
  //             ? bestSellerSectionNavMetaData[0].meta.title
  //             : "",
  //         tagColor:
  //           bestSellerSectionNavData && bestSellerSectionNavData.length
  //             ? bestSellerSectionNavMetaData[0].meta.tagColor
  //             : "",
  //       }
  //     );
  //     return (
  //       <>
  //         {bestSellerSection && (
  //           <div className="container bestseller_container new_container">
  //             <ProductHeader
  //               heading="Best Sellers"
  //               headerClass="bestSellerSection"
  //               navbar={{
  //                 data: bestSellerSectionNavData,
  //                 navbarHandler: id => {
  //                   setBestSellerActiveId(id);
  //                   setBestSellerActiveName({
  //                     name: bestSellerSectionNavMetaData?.find(
  //                       data => data.id === id
  //                     )?.meta.title,
  //                     tagColor: bestSellerSectionNavMetaData?.find(
  //                       data => data.id === id
  //                     )?.meta.tagColor,
  //                   });
  //                 },
  //                 initialLink: bestSellerSectionNavData[0].text,
  //               }}
  //               button={{
  //                 text: "Shop All",
  //                 position: ButtonPostion.WITH_HEADER,
  //                 rightIcon: <MemoGreenArrowRightPlixTwo fontSize="16px" />,
  //                 link: "/collection/best-sellers/99/",
  //               }}
  //             />

  //             <MemoizedProductList
  //               products={bestSellerSection.node.collections.edges
  //                 .filter(edge => edge.node.id === bestSellerActiveId)[0]
  //                 .node.products.edges.map(product => product.node)}
  //               isCarousel
  //               from="HomePage"
  //               ctTitle="Plixlife Homepage"
  //               // refetch={refetch}
  //               carouselProps={{
  //                 infinite:
  //                   bestSellerSection.node.collections.edges.filter(
  //                     edge => edge.node.id === bestSellerActiveId
  //                   )[0].node.products.edges.length > 4,
  //               }}
  //               mobileCarouselProps={{
  //                 arrows: false,
  //                 dots: true,
  //                 appendDots: handleDots,
  //               }}
  //               desktopCarouselProps={{
  //                 arrows: true,
  //                 dots: true,
  //                 appendDots: handleDots,
  //               }}
  //               slidesOnMobile={2}
  //               slidesOnDesktop={4}
  //               cardTag={bestSellerActiveName}
  //               // button={false}
  //               // priceUl
  //               key={bestSellerActiveId}
  //             />
  //           </div>
  //         )}
  //       </>
  //     );
  //   },
  //   mmatchPropsAreEqual
  // );

  // const BrandLogosNew = () => {
  //   const brandLogosSection =
  //     props.data?.brandLogosNew?.edges.length &&
  //     props.data?.brandLogosNew?.edges[0];
  //   const brandLogosSectionData =
  //     brandLogosSection &&
  //     getMetadataValue(brandLogosSection?.node.metadata, "reviews") &&
  //     parseJson(getMetadataValue(brandLogosSection?.node.metadata, "reviews"));

  //   const brandLogosSectionHeading =
  //     brandLogosSection &&
  //     getMetadataValue(brandLogosSection?.node.metadata, "heading") &&
  //     parseJson(getMetadataValue(brandLogosSection?.node.metadata, "heading"));

  //   if (brandLogosSectionData)
  //     return (
  //       <>
  //         {brandLogosSection && (
  //           <div className="brandLogosSection">
  //             <div className="plix_news_side_icon">
  //               <CachedImage
  //                 className="wb_sideicon"
  //                 url="https://plixlifefc-media.farziengineer.co/hosted/plix_news_side_icon-71deb03e2345-729bb07828b0.png"
  //                 isNextImage={true}
  //                 nextImageLayout="fill"
  //                 nextImageObjectFit="contain"
  //               />
  //             </div>
  //             <div className="brandLogosSection__first">
  //               <div className="header">Plix In News</div>
  //               <div className="new_header_icon">
  //                 <CachedImage
  //                   className="wb_sideicon"
  //                   url="https://plixlifefc-media.farziengineer.co/hosted/news_header_icon-e0db5d5ac7ee-de3cb44cdbd3.png"
  //                   isNextImage={true}
  //                   nextImageLayout="fill"
  //                   nextImageObjectFit="contain"
  //                 />
  //               </div>
  //               <div className="text">
  //                 Our goal of empowering your health starts with our
  //                 extraordinary ingredients. We use clinically backed wholefood
  //                 ingredients to create blends which empower your body, mind and
  //                 soul.
  //               </div>
  //               {/* <ProductHeader
  //                 heading={brandLogosSectionHeading || ""}
  //                 headerClass="homepage_header_h1"
  //               />

  //               <MyRating
  //                 rating={brandLogosSectionData.star}
  //                 isReadOnly
  //                 color="#000"
  //               />

  //               <div className="brandLogosSection__text">
  //                 {brandLogosSectionData.number}{" "}
  //                 <strong>{brandLogosSectionData.star}-Star Reviews</strong>
  //               </div> */}
  //             </div>
  //             <div className="brandLogosSection__second">
  //               {showAfterJS ? (
  //                 <Marquee speed={40}>
  //                   {brandLogosSection?.node?.images?.edges.map(
  //                     (edge, index) => {
  //                       const imageUrlImgixScr = imageURLReplaceWithCDN(
  //                         edge?.node.url
  //                       );

  //                       return (
  //                         <div
  //                           className={`brandLogosSection__second__img__container ${styles.brandLogoImageWrapper}`}
  //                           key={index}
  //                         >
  //                           <CachedImage
  //                             key={edge?.node.id}
  //                             url={imageUrlImgixScr}
  //                             alt={edge?.node.alt || `Artboard ${index + 1}`}
  //                             isNextImage
  //                             nextImageLayout="fill"
  //                             nextImageObjectFit="contain"
  //                           />
  //                         </div>
  //                       );
  //                     }
  //                   )}
  //                 </Marquee>
  //               ) : (
  //                 <>
  //                   {brandLogosSection?.node?.images?.edges.map(
  //                     (edge, index) => {
  //                       const imageUrlImgixScr = imageURLReplaceWithCDN(
  //                         edge?.node.url
  //                       );

  //                       return (
  //                         <div
  //                           className={`brandLogosSection__second__img__container ${styles.brandLogoImageWrapper}`}
  //                           key={index}
  //                         >
  //                           <CachedImage
  //                             key={edge?.node.id}
  //                             url={imageUrlImgixScr}
  //                             alt={edge?.node.alt}
  //                             isNextImage
  //                             nextImageLayout="fill"
  //                             nextImageObjectFit="contain"
  //                           />
  //                         </div>
  //                       );
  //                     }
  //                   )}
  //                 </>
  //               )}
  //             </div>
  //           </div>
  //         )}
  //       </>
  //     );

  //   return <> </>;
  // };

  // New Plix brand logo section
  // const NewPlixbrandLogo = () => {
  //   const nutritionBranddata =
  //     props.data?.nutritionBrand?.edges?.length &&
  //     props.data?.nutritionBrand?.edges[0];

  //   const nutritionBrandNewdata =
  //     nutritionBranddata &&
  //     getMetadataValue(nutritionBranddata.node.metadata, "branddata") &&
  //     parseJson(
  //       getMetadataValue(nutritionBranddata.node.metadata, "branddata")
  //     );

  //   return (
  //     <>
  //       {nutritionBrandNewdata && (
  //         <div className="brandlogo_wrapper">
  //           <div className="inner_brandlogo">
  //             <div className="content">
  //               <h1
  //                 dangerouslySetInnerHTML={{
  //                   __html: nutritionBrandNewdata.title,
  //                 }}
  //               ></h1>
  //               <div className="logo_wrapper">
  //                 {nutritionBrandNewdata.features.map((feature, i) => (
  //                   <div className="logo_feature" key={i}>
  //                     <CachedImage
  //                       url={feature.logo}
  //                       isNextImage={true}
  //                       nextImageLayout="fill"
  //                       nextImageObjectFit="contain"
  //                     />
  //                     <p>{feature.text}</p>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           </div>
  //           <div className="brand__logo1">
  //             <CachedImage
  //               url="https://plixlifefc-media.farziengineer.co/hosted/brand-left-image-0ef0062e6516-cf7df94ac207.png"
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </div>
  //           <div className="brand__logo1 mobileOnly">
  //             <CachedImage
  //               url="https://plixlifefc-media.farziengineer.co/hosted/brand-left-image-mobile-411d1ed2ac02-2071cdea4b99.png"
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </div>
  //           <div className="brand_logo2">
  //             <CachedImage
  //               url="https://plixlifefc-media.farziengineer.co/hosted/brand-right-image-d5a09e3d5a58-0a10efff7cba.png"
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </div>
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  // const BestSellersNew = () => {
  //   const bestSellerSection =
  //     props.data?.bestSellersNew?.edges.length &&
  //     props.data?.bestSellersNew?.edges[0];
  //   const tabSequence =
  //     getMetadataValue(bestSellerSection?.node.metadata, "tabSequence") &&
  //     parseJson(
  //       getMetadataValue(bestSellerSection?.node.metadata, "tabSequence")
  //     );
  //   const bestSellerSectionNavData = [];
  //   const bestSellerSectionNavMetaData = [];
  //   if (tabSequence === undefined) {
  //     bestSellerSection &&
  //       bestSellerSection.node.collections.edges.map(edge => {
  //         const collectionMetadata = edge.node.metadata;
  //         const meta =
  //           collectionMetadata &&
  //           getMetadataValue(edge.node.metadata, "subNavbarCard") &&
  //           parseJson(getMetadataValue(edge.node.metadata, "subNavbarCard"));
  //         const collectionName =
  //           meta && meta.title ? meta.title : edge.node.name;
  //         bestSellerSectionNavData.push({
  //           text: collectionName,
  //           id: edge.node.id,
  //         });

  //         bestSellerSectionNavMetaData.push({
  //           id: edge.node.id,
  //           meta,
  //         });
  //       });
  //   } else {
  //     const addedCollections = [];
  //     tabSequence.map(bestSellerName => {
  //       bestSellerSection &&
  //         bestSellerSection.node.collections.edges.map(edge => {
  //           if (
  //             bestSellerName ===
  //             edge.node.name.substring(0, bestSellerName.length)
  //           ) {
  //             addedCollections.push(edge.node.name);
  //             const collectionMetadata = edge.node.metadata;
  //             const meta =
  //               collectionMetadata &&
  //               getMetadataValue(edge.node.metadata, "subNavbarCard") &&
  //               parseJson(
  //                 getMetadataValue(edge.node.metadata, "subNavbarCard")
  //               );
  //             const collectionName =
  //               meta && meta.title ? meta.title : edge.node.name;
  //             bestSellerSectionNavData.push({
  //               text: collectionName,
  //               id: edge.node.id,
  //             });

  //             bestSellerSectionNavMetaData.push({
  //               id: edge.node.id,
  //               meta,
  //             });
  //           }
  //         });
  //     });

  //     bestSellerSection &&
  //       bestSellerSection.node.collections.edges.map(edge => {
  //         let collectionFound = false;
  //         addedCollections.map(addedCollectionName => {
  //           if (edge.node.name === addedCollectionName) {
  //             collectionFound = true;
  //           }
  //         });
  //         if (collectionFound === false) {
  //           addedCollections.push(edge.node.name);
  //           const collectionMetadata = edge.node.metadata;
  //           const meta =
  //             collectionMetadata &&
  //             getMetadataValue(edge.node.metadata, "subNavbarCard") &&
  //             parseJson(getMetadataValue(edge.node.metadata, "subNavbarCard"));
  //           const collectionName =
  //             meta && meta.title ? meta.title : edge.node.name;
  //           bestSellerSectionNavData.push({
  //             text: collectionName,
  //             id: edge.node.id,
  //           });

  //           bestSellerSectionNavMetaData.push({
  //             id: edge.node.id,
  //             meta,
  //           });
  //         }
  //       });
  //   }
  //   if (bestSellerSection && bestSellerSectionNavData)
  //     return (
  //       <>
  //         <BestSellerSectionComponent
  //           bestSellerSection={bestSellerSection}
  //           bestSellerSectionNavData={bestSellerSectionNavData}
  //           bestSellerSectionNavMetaData={bestSellerSectionNavMetaData}
  //           // refetch={refetch}
  //         />
  //       </>
  //     );

  //   return <> </>;
  // };
  // const PlantBasedSupplimentsNew = () => {
  //   const plantBasedSection =
  //     props.data?.plantBasedSupplimentsNew?.edges.length &&
  //     props.data?.plantBasedSupplimentsNew?.edges[0];
  //   const plantBasedSectionData =
  //     plantBasedSection &&
  //     getMetadataValue(plantBasedSection.node.metadata, "cardData") &&
  //     parseJson(getMetadataValue(plantBasedSection.node.metadata, "cardData"));

  //   const plantBasedSectionAdditionalInfoData =
  //     plantBasedSection &&
  //     getMetadataValue(plantBasedSection.node.metadata, "additionalInfo") &&
  //     parseJson(
  //       getMetadataValue(plantBasedSection.node.metadata, "additionalInfo")
  //     );

  //   if (plantBasedSection && plantBasedSectionData)
  //     return (
  //       <>
  //         {plantBasedSection && (
  //           <div className="plantBasedSection">
  //             <div className="plantBasedSection__container">
  //               <div className="plantBasedSection__container__left">
  //                 <Card
  //                   cardClass="plantBasedSection__container__left__card"
  //                   content={{
  //                     ...plantBasedSectionData,
  //                     description: (
  //                       <div>
  //                         <div className="plantBasedSection__container__left__card__description__text">
  //                           {plantBasedSectionData.description}
  //                         </div>
  //                         {plantBasedSectionAdditionalInfoData && (
  //                           <CardsContainer
  //                             cardClass="plantBasedSection__container__left__card__additionalInfoCardsContainer__card"
  //                             containerClass="plantBasedSection__container__left__card__additionalInfoCardsContainer"
  //                             data={plantBasedSectionAdditionalInfoData.map(
  //                               data => ({
  //                                 ...data,
  //                                 title: (
  //                                   <div className="plantBasedSection__container__left__card__additionalInfoCardsContainer__card__title__textContainer">
  //                                     <div> {data.title.line1} </div>
  //                                     <div> {data.title.line2} </div>
  //                                   </div>
  //                                 ),
  //                               })
  //                             )}
  //                           />
  //                         )}
  //                       </div>
  //                     ),
  //                   }}
  //                 />
  //               </div>
  //               <div className={styles.plantbasedSectionImage}>
  //                 <CachedImage
  //                   className="plantBasedSection__container__right"
  //                   url={plantBasedSection.node?.backgroundImage?.url}
  //                   alt="plant"
  //                   isNextImage
  //                   nextImageObjectFit="contain"
  //                   nextImageLayout="fill"
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         )}
  //       </>
  //     );

  //   return <> </>;
  // };
  // const MoneyBackNew = () => {
  //   const moneyBackSection =
  //     props.data?.moneyBackGuarantee?.edges.length &&
  //     props.data?.moneyBackGuarantee?.edges[0];
  //   const moneyBackSectionData =
  //     moneyBackSection &&
  //     getMetadataValue(moneyBackSection.node.metadata, "money_back") &&
  //     parseJson(getMetadataValue(moneyBackSection.node.metadata, "money_back"));

  //   const imageUrlImgixScr = imageURLReplaceWithCDN(
  //     moneyBackSectionData?.image
  //   );

  //   if (moneyBackSection && moneyBackSectionData)
  //     return (
  //       <>
  //         <div className="moneyback_container">
  //           <div className="moneyback">
  //             <div className="money_image">
  //               <Image src={imageUrlImgixScr} width="500px" height="400px" />
  //             </div>
  //             <div className="moneyback_content">
  //               <div className="title ">{moneyBackSectionData?.title}</div>
  //               <div className="content">{moneyBackSectionData?.text}</div>
  //             </div>
  //           </div>
  //         </div>
  //       </>
  //     );

  //   return <> </>;
  // };

  // const Collection1New = () => {
  //   const collection1Section =
  //     props.data?.collection1New?.edges.length &&
  //     props.data?.collection1New?.edges[0];
  //   const collection1SectionData =
  //     collection1Section &&
  //     getMetadataValue(
  //       collection1Section.node?.collections.edges[0].node.metadata,
  //       "subNavbarCard"
  //     ) &&
  //     parseJson(
  //       getMetadataValue(
  //         collection1Section.node?.collections.edges[0].node.metadata,
  //         "subNavbarCard"
  //       )
  //     );
  //   const collection1SectionButton =
  //     collection1Section &&
  //     getMetadataValue(collection1Section.node?.metadata, "buttonDetails") &&
  //     parseJson(
  //       getMetadataValue(collection1Section.node?.metadata, "buttonDetails")
  //     );

  //   const bannerdata =
  //     collection1Section &&
  //     getMetadataValue(collection1Section.node?.metadata, "bannerdata") &&
  //     parseJson(
  //       getMetadataValue(collection1Section.node?.metadata, "bannerdata")
  //     );

  //   if (collection1Section && collection1SectionData)
  //     return (
  //       <>
  //         {collection1Section && (
  //           <>
  //             <div className="ourInsta-main-container boxShadowContainer">
  //               <div className="whatsNewContent">
  //                 {/* {collection1Section.node?.backgroundImage?.url && (
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
  //                 <div className="weight_banner">
  //                   <CachedImage
  //                     url={bannerdata?.bannerimage}
  //                     isNextImage={true}
  //                     nextImageLayout="fill"
  //                     nextImageObjectFit="contain"
  //                   />
  //                   <a href={bannerdata?.buttonUrl}>{bannerdata?.buttonText}</a>
  //                 </div>

  //                 <div className="weight_banner mobileOnly">
  //                   <p>{bannerdata?.tag}</p>
  //                   <CachedImage
  //                     url={bannerdata?.bannerimageOnly}
  //                     isNextImage={true}
  //                     nextImageLayout="fill"
  //                     nextImageObjectFit="contain"
  //                   />
  //                   <CachedImage
  //                     className="wb_sideicon"
  //                     url={bannerdata?.sideIcon}
  //                     isNextImage={true}
  //                     nextImageLayout="fill"
  //                     nextImageObjectFit="contain"
  //                   />
  //                   <a href={bannerdata?.buttonUrl}>{bannerdata?.buttonText}</a>
  //                 </div>

  //                 <div className="whatsNewProductContainer">
  //                   <div className="whatsNewProductContainer__overlay" />
  //                   {collection1Section.node.collections.edges[0] && (
  //                     <MemoizedProductList
  //                       products={collection1Section?.node?.collections?.edges[0]?.node?.products?.edges?.map(
  //                         product => product?.node
  //                       )}
  //                       isCarousel={width > 720}
  //                       productListClassname="whatsNewProductContainer__productList"
  //                       from="HomePage"
  //                       ctTitle="Plixlife Homepage"
  //                       // refetch={refetch}
  //                       carouselProps={{
  //                         infinite:
  //                           collection1Section.node.collections.edges[0].node
  //                             .products.edges.length > 3,
  //                         variableWidth: true,
  //                       }}
  //                       mobileCarouselProps={{
  //                         arrows: false,
  //                         dots: true,
  //                         appendDots: handleDots,
  //                       }}
  //                       desktopCarouselProps={{
  //                         arrows: true,
  //                         dots: true,
  //                         appendDots: handleDots,
  //                         slidesToScroll: 1,
  //                       }}
  //                       slidesOnDesktop={3}
  //                       slidesOnTab={2}
  //                       slidesOnMobile={2}
  //                       slidesToScroll={1}
  //                       cardTag={{
  //                         name: collection1SectionData?.title || "",
  //                         tagColor: collection1SectionData?.tagColor,
  //                       }}
  //                       productCardClassname="whatsNewProductContainer__productCard"

  //                       // button={false}
  //                       // priceUl
  //                     />
  //                   )}
  //                 </div>
  //               </div>
  //             </div>
  //           </>
  //         )}
  //       </>
  //     );

  //   return <> </>;
  // };
  // const NutritionistNew = () => {
  //   const nutritionSection =
  //     props.data?.nutritionistNew?.edges.length &&
  //     props.data?.nutritionistNew?.edges[0];

  //   const nutritionSectionData =
  //     nutritionSection &&
  //     getMetadataValue(nutritionSection.node.metadata, "banner") &&
  //     parseJson(getMetadataValue(nutritionSection.node.metadata, "banner"));
  //   if (nutritionSection && nutritionSectionData) {
  //     return (
  //       <div className="nutritionSection container">
  //         <div
  //           className={`show-on-desktop ${styles.imageSectionWrapperDesktop}`}
  //         >
  //           <MyCustomLink href={nutritionSectionData?.link}>
  //             <CachedImage
  //               url={nutritionSectionData?.imageWeb}
  //               alt="nutrition"
  //               imgixSizes="50vw"
  //               isNextImage
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </MyCustomLink>
  //         </div>

  //         <div className={`show-on-mobile ${styles.imageSectionWrapperMobile}`}>
  //           <MyCustomLink href={nutritionSectionData?.link}>
  //             <CachedImage
  //               url={nutritionSectionData?.imageMobile}
  //               alt="nutrition"
  //               imgixSizes="50vw"
  //               isNextImage
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </MyCustomLink>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return <></>;
  // };

  // const Collection2New = () => {
  //   return (
  //     <>
  //       <TypedSectionWithoutChildrenQuery
  //         variables={{
  //           firstPage: 1,
  //           name: "Collection 2 New",
  //         }}
  //       >
  //         {({ data, loading }) => {
  //           // console.log("@@@data", data);
  //           const collection2Section =
  //             data?.section?.edges.length && data?.section?.edges[0];
  //           const collection2SectionData =
  //             collection2Section &&
  //             getMetadataValue(
  //               collection2Section.node?.collections.edges[0]?.node.metadata,
  //               "subNavbarCard"
  //             ) &&
  //             parseJson(
  //               getMetadataValue(
  //                 collection2Section.node?.collections.edges[0]?.node.metadata,
  //                 "subNavbarCard"
  //               )
  //             );
  //           const collection2SectionButton =
  //             collection2Section &&
  //             getMetadataValue(
  //               collection2Section.node?.metadata,
  //               "buttonDetails"
  //             ) &&
  //             parseJson(
  //               getMetadataValue(
  //                 collection2Section.node?.metadata,
  //                 "buttonDetails"
  //               )
  //             );

  //           const bannerdata =
  //             collection2Section &&
  //             getMetadataValue(
  //               collection2Section.node?.metadata,
  //               "bannerdata"
  //             ) &&
  //             parseJson(
  //               getMetadataValue(
  //                 collection2Section.node?.metadata,
  //                 "bannerdata"
  //               )
  //             );

  //           if (collection2Section && collection2SectionData) {
  //             return (
  //               <>
  //                 <div className="ourInsta-main-container boxShadowContainer collection2">
  //                   <div className="whatsNewContent">
  //                     {/* {collection2Section.node?.backgroundImage?.url && (
  //                       <Card
  //                         content={{
  //                           image:
  //                             collection2Section.node?.backgroundImage?.url,
  //                           button: {
  //                             text: `${
  //                               collection2SectionButton?.text || "Shop All"
  //                             }`,
  //                             link: `${
  //                               collection2SectionButton?.link || "/page/shop"
  //                             }`,
  //                           },
  //                           imageDimensions: {
  //                             width: 500,
  //                           },
  //                           imgixProps: {
  //                             htmlAttributes: {
  //                               alt: "Hair",
  //                             },
  //                           },
  //                         }}
  //                         cardClass="whatsNewLeftCard"
  //                       />
  //                     )} */}
  //                     <div className="hair_banner">
  //                       <CachedImage
  //                         url={bannerdata?.bannerimage}
  //                         isNextImage={true}
  //                         nextImageLayout="fill"
  //                         nextImageObjectFit="contain"
  //                       />
  //                       <a href={bannerdata?.buttonUrl}>
  //                         {bannerdata?.buttonText}
  //                       </a>
  //                     </div>
  //                     <div className="hair_banner mobileOnly">
  //                       <p>{bannerdata?.tag}</p>
  //                       <CachedImage
  //                         url={bannerdata?.bannerimageOnly}
  //                         isNextImage={true}
  //                         nextImageLayout="fill"
  //                         nextImageObjectFit="contain"
  //                       />
  //                       <CachedImage
  //                         url={bannerdata?.leaficon}
  //                         isNextImage={true}
  //                         nextImageLayout="fill"
  //                         nextImageObjectFit="contain"
  //                       />
  //                       <CachedImage
  //                         url={bannerdata?.sideIcon}
  //                         isNextImage={true}
  //                         nextImageLayout="fill"
  //                         nextImageObjectFit="contain"
  //                       />
  //                       <a href={bannerdata?.buttonUrl}>
  //                         {bannerdata?.buttonText}
  //                       </a>
  //                     </div>
  //                     <div className="whatsNewProductContainer">
  //                       <div className="whatsNewProductContainer__overlay" />
  //                       {collection2Section.node.collections.edges[0] && (
  //                         <MemoizedProductList
  //                           products={collection2Section.node.collections.edges[0].node.products.edges.map(
  //                             product => product.node
  //                           )}
  //                           isCarousel={width > 720}
  //                           productListClassname="whatsNewProductContainer__productList"
  //                           from="HomePage"
  //                           ctTitle="Plixlife Homepage"
  //                           // refetch={refetch}
  //                           carouselProps={{
  //                             infinite:
  //                               collection2Section.node.collections.edges[0]
  //                                 .node.products.edges.length > 3,
  //                             variableWidth: true,
  //                           }}
  //                           mobileCarouselProps={{
  //                             arrows: false,
  //                             dots: true,
  //                             appendDots: handleDots,
  //                           }}
  //                           desktopCarouselProps={{
  //                             arrows: true,
  //                             dots: true,
  //                             appendDots: handleDots,
  //                             slidesToScroll: 1,
  //                           }}
  //                           slidesOnDesktop={3}
  //                           slidesOnTab={2}
  //                           slidesOnMobile={2}
  //                           slidesToScroll={1}
  //                           cardTag={{
  //                             name: collection2SectionData?.title || "",
  //                             tagColor: collection2SectionData?.tagColor,
  //                           }}
  //                           productCardClassname="whatsNewProductContainer__productCard"
  //                           // button={false}
  //                           // priceUl
  //                         />
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </>
  //             );
  //           }
  //           return <></>;
  //         }}
  //       </TypedSectionWithoutChildrenQuery>
  //     </>
  //   );
  // };

  // const Collection3 = () => {
  //   return (
  //     <>
  //       <TypedSectionWithoutChildrenQuery
  //         variables={{
  //           firstPage: 1,
  //           name: "Collection 3",
  //         }}
  //       >
  //         {({ data, laoding }) => {
  //           const collection3Section =
  //             data?.section?.edges.length && data?.section?.edges[0];
  //           const collection3SectionData =
  //             collection3Section &&
  //             getMetadataValue(
  //               collection3Section.node?.collections.edges[0]?.node.metadata,
  //               "subNavbarCard"
  //             ) &&
  //             parseJson(
  //               getMetadataValue(
  //                 collection3Section.node?.collections.edges[0]?.node.metadata,
  //                 "subNavbarCard"
  //               )
  //             );
  //           const collection3SectionButton =
  //             collection3Section &&
  //             getMetadataValue(
  //               collection3Section.node?.metadata,
  //               "buttonDetails"
  //             ) &&
  //             parseJson(
  //               getMetadataValue(
  //                 collection3Section.node?.metadata,
  //                 "buttonDetails"
  //               )
  //             );
  //           if (collection3Section && collection3SectionData) {
  //             return (
  //               <>
  //                 <div className="ourInsta-main-container boxShadowContainer">
  //                   <div className="whatsNewContent">
  //                     {collection3Section.node?.backgroundImage?.url && (
  //                       <Card
  //                         content={{
  //                           image:
  //                             collection3Section.node?.backgroundImage?.url,
  //                           button: {
  //                             text: `${
  //                               collection3SectionButton?.text || "Shop All"
  //                             }`,
  //                             link: `${
  //                               collection3SectionButton?.link || "/page/shop"
  //                             }`,
  //                           },
  //                           imageDimensions: {
  //                             width: 500,
  //                           },
  //                           imgixProps: {
  //                             htmlAttributes: {
  //                               alt: "Plant Based Skin Supplement",
  //                             },
  //                           },
  //                         }}
  //                         cardClass="whatsNewLeftCard"
  //                       />
  //                     )}
  //                     <div className="whatsNewProductContainer">
  //                       <div className="whatsNewProductContainer__overlay" />
  //                       {collection3Section.node.collections.edges[0] && (
  //                         <MemoizedProductList
  //                           products={collection3Section.node.collections.edges[0].node.products.edges.map(
  //                             product => product.node
  //                           )}
  //                           isCarousel={width > 720}
  //                           productListClassname="whatsNewProductContainer__productList"
  //                           from="HomePage"
  //                           ctTitle="Plixlife Homepage"
  //                           // refetch={refetch}
  //                           carouselProps={{
  //                             infinite:
  //                               collection3Section.node.collections.edges[0]
  //                                 .node.products.edges.length > 3,
  //                             variableWidth: true,
  //                           }}
  //                           mobileCarouselProps={{
  //                             arrows: false,
  //                             dots: true,
  //                             appendDots: handleDots,
  //                           }}
  //                           desktopCarouselProps={{
  //                             arrows: true,
  //                             dots: true,
  //                             appendDots: handleDots,
  //                             slidesToScroll: 1,
  //                           }}
  //                           slidesOnDesktop={3}
  //                           slidesOnTab={2}
  //                           slidesOnMobile={2}
  //                           slidesToScroll={1}
  //                           cardTag={{
  //                             name: collection3SectionData?.title || "",
  //                             tagColor: collection3SectionData?.tagColor,
  //                           }}
  //                           productCardClassname="whatsNewProductContainer__productCard"
  //                           // button={false}
  //                           // priceUl
  //                         />
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </>
  //             );
  //           }

  //           return <> </>;
  //         }}
  //       </TypedSectionWithoutChildrenQuery>
  //     </>
  //   );
  // };

  // const Collection4 = () => {
  //   return (
  //     <>
  //       <TypedSectionWithoutChildrenQuery
  //         variables={{
  //           firstPage: 1,
  //           name: "Collection 4",
  //         }}
  //       >
  //         {({ data, loading }) => {
  //           const collection2Section =
  //             data?.section?.edges.length && data?.section?.edges[0];
  //           const collection2SectionData =
  //             collection2Section &&
  //             getMetadataValue(
  //               collection2Section.node?.collections.edges[0]?.node.metadata,
  //               "subNavbarCard"
  //             ) &&
  //             parseJson(
  //               getMetadataValue(
  //                 collection2Section.node?.collections.edges[0]?.node.metadata,
  //                 "subNavbarCard"
  //               )
  //             );
  //           const collection2SectionButton =
  //             collection2Section &&
  //             getMetadataValue(
  //               collection2Section.node?.metadata,
  //               "buttonDetails"
  //             ) &&
  //             parseJson(
  //               getMetadataValue(
  //                 collection2Section.node?.metadata,
  //                 "buttonDetails"
  //               )
  //             );
  //           if (collection2Section && collection2SectionData) {
  //             return (
  //               <>
  //                 <div className="ourInsta-main-container boxShadowContainer">
  //                   <div className="whatsNewContent">
  //                     {collection2Section.node?.backgroundImage?.url && (
  //                       <Card
  //                         content={{
  //                           image:
  //                             collection2Section.node?.backgroundImage?.url,
  //                           button: {
  //                             text: `${
  //                               collection2SectionButton?.text || "Shop All"
  //                             }`,
  //                             link: `${
  //                               collection2SectionButton?.link || "/page/shop"
  //                             }`,
  //                           },
  //                           imageDimensions: {
  //                             width: 500,
  //                           },
  //                           imgixProps: {
  //                             htmlAttributes: {
  //                               alt: "Performance",
  //                             },
  //                           },
  //                         }}
  //                         cardClass="whatsNewLeftCard"
  //                       />
  //                     )}
  //                     <div className="whatsNewProductContainer">
  //                       <div className="whatsNewProductContainer__overlay" />
  //                       {collection2Section.node.collections.edges[0] && (
  //                         <MemoizedProductList
  //                           products={collection2Section.node.collections.edges[0].node.products.edges.map(
  //                             product => product.node
  //                           )}
  //                           isCarousel={width > 720}
  //                           productListClassname="whatsNewProductContainer__productList"
  //                           from="HomePage"
  //                           ctTitle="Plixlife Homepage"
  //                           // refetch={refetch}
  //                           carouselProps={{
  //                             infinite:
  //                               collection2Section.node.collections.edges[0]
  //                                 .node.products.edges.length > 3,
  //                             variableWidth: true,
  //                           }}
  //                           mobileCarouselProps={{
  //                             arrows: false,
  //                             dots: true,
  //                             appendDots: handleDots,
  //                           }}
  //                           desktopCarouselProps={{
  //                             arrows: true,
  //                             dots: true,
  //                             appendDots: handleDots,
  //                             slidesToScroll: 1,
  //                           }}
  //                           slidesOnDesktop={3}
  //                           slidesOnTab={2}
  //                           slidesOnMobile={2}
  //                           slidesToScroll={1}
  //                           cardTag={{
  //                             name: collection2SectionData?.title || "",
  //                             tagColor: collection2SectionData?.tagColor,
  //                           }}
  //                           productCardClassname="whatsNewProductContainer__productCard"
  //                           // button={false}
  //                           // priceUl
  //                         />
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </>
  //             );
  //           }
  //           return <> </>;
  //         }}
  //       </TypedSectionWithoutChildrenQuery>
  //     </>
  //   );
  // };

  // New Launch

  // const NewLaunches = () => {
  //   return (
  //     <>
  //       <TypedSectionWithoutChildrenQuery
  //         variables={{
  //           firstPage: 1,
  //           name: "New Launches",
  //         }}
  //       >
  //         {({ data, loading }) => {
  //           const collection2Section =
  //             data?.section?.edges.length && data?.section?.edges[0];
  //           const collection2SectionData =
  //             collection2Section &&
  //             getMetadataValue(
  //               collection2Section.node?.collections.edges[0]?.node.metadata,
  //               "subNavbarCard"
  //             ) &&
  //             parseJson(
  //               getMetadataValue(
  //                 collection2Section.node?.collections.edges[0]?.node.metadata,
  //                 "subNavbarCard"
  //               )
  //             );
  //           const collection2SectionButton =
  //             collection2Section &&
  //             getMetadataValue(
  //               collection2Section.node?.metadata,
  //               "buttonDetails"
  //             ) &&
  //             parseJson(
  //               getMetadataValue(
  //                 collection2Section.node?.metadata,
  //                 "buttonDetails"
  //               )
  //             );
  //           if (collection2Section && collection2SectionData) {
  //             return (
  //               <>
  //                 <div className="ourInsta-main-container boxShadowContainer">
  //                   <div className="whatsNewContent">
  //                     {collection2Section.node?.backgroundImage?.url && (
  //                       <Card
  //                         content={{
  //                           image:
  //                             collection2Section.node?.backgroundImage?.url,
  //                           button: {
  //                             text: `${
  //                               collection2SectionButton?.text || "Shop All"
  //                             }`,
  //                             link: `${
  //                               collection2SectionButton?.link || "/page/shop"
  //                             }`,
  //                           },
  //                           imageDimensions: {
  //                             width: 500,
  //                           },
  //                           imgixProps: {
  //                             htmlAttributes: {
  //                               alt: "Performance",
  //                             },
  //                           },
  //                         }}
  //                         cardClass="whatsNewLeftCard"
  //                       />
  //                     )}
  //                     <div className="whatsNewProductContainer">
  //                       <div className="whatsNewProductContainer__overlay" />
  //                       {collection2Section.node.collections.edges[0] && (
  //                         <MemoizedProductList
  //                           products={collection2Section.node.collections.edges[0].node.products.edges.map(
  //                             product => product.node
  //                           )}
  //                           isCarousel={width > 720}
  //                           productListClassname="whatsNewProductContainer__productList"
  //                           from="HomePage"
  //                           ctTitle="Plixlife Homepage"
  //                           // refetch={refetch}
  //                           carouselProps={{
  //                             infinite:
  //                               collection2Section.node.collections.edges[0]
  //                                 .node.products.edges.length > 3,
  //                             variableWidth: true,
  //                           }}
  //                           mobileCarouselProps={{
  //                             arrows: false,
  //                             dots: true,
  //                             appendDots: handleDots,
  //                           }}
  //                           desktopCarouselProps={{
  //                             arrows: true,
  //                             dots: true,
  //                             appendDots: handleDots,
  //                             slidesToScroll: 1,
  //                           }}
  //                           slidesOnDesktop={3}
  //                           slidesOnTab={2}
  //                           slidesOnMobile={2}
  //                           slidesToScroll={1}
  //                           cardTag={{
  //                             name: collection2SectionData?.title || "",
  //                             tagColor: collection2SectionData?.tagColor,
  //                           }}
  //                           productCardClassname="whatsNewProductContainer__productCard"
  //                           // button={false}
  //                           // priceUl
  //                         />
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </>
  //             );
  //           }
  //           return <> </>;
  //         }}
  //       </TypedSectionWithoutChildrenQuery>
  //     </>
  //   );
  // };

  // const TestimonialsNew = () => {
  //   const testimonialSection =
  //     props.data?.testimonialsNew?.edges.length &&
  //     props.data?.testimonialsNew?.edges[0];
  //   const testimonialData =
  //     testimonialSection &&
  //     getMetadataValue(testimonialSection.node.metadata, "cardContainerData") &&
  //     parseJson(
  //       getMetadataValue(testimonialSection.node.metadata, "cardContainerData")
  //     );
  //   if (testimonialSection && testimonialData) {
  //     return (
  //       <>
  //         <div className="testimonialSection container">
  //           <div className="testimonialSection__svg1">
  //             <MemoHalfCirclesPlix fontSize="64px" />
  //           </div>
  //           <div className="testimonialSection__svg2">
  //             <MemoSideCirlcesPlix fontSize="80px" />
  //           </div>
  //           <ProductHeader
  //             heading="What the pros say"
  //             headerClass="testimonialHeader"
  //           />
  //           <div className="testimonialSection__container">
  //             <CardsContainer
  //               data={testimonialData.map(testimonial => ({
  //                 ...testimonial,
  //                 title: (
  //                   <>
  //                     <div>{testimonial.title.name}</div>
  //                     <div>{testimonial.title.remark}</div>
  //                     <MyRating
  //                       rating={parseInt(testimonial.title.star, 10)}
  //                       isReadOnly
  //                     />
  //                   </>
  //                 ),
  //               }))}
  //               cardClass=""
  //               containerClass="testimonialSection__container__cardsContainer"
  //               isCarousel={{
  //                 slidesOnDesktop: 1,
  //                 slidesOnTab: 1,
  //                 slidesOnMobile: 1,
  //                 rightArrow: <MemoRightArrowPlix fontSize="52px" />,
  //                 leftArrow: <MemoLeftArrowPlix fontSize="52px" />,
  //               }}
  //               carouselProps={{
  //                 className: "testimonial-cerousel",
  //                 defaultControlsConfig: {
  //                   pagingDotsClassName: "pagingDotsClassName",
  //                 },
  //                 wrapAround: true,
  //               }}
  //               mobileCarouselProps={{
  //                 renderCenterLeftControls: () => null,
  //                 renderCenterRightControls: () => null,
  //                 wrapAround: true,
  //               }}
  //               tabCarouselProps={{
  //                 renderCenterLeftControls: () => null,
  //                 renderCenterRightControls: () => null,
  //                 wrapAround: true,
  //               }}
  //               desktopCarouselProps={{
  //                 wrapAround: true,
  //               }}
  //             >
  //               {testimonialData.map(testimonial => (
  //                 <div className="testimonialSection__container__div ">
  //                   <Card
  //                     cardClass="testimonialSection__container__div__card"
  //                     content={{
  //                       ...testimonial,
  //                       image: (
  //                         <div className="testimonialSection__container__div__card__image__container">
  //                           <Image
  //                             src={testimonial.image}
  //                             layout="fill"
  //                             alt="testimonial"
  //                           />
  //                           <MemoStarRingsPlix fontSize="64px" />
  //                         </div>
  //                       ),
  //                       title: (
  //                         <div className="testimonialSection__container__div__card__title__container">
  //                           <div className="testimonialSection__container__div__card__title__container__heading1">
  //                             {" "}
  //                             {testimonial.title.name}
  //                           </div>
  //                           <div className="testimonialSection__container__div__card__title__container__heading2">
  //                             {" "}
  //                             {testimonial.title.remark}
  //                           </div>
  //                           <MyRating
  //                             rating={parseInt(testimonial.title.star, 10)}
  //                             isReadOnly
  //                           />
  //                         </div>
  //                       ),
  //                     }}
  //                   />
  //                 </div>
  //               ))}
  //             </CardsContainer>
  //           </div>
  //         </div>
  //       </>
  //     );
  //   }
  //   return <> </>;
  // };

  // const TextStripNew = () => {
  //   const textStripSection =
  //     props.data?.textStripNew?.edges.length &&
  //     props.data?.textStripNew?.edges[0];
  //   const ShopMetaContextValue = React.useContext(ShopMetaContext);

  //   const textStripSectionData =
  //     getMetadataValue(ShopMetaContextValue, "footertextstripdata") &&
  //     parseJson(getMetadataValue(ShopMetaContextValue, "footertextstripdata"));

  //   if (textStripSection && textStripSectionData)
  //     return (
  //       <>
  //         <div className="homepage_textstripsection">
  //           {textStripSection && (
  //             <div className="textStripSection">
  //               {showAfterJS ? (
  //                 <Marquee speed={40}>
  //                   {textStripSectionData.map(text => (
  //                     <div className="textItem">
  //                       <GreenStarNew />
  //                       <span>{text}</span>
  //                     </div>
  //                   ))}
  //                   {textStripSectionData.map(text => (
  //                     <div className="textItem">
  //                       <GreenStarNew />
  //                       <span>{text}</span>
  //                     </div>
  //                   ))}
  //                 </Marquee>
  //               ) : (
  //                 <>
  //                   {textStripSectionData.map(text => (
  //                     <div className="textItem">
  //                       <Star />
  //                       <span>{text}</span>
  //                     </div>
  //                   ))}
  //                   {textStripSectionData.map(text => (
  //                     <div className="textItem">
  //                       <Star />
  //                       <span>{text}</span>
  //                     </div>
  //                   ))}
  //                 </>
  //               )}
  //             </div>
  //           )}
  //         </div>
  //       </>
  //     );

  //   return <> </>;
  // };

  // const CollectionListSection = () => {
  //   const collectionlistData =
  //     props.data?.collectionList?.edges.length &&
  //     props.data?.collectionList?.edges[0];
  //   return (
  //     <div className="container">
  //       <CollectionList
  //         collections={
  //           collectionlistData
  //             ? collectionlistData.node.collections.edges.map(edge => edge.node)
  //             : []
  //         }
  //       />
  //     </div>
  //   );
  // };

  // ingredient feature section

  // const Ingredientfeature = () => {
  //   const takeCare =
  //     props.data?.takeCare?.edges?.length && props.data?.takeCare?.edges[0];

  //   const takeCareNewData =
  //     takeCare &&
  //     getMetadataValue(takeCare.node.metadata, "takecareData") &&
  //     parseJson(getMetadataValue(takeCare.node.metadata, "takecareData"));

  //   return (
  //     <>
  //       {takeCareNewData && (
  //         <div className="ingredient_feature_wrapper">
  //           <div className="take_care_sideicon">
  //             <CachedImage
  //               url="https://plixlifefc-media.farziengineer.co/hosted/take-care-side-icon2-f2782c37dd67-a28d65606dea.png"
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </div>
  //           <div className="take_care_sideicon3">
  //             <CachedImage
  //               url="https://plixlifefc-media.farziengineer.co/hosted/take-care-side-icon3-eb6ad84318b0-12f1aca14258.png"
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </div>
  //           <div className="inner_ingredient_feature">
  //             <div className="content_section">
  //               <h3>{takeCareNewData?.title}</h3>
  //               <p>{takeCareNewData?.subtitle} </p>
  //               <a href={takeCareNewData?.buttonUrl}>
  //                 {takeCareNewData?.buttonText}
  //               </a>
  //               <div className="arrow_icon">
  //                 <CachedImage
  //                   url="https://plixlifefc-media.farziengineer.co/hosted/take-care-arrow-4d0df733ac77-e0687e6e50b5.png"
  //                   isNextImage={true}
  //                   nextImageLayout="fill"
  //                   nextImageObjectFit="contain"
  //                 />
  //               </div>
  //             </div>

  //             <div className="feature_section">
  //               {takeCareNewData &&
  //                 takeCareNewData.features.map((data, i) => (
  //                   <div className="feature" key={i}>
  //                     <CachedImage
  //                       url={data?.logo}
  //                       isNextImage={true}
  //                       nextImageLayout="fill"
  //                       nextImageObjectFit="contain"
  //                     />
  //                     <span className="Vegan">{data?.text}</span>
  //                   </div>
  //                 ))}
  //             </div>
  //             <div className="learn_more">
  //               <a href={takeCareNewData?.buttonUrl}>
  //                 {takeCareNewData?.buttonText}
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  // Reward section
  // const RewardSection = () => {
  //   const rainingRewards =
  //     props.data?.rainingRewards?.edges?.length &&
  //     props.data?.rainingRewards?.edges[0];

  //   const rainingRewardsNewdata =
  //     rainingRewards &&
  //     getMetadataValue(rainingRewards.node.metadata, "rainingRewardData") &&
  //     parseJson(
  //       getMetadataValue(rainingRewards.node.metadata, "rainingRewardData")
  //     );

  //   return (
  //     <>
  //       {rainingRewardsNewdata && (
  //         <div className="reward_section">
  //           <div className="inner_reward">
  //             <div className="plix_pocket">
  //               <CachedImage
  //                 url={rainingRewardsNewdata?.cardLogo}
  //                 isNextImage={true}
  //                 nextImageLayout="fill"
  //                 nextImageObjectFit="contain"
  //               />
  //             </div>
  //             <div className="content">
  //               <h3>{rainingRewardsNewdata?.title}</h3>
  //               <p>{rainingRewardsNewdata?.subtext}</p>
  //               <span>{rainingRewardsNewdata?.featureText}</span>
  //               <a href={rainingRewardsNewdata?.buttonUrl}>
  //                 {rainingRewardsNewdata?.buttonText}
  //               </a>
  //             </div>
  //             <div className="reward_icons">
  //               {rainingRewardsNewdata.features.map((data, i) => (
  //                 <div className="reward" key={i}>
  //                   <CachedImage
  //                     url={data?.logo}
  //                     isNextImage={true}
  //                     nextImageLayout="fill"
  //                     nextImageObjectFit="contain"
  //                   />
  //                   <p>{data?.text}</p>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //           <div className="reward_sideimage1">
  //             <CachedImage
  //               url="https://plixlifefc-media.farziengineer.co/hosted/reward_side_image1-de3e06c25192-7ab6a39ae94e.png"
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </div>
  //           <div className="reward_sideimage2">
  //             <CachedImage
  //               url="https://plixlifefc-media.farziengineer.co/hosted/reward_side_image2-74803637748b-5920344ee230.png"
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </div>
  //           <div className="reward_sideimage2 mobileOnly">
  //             <CachedImage
  //               url="https://plixlifefc-media.farziengineer.co/hosted/reward_side_image2_mobile-08b968d7b7e4-7efe5e2d10e0.png"
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </div>
  //           <div className="reward_sideimage3">
  //             <CachedImage
  //               url="https://plixlifefc-media.farziengineer.co/hosted/reward_side_image3-112ec0102b6d-89c94947bb25.png"
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </div>
  //           <div className="reward_sideimage4">
  //             <CachedImage
  //               url="https://plixlifefc-media.farziengineer.co/hosted/reward_side_image4-23ac590e21f4-2052846b31e9.png"
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </div>
  //           <div className="reward_sideimage5">
  //             <CachedImage
  //               url="https://plixlifefc-media.farziengineer.co/hosted/reward_side_image5-c28b4e963cc3-8f17b90a266c.png"
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </div>
  //           <div className="reward_sideimage6">
  //             <CachedImage
  //               url="https://plixlifefc-media.farziengineer.co/hosted/reward_center_image-63b450a68a89-900b56a9861f.png"
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </div>
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  // const PleadgeTree = () => {
  //   const pleadgeTree =
  //     props.data?.pledgeTree?.edges?.length && props.data?.pledgeTree?.edges[0];

  //   const pleadgeTreeNewData =
  //     pleadgeTree &&
  //     getMetadataValue(pleadgeTree.node.metadata, "pledgeTreeData") &&
  //     parseJson(getMetadataValue(pleadgeTree.node.metadata, "pledgeTreeData"));

  //   const backgroundImageUrlWithImgix = imageURLReplaceWithCDN(
  //     "https://plixlifefc-media.farziengineer.co/hosted/pledge_background_image-bc9fe38c31ef.png"
  //   );
  //   return (
  //     <>
  //       {pleadgeTreeNewData && (
  //         <div
  //           className="pledge_tree"
  //           style={{ backgroundImage: `url(${backgroundImageUrlWithImgix})` }}
  //         >
  //           <div className="inner_pledge_tree">
  //             <div className="pledge_icon">
  //               <CachedImage
  //                 url={pleadgeTreeNewData?.primaryLogo}
  //                 isNextImage={true}
  //                 nextImageLayout="fill"
  //                 nextImageObjectFit="contain"
  //               />
  //             </div>
  //             <div className="leaficon_mobileOnly">
  //               <CachedImage
  //                 className="leaficon"
  //                 url={pleadgeTreeNewData?.secondaryLogo}
  //                 isNextImage={true}
  //                 nextImageLayout="fill"
  //                 nextImageObjectFit="contain"
  //               />
  //             </div>
  //             <div className="content">
  //               <h3>{pleadgeTreeNewData?.title}</h3>
  //               <p>{pleadgeTreeNewData?.subtext}</p>
  //               <a href={pleadgeTreeNewData?.buttonUrl}>
  //                 {pleadgeTreeNewData?.buttonText}
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  // const NewTestimonials = () => {
  //   return (
  //     <TypedSectionWithoutChildrenQuery
  //       variables={{
  //         firstPage: 1,
  //         name: "Testimonials New",
  //       }}
  //     >
  //       {({ data, loading }) => {
  //         const testimonialSection =
  //           data?.section?.edges.length && data?.section?.edges[0];
  //         const testimonialData =
  //           testimonialSection &&
  //           getMetadataValue(
  //             testimonialSection.node.metadata,
  //             "cardContainerData"
  //           ) &&
  //           parseJson(
  //             getMetadataValue(
  //               testimonialSection.node.metadata,
  //               "cardContainerData"
  //             )
  //           );

  //         const titledata =
  //           testimonialSection &&
  //           getMetadataValue(testimonialSection.node.metadata, "title") &&
  //           parseJson(
  //             getMetadataValue(testimonialSection.node.metadata, "title")
  //           );
  //         if (testimonialSection && testimonialData) {
  //           return (
  //             <>
  //               <div className="testimonial_wrapper">
  //                 <div className="inner_testimonal">
  //                   <h2>{titledata}</h2>
  //                   {/* desktop only */}
  //                   <div className="testimonial_container_wrapper">
  //                     {testimonialData.map(testimonial => (
  //                       <div className="testimonial_container">
  //                         <div className="testimonial_image">
  //                           <Image
  //                             src={testimonial.image}
  //                             layout="fill"
  //                             alt="testimonial"
  //                           />
  //                         </div>
  //                         <div className="quote_icon">
  //                           <MemoQuoteIcon />
  //                         </div>
  //                         <div className="testionial_header">
  //                           {testimonial.title.remark}
  //                         </div>
  //                         <div className="description">
  //                           <p>{testimonial.description}</p>
  //                         </div>
  //                         <div className="name">{testimonial.title.name}</div>
  //                         <MyRating
  //                           rating={parseInt(testimonial.title.star, 10)}
  //                           isReadOnly
  //                         />
  //                       </div>
  //                     ))}
  //                   </div>

  //                   {/* mobile only */}
  //                   <div className="testimonial_container_wrapper mobile_testimonial">
  //                     <Carousel
  //                       slidesOnDesktop={3}
  //                       slidesOnMobile={1}
  //                       slidesOnTab={1}
  //                       dots={true}
  //                       arrows={false}
  //                       swipeToSlide={true}
  //                     >
  //                       {testimonialData.map((testimonial, i) => (
  //                         <div
  //                           className={`testimonial_container container_${i}`}
  //                         >
  //                           <div className="testimonial_image">
  //                             <Image
  //                               src={testimonial.image}
  //                               layout="fill"
  //                               alt="testimonial"
  //                             />
  //                           </div>
  //                           <div className="quote_icon">
  //                             <MemoQuoteIcon />
  //                           </div>
  //                           <div className="testionial_header">
  //                             {testimonial.title.remark}
  //                           </div>
  //                           <div className="description">
  //                             <p>{testimonial.description}</p>
  //                           </div>
  //                           <div className="name">{testimonial.title.name}</div>
  //                           <MyRating
  //                             rating={parseInt(testimonial.title.star, 10)}
  //                             isReadOnly
  //                           />
  //                         </div>
  //                       ))}
  //                     </Carousel>
  //                   </div>
  //                   {/* mobile only */}
  //                 </div>
  //                 <div className="sideicon1">
  //                   <CachedImage
  //                     url="https://plixlifefc-media.farziengineer.co/hosted/testmonial_icon1-3930abd8b49d-c1e689ae7422.png"
  //                     isNextImage={true}
  //                     nextImageLayout="fill"
  //                     nextImageObjectFit="contain"
  //                   />
  //                 </div>
  //                 <div className="sideicon2">
  //                   <CachedImage
  //                     url="https://plixlifefc-media.farziengineer.co/hosted/testmonial_icon2-f728ec9508a6-09b7277acffb.png"
  //                     isNextImage={true}
  //                     nextImageLayout="fill"
  //                     nextImageObjectFit="contain"
  //                   />
  //                 </div>
  //                 <div className="sideicon2 mobileOnly">
  //                   <CachedImage
  //                     url="https://plixlifefc-media.farziengineer.co/hosted/testmonial_icon2_mobile-f53244818d5d-8e3e0fc9e68a.png"
  //                     isNextImage={true}
  //                     nextImageLayout="fill"
  //                     nextImageObjectFit="contain"
  //                   />
  //                 </div>
  //                 <div className="sideicon3">
  //                   <CachedImage
  //                     url="https://plixlifefc-media.farziengineer.co/hosted/testmonial_icon3-a2a3a44fc338-c6f59ab25709.png"
  //                     isNextImage={true}
  //                     nextImageLayout="fill"
  //                     nextImageObjectFit="contain"
  //                   />
  //                 </div>
  //               </div>
  //             </>
  //           );
  //         }
  //         return <> </>;
  //       }}
  //     </TypedSectionWithoutChildrenQuery>
  //   );
  // };

  // const CleanlabelNew = () => {
  //   const cleanlabelSection =
  //     props.data?.cleanLabel?.edges?.length && props.data?.cleanLabel?.edges[0];

  //   const CleanlabelNewdata =
  //     cleanlabelSection &&
  //     getMetadataValue(cleanlabelSection.node.metadata, "cleanLabelData") &&
  //     parseJson(
  //       getMetadataValue(cleanlabelSection.node.metadata, "cleanLabelData")
  //     );

  //   return (
  //     <>
  //       {CleanlabelNewdata && (
  //         <>
  //           <div className="clean_label">
  //             <CachedImage
  //               url={CleanlabelNewdata.primaryImage}
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //               imgixSizes="100vw"
  //             />
  //           </div>
  //           <div className="clean_label mobileOnly">
  //             <CachedImage
  //               url={CleanlabelNewdata.secondaryImage}
  //               isNextImage={true}
  //               nextImageLayout="fill"
  //               nextImageObjectFit="contain"
  //             />
  //           </div>
  //         </>
  //       )}
  //     </>
  //   );
  // };

  const targetref = useRef(null);

  const closeThankYouPopup = event => {
    if (targetref.current && !targetref.current.contains(event.target)) {
      setshowthankyouSection(false);
      router.replace(`${window.location.origin}${window.location.pathname}`);
    }
  };

  const ShopMetaContextValue = React.useContext(ShopMetaContext);

  const fireworkConfig =
    getMetadataValue(ShopMetaContextValue, "firework_config") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "firework_config"));

  const quizSectionData =
    props?.data?.quizSection?.edges && props?.data?.quizSection?.edges[0];

  const quizSectionMetaData =
    props?.data?.quizSection?.edges && props?.data?.quizSection?.edges[0]?.node?.metadata ||[]

  const quizSectionBanner = 
  quizSectionMetaData && getMetadataValue(quizSectionMetaData,"quizBanner") &&
  parseJson(getMetadataValue(quizSectionMetaData,"quizBanner"))

  const quizRhWidget =
  quizSectionMetaData && getMetadataValue(quizSectionMetaData,"quizRhWidget") &&
  parseJson(getMetadataValue(quizSectionMetaData,"quizRhWidget"))

  const isLoggedIn = user?.id && user?.phone;
  return (
    <div className="homepage_continer">
      {fireworkConfig?.isEnabled && (
        <Script id="fw-script" src="https://asset.fwcdn3.com/js/fwn-async.js" />
      )}

      {/* <script className="structured-data-list" type="application/ld+json"
        {structuredData(shop)}
      </script> */}

      {/* thankyou popup  */}

      {showthankyouSection && (
        <div
          className="thankyou_popup_wrapper"
          onClick={e => closeThankYouPopup(e)}
        >
          <div className="inner_thankyou_popup" ref={targetref}>
            <div className="thank_you_popup_image">
              <CachedImage
                url="https://plixlifefc-media.farziengineer.co/hosted/thankyou_banner-9fe76c199cc2.png"
                isNextImage={true}
                nextImageLayout="fill"
                nextImageObjectFit="contain"
              />
            </div>
            <p>Thank you for signing up to Plix!</p>
            <Link href="/page/shop">
              <a>Continue Shopping</a>
            </Link>
          </div>
        </div>
      )}

      <div className="subNavbarContainerWrapper">
        <SubNavbarNew />
      </div>
      {/* <Image width={300} height={300} priority src="https://crista.imgix.net/hosted/CRISTA_website-25_1-07ea32f43940.png?auto=format&fit=max&w=768" /> */}
      {banners.edges.length ? (
        <div className="homeBanner">
          <HomeBanner
            banners={banners?.edges}
            showArrows
            autoPlay
            firstBannerData={props?.data?.firstBannerImage}
            carouselTransitionTime={1250}
            interval={6000}
            preventMovementUntilSwipeScrollTolerance
            swipeScrollTolerance={35}
          />
        </div>
      ) : (
        <> </>
      )}

    <BrandLogos sectionData={props.data?.nutritionBrand} />

    {quizSectionData?.node?.isPublished && quizRhWidget?.enable ?
      <div className="rh-widget rh-inline homepage_quizbanner_widget" data-url="https://admin.revenuehunt.com/public/quiz/JRHkkV" ></div>:
      <></>
    }

    {quizSectionData?.node?.isPublished && quizSectionBanner?.enable ? (
        <div className="new_container homepage_quizbanner">
          <MyCustomLink href={!!isLoggedIn ? '/page/quiz':'/page/login/?redirect_to=/page/quiz'}>
            {quizSectionBanner?.img_desk ?
              <div className="homepage_quizbanner_desk">
                <CachedImage
                  isNextImage
                  imgixSizes="100vw"
                  url={quizSectionBanner?.img_desk}
                  alt={quizSectionBanner?.alt || ""}
                  nextImageLayout="fill"
                />
              </div> :
            <></>
            }
            {quizSectionBanner?.img_mob ?
              <div className="homepage_quizbanner_mob">
                <CachedImage
                  isNextImage
                  imgixSizes="100vw"
                  url={quizSectionBanner?.img_mob}
                  alt={quizSectionBanner?.alt || ""}
                  nextImageLayout="fill"
                />
                </div> :
                <></>
              }
          </MyCustomLink>
        </div>
      ) : (
        <></>
      )}
      <BestSellersNew
        sectionData={props.data?.bestSellersNew}
        firstCollectionData={props?.data?.bestSellerFirstCollectionProducts}
      />
      {/* <Gap size="1rem" largeScreenSize="1vw"  /> */}
      <LazyLoad height={450} offset={50}>
        {fireworkConfig?.isEnabled && fireworkConfig?.homepage?.enabled && (
          <div className="container new_container">
            <FireWorkReelSection
              channel={fireworkConfig?.channel_name}
              componentType="embedFeed"
              autoplay
              playlist={fireworkConfig?.homepage?.playlist_id}
              pip_navigate={false}
            />
          </div>
        )}
      </LazyLoad>
      <LazyLoad height={620} offset={100}>
        <IngredientSetion sectionData={props.data?.takeCare} />
      </LazyLoad>
      <LazyLoad height={55}>
        <TextStripNew sectionData={props.data?.textStripNew} />
      </LazyLoad>

      <LazyLoad height={100} offset={400}>
        <NewLaunches bannerPosition={banners?.edges?.length + 1} />
      </LazyLoad>
      <Gap size="1rem" largeScreenSize="2vw" />

      <LazyLoad height={360} offset={200}>
        <PledgeATree sectionData={props.data?.pledgeTree} />
      </LazyLoad>

      <Gap size="1rem" largeScreenSize="2vw" />

      <LazyLoad height={2020} offset={200}>
        <Collection1
          sectionData={props.data?.collection1New}
          bannerPosition={banners?.edges?.length + 2}
        />
        <MoneyBack sectionData={props.data?.moneyBackGuarantee} />
      </LazyLoad>

      <LazyLoad height={700} offset={200}>
        <NutritionistNew sectionData={props.data?.nutritionistNew} />
      </LazyLoad>

      <LazyLoad height={2020} offset={200}>
        <Collection3 bannerPosition={banners?.edges?.length + 3} />
      </LazyLoad>

      <LazyLoad height={1720} offset={200}>
        <Collection2New bannerPosition={banners?.edges?.length + 4} />
      </LazyLoad>

      <LazyLoad height={1720} offset={200}>
        <Collection4 bannerPosition={banners?.edges?.length + 5} />
      </LazyLoad>

      <LazyLoad height={275} offset={200}>
        <CleanLabel sectionData={props.data?.cleanLabel} />
      </LazyLoad>

      <LazyLoad height={850} offset={200}>
        <Testimonials />
      </LazyLoad>
      <div className="brandLogosSection-container">
        <LazyLoad height={430} offset={200}>
          <PlixInNews sectionData={props.data?.brandLogosNew} />
        </LazyLoad>
      </div>

      {/* <HaveFun /> */}

      {/* <LazyLoad height={400} offset={100}>
            <CollectionListSection />
          </LazyLoad> */}

      {/* <TestimonialsNew /> */}

      {/* <CollectionListSection /> */}
    </div>
  );
};
export default React.memo(Page);
