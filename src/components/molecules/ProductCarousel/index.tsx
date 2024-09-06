import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";
import * as React from "react";
import Media from "react-media";
// import ReactSVG from "react-svg";
import RedArrowRightGenie from "images/RedArrowRightGenie.png";

import { CLIENT } from "Themes/config";
import { clients } from "@globalTypes/customGlobalTypes";
// import {
//   smallScreen,
//   largeScreen,
// } from "../../globalStyles/scss/variables.module.scss";
import MemoLeftArrowSVG from "@components/atoms/SvgIcons/LeftArrowSVG";
import { largeScreen, smallScreen } from "@styles/constants";
import MemoLeftArrowPlix from "@components/atoms/SvgIcons/LeftArrowPlix";
import MemoRightArrowPlix from "@components/atoms/SvgIcons/RightArrowPlix";
import MemoRightArrowSVG4 from "@components/atoms/SvgIcons/RightArrowSVG4";

interface CarouselType extends Settings {
  children: React.ReactNode;
  slidesToScroll?: number;
  slidesOnDesktop: number;
  slidesOnTab: number;
  slidesOnMobile: number;
  desktopCarouselProps?: Settings;
  tabCarouselProps?: Settings;
  mobileCarouselProps?: Settings;
  arrowClassName?: string;
}

const ProductCarousel: React.FC<CarouselType> = ({
  children,
  slidesOnDesktop,
  slidesOnMobile,
  slidesOnTab,
  desktopCarouselProps,
  tabCarouselProps,
  mobileCarouselProps,
  slidesToScroll,
  arrowClassName,
  ...rest
}) => {
  const settings = desktopCarouselProps?.customPaging;
  const renderSwitchRight = () => {
    switch (CLIENT) {
      case clients.PLIXLIFEFC:
        return <MemoRightArrowPlix width="32px" height="32px" />;
      default:
        return <MemoRightArrowSVG4 fontSize={32} />;
    }
  };

  const renderSwitchLeft = () => {
    switch (CLIENT) {
      case clients.PLIXLIFEFC:
        return <MemoLeftArrowPlix width="32px" height="32px" />;
      default:
        return <MemoLeftArrowSVG fontSize={32} />;
    }
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      onClick !== null && (
        <button
          className={`slick-arrow custom-arrow-next ${
            props?.arrowClassName || ""
          }`}
          // style={{ ...style, display: "block", background: "green" }}
          onClick={onClick}
        >
          {renderSwitchRight()}
        </button>
      )
    );
  }
  function SamplePrevArrow(props) {
    const { onClick, currentSlide } = props;

    return currentSlide !== 0 || rest?.infinite ? (
      <button
        className={`slick-arrow custom-arrow-prev ${
          props?.arrowClassName || ""
        }`}
        // style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      >
        {renderSwitchLeft()}
      </button>
    ) : null;
  }
  const carousel = (slides: number, other: Settings) => (
    <div style={{ width: "100%", margin: "auto" }}>
      <Slider
        slidesToShow={slides}
        slidesToScroll={slidesToScroll || slides}
        accessibility
        rows={1}
        adaptiveHeight
        arrows
        nextArrow={<SampleNextArrow arrowClassName={arrowClassName} />}
        prevArrow={<SamplePrevArrow arrowClassName={arrowClassName} />}
        {...settings}
        {...rest}
        {...other}
      >
        {children}
      </Slider>
    </div>
  );
  return (
    <Media query={{ maxWidth: smallScreen }}>
      {(matches) =>
        matches ? (
          carousel(slidesOnMobile, mobileCarouselProps)
        ) : (
          <Media query={{ maxWidth: largeScreen }}>
            {(matches) =>
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

export default ProductCarousel;
