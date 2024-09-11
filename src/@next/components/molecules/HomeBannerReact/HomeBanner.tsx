import React from "react";
import Media from "react-media";
import { Carousel } from "react-responsive-carousel";
import { ProductsList_banners_edges } from "@temp/themes/lotus/views/Home/gqlTypes/ProductsList";
import { largeScreen, mediumScreen, smallScreen } from "@styles/constants";
import { useAuthState, useCart } from "@saleor/sdk";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { BannerType } from "@globalTypes";
import { useImageURLReplaceWithCDN } from "@utils/misc";
import { getGclid } from "@temp/core/utils";
import Imgix from "react-imgix";
import { IMAGE_CDN_PROVIDERS, IMAGE_CDN } from "Themes/config";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { HomePageQueryNext_banners_edges } from "@temp/themes/wowfc-new/views/Home/gqlTypes/HomePageQueryNext";
import Image from "next/image";
import useMediaQuery from "@hooks/useMediaQuery";

export interface IHomeBannerProps {
  banners: ProductsList_banners_edges[] | HomePageQueryNext_banners_edges[];
  showArrows?: boolean;
  autoPlay?: boolean;
  carouselTransitionTime?: number;
  interval?: number;
  preventMovementUntilSwipeScrollTolerance?: boolean;
  swipeScrollTolerance?: number;
}

export const HomeBanner: React.FC<IHomeBannerProps> = ({
  banners,
  showArrows,
  autoPlay = true,
  interval = 3000,
  carouselTransitionTime,
  preventMovementUntilSwipeScrollTolerance = false,
  swipeScrollTolerance = 5,
}) => {
  const type = BannerType.BANNERTYPES_HOME_PAGE;
  const bannersToShow = banners?.filter(
    banner =>
      banner.node &&
      banner.node.text !== "" &&
      banner.node.type === type &&
      banner.node.isEnabled &&
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
  const isBreakpoint = useMediaQuery(mediumScreen, "max-width");
  const isNext = process.env.NEXT_PUBLIC_NEXT;

  return (
    <div className="homebanner carousel-container">
      <Carousel
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
      >
        {bannersToShow?.map(({ node }, index) => {
          //
          if (node) {
            const { imageUrl, imageMobileUrl, text, link } = node;
            const clevertap = makeClevertap();
            const handleClick = () => {
              const ctp = {
                timeStamp: Date.now(),
                pageTitle: document.title,
                customerEmail: user?.email,
                customerPhone: user?.defaultBillingAddress?.phone,
                quantity: items?.length,
                bannerName: name,
                clickSource: "homePage",
                gaUserId: getGclid(),
                Clicks: `Banner ${index + 1}`,
                "Landing URL": link,
                "Mobile Image Url": imageMobileUrl,
                "Desktop Image Url": imageUrl,
              };
              if (clevertapEvents.bannerClicks.enable) {
                clevertap.event.push(clevertapEvents.bannerClicks.value, ctp);
              }
              if (gtmConfig.bannerClicks.enable) {
                if (window.dataLayer) {
                  window.dataLayer.push({ ecommerce: null });
                }
                (window.dataLayer = window.dataLayer || []).push({
                  event: gtmConfig.bannerClicks.value,
                  ecommerce: {
                    "Banner clicks": ctp,
                  },
                });
              }
            };
            const imageUrlImgixScr = useImageURLReplaceWithCDN(imageUrl);

            const imageMobileUrlImgixScr = useImageURLReplaceWithCDN(
              imageMobileUrl
            );

            if (imageUrlImgixScr && imageMobileUrlImgixScr) {
              return (
                <React.Fragment key={index}>
                  <MyCustomLink href={link}>
                    <div onClick={handleClick}>
                      {imageUrlImgixScr &&
                      IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN ? (
                        <Imgix
                          src={
                            isBreakpoint
                              ? imageMobileUrlImgixScr
                              : imageUrlImgixScr
                          }
                          width={1440}
                        />
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
};
HomeBanner.displayName = "HomeBanner";
export default HomeBanner;
