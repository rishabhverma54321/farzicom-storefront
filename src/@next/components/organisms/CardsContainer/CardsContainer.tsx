import React, { useEffect, useState } from "react";
import Carousel from "@temp/components/Carousel";
import { CarouselProps } from "nuka-carousel";
import { SharedImigixAndSourceProps } from "react-imgix";
import * as S from "./style";
import Card from "../../molecules/Card";
import { useWindowWidth } from "@hooks";
interface ImageDimensions {
  width?: number;
  height?: number;
}

export interface ImageWithTextPropsitem {
  id?: number;
  image?: string | React.ReactNode;
  imgixProps?: SharedImigixAndSourceProps;
  imageDimensions?: ImageDimensions;
  title?: string | React.ReactNode;
  navigation?: string;
  description?: string | React.ReactNode;
  button?: {
    text: string;
    link: string;
    leftIcon?: string;
    rightIcon?: string;
  };
}
export interface ICardsContainerProps {
  data?: Array<ImageWithTextPropsitem>;
  containerClass?: string;
  cardClass?: string;
  isCarousel?:
    | {
        slidesOnDesktop: number;
        slidesOnTab: number;
        slidesOnMobile: number;
        rightArrow?: React.ReactNode;
        leftArrow?: React.ReactNode;
      }
    | boolean;
  desktopCarouselProps?: CarouselProps;
  tabCarouselProps?: CarouselProps;
  mobileCarouselProps?: CarouselProps;
  carouselProps?: CarouselProps;
  children: React.ReactNode
}

export const CardsContainer: React.FC<ICardsContainerProps> = ({
  data = [],
  containerClass,
  cardClass = " ",
  isCarousel,
  desktopCarouselProps,
  tabCarouselProps,
  mobileCarouselProps,
  carouselProps,
  children,
}) => {
  const [showCarousel, setShowCarousel] = useState(false);

  useEffect(() => {
    setShowCarousel(true);
  }, []);

  const [width] = useWindowWidth();
  if (isCarousel && typeof isCarousel != "boolean") {
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
          renderBottomCenterControls={false}
          {...carouselProps}
        >
          {children ||
            (Array.isArray(data) &&
              data?.map((item, index) => {
                return (
                  <Card content={item} cardClass={cardClass} key={index} />
                );
              }))}
        </Carousel>
      );
    }

    return (
      <>
        <S.Wrapper className={containerClass}>
          {children ||
            (Array.isArray(data) &&
              data?.slice(0, 4).map((item, index) => {
                return (
                  <Card content={item} cardClass={cardClass} key={index} />
                );
              }))}
        </S.Wrapper>
      </>
    );
  }

  return (
    <>
      <S.Wrapper className={containerClass}>
        {children ||
          (Array.isArray(data) &&
            data?.map((item, index) => {
              return <Card content={item} cardClass={cardClass} key={index} />;
            }))}
      </S.Wrapper>
    </>
  );
};
CardsContainer.displayName = "CardsContainer";
export default CardsContainer;
