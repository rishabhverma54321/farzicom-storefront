import React, { useEffect, useRef, useState } from "react";
import Media from "react-media";
import { Carousel } from "react-responsive-carousel";
import { ProductsList_banners_edges } from "@temp/themes/lotus/views/Home/gqlTypes/ProductsList";
import { largeScreen, mediumScreen, smallScreen } from "@styles/constants";
import { useAuthState, useCart } from "@saleor/sdk";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { BannerType } from "@globalTypes";
import {
  bannerClickDatalayer,
  bannerImpressionDatalayer,
  isMember,
  imageURLReplaceWithCDN,
} from "@utils/misc";
import { getDBIdFromGraphqlId, getGclid } from "@temp/core/utils";
import Imgix from "react-imgix";
import { IMAGE_CDN_PROVIDERS, IMAGE_CDN } from "Themes/config";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { HomePageQueryNext_banners_edges } from "@temp/themes/wowfc-new/views/Home/gqlTypes/HomePageQueryNext";
import Image from "next/image";
import useMediaQuery from "@hooks/useMediaQuery";
import { ENABLE_GA4 } from "Themes/config";
import { CustomVisibilitySensor } from "@components/farzicom-ui-kit/CustomVisibilitySensor";

export interface IHomeBannerProps {
  banners: ProductsList_banners_edges[] | HomePageQueryNext_banners_edges[];
  showArrows?: boolean;
  autoPlay?: boolean;
  carouselTransitionTime?: number;
  interval?: number;
  preventMovementUntilSwipeScrollTolerance?: boolean;
  swipeScrollTolerance?: number;
  firstBannerData?: any;
}

