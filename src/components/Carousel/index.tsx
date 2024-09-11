import { CarouselProps } from "nuka-carousel";
import { Carousel as NukaCarousel } from "nuka-carousel";
import * as React from "react";
import Media from "react-media";
// import ReactSVG from "react-svg";

// import arrowImgRight from "../../images/lotus/Right arrow.svg";
// import arrowImgLeft from "../../images/lotus/Left arrow.svg";
import { largeScreen, smallScreen } from "@styles/constants";
import MemoRightArrowSVG from "@components/atoms/SvgIcons/RightArrowSVG";
import MemoLeftArrowSVG from "@components/atoms/SvgIcons/LeftArrowSVG";
import MemoRightArrowSVG4 from "@components/atoms/SvgIcons/RightArrowSVG4";

// import {
//   smallScreen,
//   largeScreen,
// } from "../../globalStyles/scss/variables.module.scss";
//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

interface CarouselType extends CarouselProps {
  children: React.ReactNode;
  slidesOnDesktop: number;
  slidesOnTab: number;
  slidesOnMobile: number;
  desktopCarouselProps?: CarouselProps;
  tabCarouselProps?: CarouselProps;
  mobileCarouselProps?: CarouselProps;
  rightArrow?: React.ReactNode;
  leftArrow?: React.ReactNode;
  wrapAround?: boolean;
}

const Carousel: React.FC<CarouselType> = ({
  children,
  slidesOnDesktop,
  slidesOnMobile,
  slidesOnTab,
  desktopCarouselProps,
  tabCarouselProps,
  mobileCarouselProps,
  rightArrow,
  leftArrow,
  wrapAround,
  ...rest
}) => {
  const settings = {
    className: "carousel",
    wrapAround,
    ...rest,
  };
  const carousel = (slides: number, other: CarouselProps) => (
    <NukaCarousel
      slidesToShow={slides}
      slidesToScroll={slides}
      renderCenterLeftControls={({ previousSlide, currentSlide }) =>
        currentSlide !== 0 || wrapAround ? (
          <div
            onClick={previousSlide}
            className="carousel__control carousel__control--left"
          >
            {leftArrow ? <>{leftArrow}</> : <MemoLeftArrowSVG fontSize={32} />}
          </div>
        ) : null
      }
      renderCenterRightControls={({
        nextSlide,
        currentSlide,
        slideCount,
        slidesToShow,
      }) =>
        slideCount - slidesToShow !== currentSlide || wrapAround ? (
          <div
            onClick={nextSlide}
            className="carousel__control carousel__control--right"
          >
            {rightArrow ? (
              <>{rightArrow}</>
            ) : (
              <MemoRightArrowSVG4 fontSize={32} />
            )}
          </div>
        ) : null
      }
      heightMode="max"
      {...settings}
      {...other}
    >
      {children}
    </NukaCarousel>
  );
  return (
    <Media query={{ maxWidth: smallScreen }}>
      {matches =>
        matches ? (
          carousel(slidesOnMobile, mobileCarouselProps)
        ) : (
          <Media query={{ maxWidth: largeScreen }}>
            {matches =>
              carousel(
                matches ? slidesOnTab : slidesOnDesktop,
                matches ? tabCarouselProps : desktopCarouselProps
              )
            }
          </Media>
        )
      }
    </Media>
  );
};

export default Carousel;
