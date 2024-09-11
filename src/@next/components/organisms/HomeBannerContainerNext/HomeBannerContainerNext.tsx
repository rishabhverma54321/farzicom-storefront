import React, { useEffect, useState } from "react";
import Carousel from "@temp/components/Carousel";
import { CarouselProps } from "nuka-carousel";
import { SharedImigixAndSourceProps } from "react-imgix";
import styles from "./index.module.scss";
import BannersNext from "../../molecules/BannersNext";

interface ImageDimensions {
  width?: number;
  height?: number;
}

export interface ImageWithTextPropsitem {
  id?: number;
  image?: string;
  imgixProps?: SharedImigixAndSourceProps;
  imageDimensions?: ImageDimensions;
  topText?: string;
  middleText?: string;
  bottomText?: string;
  navigation?: string;
  description?: string | React.ReactNode;
  button?: {
    text: string;
    link: string;
  };
}
export interface IHomeBannerContainerNextProps {
  data?: Array<ImageWithTextPropsitem>;
  containerClass?: string;
  isCarousel?: {
    slidesOnDesktop: number;
    slidesOnTab: number;
    slidesOnMobile: number;
    rightArrow?: React.ReactNode;
    leftArrow?: React.ReactNode;
  };
  desktopCarouselProps?: CarouselProps;
  tabCarouselProps?: CarouselProps;
  mobileCarouselProps?: CarouselProps;
  carouselProps?: CarouselProps;
}

export const HomeBannerContainerNext: React.FC<IHomeBannerContainerNextProps> = ({
  data = [],
  containerClass,
  isCarousel,
  desktopCarouselProps,
  tabCarouselProps,
  mobileCarouselProps,
  carouselProps,
  children,
}) => {
  const [showCarousel, setShowCarousel] = useState(false);

  useEffect(() => {
    if (isCarousel) {
      setShowCarousel(true);
    }
  }, []);
  if (isCarousel) {
    if (showCarousel) {
      return (
        <Carousel
          slidesOnDesktop={isCarousel.slidesOnDesktop}
          cellSpacing={10}
          slidesOnMobile={isCarousel.slidesOnMobile}
          slidesOnTab={isCarousel.slidesOnTab}
          rightArrow={isCarousel.rightArrow}
          leftArrow={isCarousel.leftArrow}
          // autoplay={allCarouselProps?.autoplay}
          desktopCarouselProps={desktopCarouselProps}
          mobileCarouselProps={mobileCarouselProps}
          tabCarouselProps={tabCarouselProps}
          {...carouselProps}
          renderBottomCenterControls={data.length > 1}
        >
          {children ||
            (Array.isArray(data) &&
              data?.map((item, index) => {
                return (
                  <BannersNext
                    content={item}
                    priority={index === 0}
                    key={index}
                  />
                );
              }))}
        </Carousel>
      );
    }

    return <BannersNext content={data[0]} priority />;
  }

  return (
    <>
      <div className={styles.containerClass}>
        {children ||
          (Array.isArray(data) &&
            data?.map((item, index) => {
              return (
                <BannersNext
                  content={item}
                  priority={index === 0}
                  key={index}
                />
              );
            }))}
      </div>
    </>
  );
};
HomeBannerContainerNext.displayName = "HomeBannerContainerNext";
export default HomeBannerContainerNext;