export const HomeBanner: React.FC<IHomeBannerProps> = ({
  banners,
  showArrows,
  autoPlay = true,
  interval = 3000,
  carouselTransitionTime,
  preventMovementUntilSwipeScrollTolerance = false,
  swipeScrollTolerance = 5,
  firstBannerData,
}) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const clevertap = makeClevertap();
  const bannerDataForDatalayer =
    banners && Array.isArray(banners) && ENABLE_GA4
      ? banners.map(banner => ({
        promotion_id: getDBIdFromGraphqlId(
          banner?.node?.id,
          "CustomBannerType"
        ),
        promotion_name: banner.node?.name,
        creative_name: `main_banner_${getDBIdFromGraphqlId(
          banner?.node?.id,
          "CustomBannerType"
        )}`,
        creative_slot: banner.node?.position,
      }))
      : banners.map((banner, index) => ({
        id: getDBIdFromGraphqlId(banner?.node?.id, "CustomBannerType"),
        name: banner.node?.name,
        position: index + 1,
        linkOnBanner: banner?.node?.link,
        location: typeof window !== "undefined" ? window.location.href : "",
      }));
  useEffect(() => {
    setShowCarousel(true);
    const ctp = {
      timeStamp: Date.now(),
      pageTitle: document.title,
      customerEmail: user?.email,
      customerPhone: user?.defaultBillingAddress?.phone,
      bannerName: text,
      clickSource: "homePage",
      gaUserId: getGclid(),
      position: 0,
      "Landing URL": link,
      "Mobile Image Url": imageMobileUrl,
      "Desktop Image Url": imageUrl,
    };
    if (clevertapEvents.bannerViews.enable) {
      clevertap.event.push(clevertapEvents.bannerViews.value, ctp);
    }

    // Banner Promotion Impression
  }, []);

  const type = BannerType.BANNERTYPES_HOME_PAGE;
  const bannersToShow = banners?.filter(
    banner =>
      banner.node &&
      banner.node.text !== "" &&
      banner.node.type === type &&
      banner.node.imageUrl &&
      banner.node.imageMobileUrl // temperorily removed
  );
  bannersToShow?.sort((b1, b2) => {
    return b1?.node?.position! >= b2?.node?.position! ? 1 : -1;
  });
  //
  // bannersToShow
  //
  const { user } = useAuthState();
  const { items } = useCart();
  const isBreakpoint = useMediaQuery(mediumScreen, "min-width");
  const carouselRef = useRef(null);

  if (showCarousel) {
    return (
      <div className="homebanner carousel-container">
        <Carousel
          ref={carouselRef}
          autoPlay={autoPlay}
          showThumbs={false}
          swipeable={bannersToShow?.length > 1}
          useKeyboardArrows
          infiniteLoop
          showStatus={false}
          showArrows={showArrows || false}
          showIndicators={bannersToShow?.length > 1}
          stopOnHover={false}
          interval={interval}
          transitionTime={carouselTransitionTime || 1000}
          preventMovementUntilSwipeScrollTolerance={
            preventMovementUntilSwipeScrollTolerance
          }
          swipeScrollTolerance={swipeScrollTolerance}
          onChange={() => {
            if (carouselRef.current) {
              carouselRef.current.resetAutoPlay();
            }
          }}
        >
          {bannersToShow?.map(({ node }, index) => {
            //
            if (node) {
              const { imageUrl, imageMobileUrl, text, link } = node;
              const ga4EventData = [
                {
                  promotion_id: getDBIdFromGraphqlId(
                    node?.id,
                    "CustomBannerType"
                  ),
                  promotion_name: node?.name,
                  creative_name: `main_banner_${getDBIdFromGraphqlId(
                    node?.id,
                    "CustomBannerType"
                  )}`,
                  creative_slot: index + 1,
                },
              ];

              const ctp = {
                timeStamp: Date.now(),
                pageTitle: document.title,
                customerEmail: user?.email,
                customerPhone: user?.defaultBillingAddress?.phone,
                bannerName: text,
                clickSource: "homePage",
                gaUserId: getGclid(),
                position: index + 1,
                "Landing URL": link,
                "Mobile Image Url": imageMobileUrl,
                "Desktop Image Url": imageUrl,
              };

              const handleOnView = () => {
                if (clevertapEvents.bannerViews.enable) {
                  console.log("page-views", ctp);
                  clevertap.event.push(clevertapEvents.bannerViews.value, ctp);
                }
              };

              const handleClick = () => {
                if (clevertapEvents.bannerClicks.enable) {
                  clevertap.event.push(clevertapEvents.bannerClicks.value, ctp);
                }
                if (gtmConfig.bannerClicks.enable) {
                  if (window.dataLayer) {
                    window.dataLayer.push({ ecommerce: null });
                  }
                  (window.dataLayer = window.dataLayer || []).push({
                    event: gtmConfig.bannerClicks.value,
                    UserID: user?.id,
                    user_type: user ? "logged_in" : "logged_out",
                    ecommerce: {
                      bannerClick: {
                        banners: [
                          {
                            id: node?.id,
                            name: text,
                            position: index + 1,
                            creative: index + 1,
                            timeStamp: Date.now(),
                            "Landing URL": link,
                            "Mobile Image Url": imageMobileUrl,
                            "Desktop Image Url": imageUrl,
                          },
                        ],
                      },
                    },
                  });
                }

                if (ENABLE_GA4) {
                  bannerClickDatalayer(ga4EventData, user);
                }
              };
              const imageUrlImgixScr = imageUrl?.includes(".gif")
                ? imageUrl
                : imageURLReplaceWithCDN(imageUrl);

              const imageMobileUrlImgixScr = imageMobileUrl?.includes(".gif")
                ? imageMobileUrl
                : imageURLReplaceWithCDN(imageMobileUrl);

              if (imageUrlImgixScr && imageMobileUrlImgixScr && index === 0) {
                return (
                  <React.Fragment key={index}>
                    <CustomVisibilitySensor
                      onChange={inViewport => {
                        if (inViewport) {
                          bannerImpressionDatalayer(ga4EventData, user);
                          handleOnView();
                        }
                      }}
                    >
                      <MyCustomLink href={link}>
                        <div
                          className="homebannerImageContainerDiv"
                          onClick={handleClick}
                        >
                          {imageUrlImgixScr &&
                            IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN ? (
                            <>
                              <Image
                                src={imageMobileUrlImgixScr}
                                alt={text || "Banner"}
                                priority={index === 0}
                                layout="fill"
                                sizes="100vw"
                                objectFit="contain"
                                className="show-on-mobile"
                              />

                              <Image
                                src={imageUrlImgixScr}
                                alt={text || "Banner"}
                                layout="fill"
                                sizes="100vw"
                                objectFit="contain"
                                className="show-on-desktop"
                              />
                            </>
                          ) : (
                            <img
                              width="100%"
                              src={
                                isBreakpoint
                                  ? imageUrlImgixScr
                                  : imageMobileUrlImgixScr
                              }
                              alt=""
                              key={text}
                            />
                          )}
                        </div>
                      </MyCustomLink>
                    </CustomVisibilitySensor>
                  </React.Fragment>
                );
              }

              if (imageUrlImgixScr && imageMobileUrlImgixScr) {
                return (
                  <React.Fragment key={index}>
                    <CustomVisibilitySensor
                      onChange={inViewport => {
                        if (inViewport) {
                          bannerImpressionDatalayer(ga4EventData, user);
                          handleOnView();
                        }
                      }}
                    >
                      <MyCustomLink href={link}>
                        <div
                          className="homebannerImageContainerDiv"
                          onClick={handleClick}
                        >
                          {imageUrlImgixScr &&
                            IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN ? (
                            <>
                              <Image
                                src={imageMobileUrlImgixScr}
                                alt={text || "Banner"}
                                priority={index === 0}
                                layout="fill"
                                sizes="100vw"
                                objectFit="contain"
                                className="show-on-mobile"
                              />

                              <Image
                                src={imageUrlImgixScr}
                                alt={text || "Banner"}
                                layout="fill"
                                sizes="100vw"
                                objectFit="contain"
                                className="show-on-desktop"
                              />
                            </>
                          ) : (
                            <img
                              width="100%"
                              src={
                                isBreakpoint
                                  ? imageUrlImgixScr
                                  : imageMobileUrlImgixScr
                              }
                              alt=""
                              key={text}
                            />
                          )}
                        </div>
                      </MyCustomLink>
                    </CustomVisibilitySensor>
                  </React.Fragment>
                );
              }

              return <> </>;
            }
            return <> </>;
          })}
        </Carousel>
      </div>
    );
  }

  const { imageUrl, imageMobileUrl, text, link } = bannersToShow[0]?.node;
  const imageUrlImgixScr = imageURLReplaceWithCDN(imageUrl);
  const imageMobileUrlImgixScr = imageURLReplaceWithCDN(imageMobileUrl);
  // "http://localhost:3000/plixlifefc/assets/banner.avif"
  return (
    <>
      <div className="homebannerImageContainerDiv">
        {imageUrlImgixScr && IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN ? (
          <>
            <Image
              src={imageMobileUrlImgixScr}
              alt={text || "Banner"}
              priority
              layout="fill"
              sizes="100vw"
              quality={35}
              className="show-on-mobile"
            />

            <Image
              src={imageUrlImgixScr}
              alt={text || "Banner"}
              layout="fill"
              sizes="100vw"
              className="show-on-desktop"
            />
          </>
        ) : (
          <img
            width="100%"
            src={isBreakpoint ? imageUrlImgixScr : imageMobileUrlImgixScr}
            alt=""
          />
        )}
      </div>
    </>
  );
};
HomeBanner.displayName = "HomeBanner";
export default HomeBanner;
