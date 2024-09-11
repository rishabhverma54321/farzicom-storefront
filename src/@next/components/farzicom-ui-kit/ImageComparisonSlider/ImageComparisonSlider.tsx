import React, { useRef, useState, useEffect, useCallback } from "react";
import { CachedImage } from "@components/molecules/CachedImage";
import S from "./index.module.scss";
import SliderHandle from "./SliderHandle";

export interface IImageComparisonSliderProps {
  sliderInitialPosition: number;
  sliderWidth: number;
  sliderData: {
    enable: boolean;
    before: {
      image: string;
      alt: string;
    };
    after: {
      image: string;
      alt: string;
    };
  };
  animation: boolean;
  animationCycleDuration: number;
}
let animationLoop: number;

export const ImageComparisonSlider: React.FC<IImageComparisonSliderProps> = ({
  sliderInitialPosition = 1,
  sliderWidth = 3,
  sliderData,
  animationCycleDuration = 10000,
  animation = false,
}) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [fromLeft, setFromLeft] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const fromLeftRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const {
        top,
        left,
        height,
        width,
      } = containerRef.current.getBoundingClientRect();
      const vertInView = top <= window.innerHeight && top + height >= 0;
      const horInView = left <= window.innerWidth && left + width >= 0;
      if (vertInView && horInView) {
        setIsVisible(true);
      }
    };
    if (containerRef && containerRef.current) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let step = 1;
    let widthClosure = 0;

    function animateSlider(): void {
      if (
        fromLeftRef.current !== null &&
        fromLeftRef.current >= widthClosure * 0.5
      ) {
        animationLoop = requestAnimationFrame(animateSlider);
        if (fromLeftRef.current >= widthClosure) {
          step *= -1;
        } else if (fromLeftRef.current <= 0) {
          step *= -1;
        }
        setFromLeft(fromLeftRef.current + step);
        fromLeftRef.current += step;
      }
    }

    if (containerRef && containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({
        width,
        height,
      });
      setFromLeft(width * sliderInitialPosition);
      if (animation) {
        fromLeftRef.current = width * sliderInitialPosition;
        step = Math.round((width / animationCycleDuration) * 16.6 * 100) / 100;
        widthClosure = width;
        animateSlider();
      }
    }
  }, [sliderInitialPosition, animation, isVisible]);

  useEffect(() => {
    function handleMouseUp(e: MouseEvent | TouchEvent): void {
      setIsMouseDown(false);
    }

    function handleMouseMove(e: MouseEvent): void {
      if (containerRef && containerRef.current && isMouseDown) {
        const { left, width } = containerRef.current.getBoundingClientRect();

        if (e.pageX - left < 0) {
          setFromLeft(0 - sliderWidth / 2);
        } else if (e.pageX > left + width) {
          setFromLeft(width - sliderWidth / 2);
        } else {
          setFromLeft(e.pageX - left);
        }
      }
    }

    function handleTouchMove(e: TouchEvent): void {
      if (containerRef && containerRef.current && isMouseDown) {
        const { left, width } = containerRef.current.getBoundingClientRect();

        if (e.touches[0].pageX - left < 0) {
          setFromLeft(0 - sliderWidth / 2);
        } else if (e.touches[0].pageX > left + width) {
          setFromLeft(width - sliderWidth / 2);
        } else {
          setFromLeft(e.touches[0].pageX - left);
        }
      }
    }

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);

    return (): void => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isMouseDown]);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ): void => {
    e.stopPropagation();
    e.preventDefault();

    cancelAnimationFrame(animationLoop);
    setIsMouseDown(true);
  };

  return (
    <div
      className={S.slider__wrapper}
      ref={containerRef}
      style={{
        cursor: isMouseDown ? "ew-resize" : "default",
      }}
    >
      {fromLeft !== null && (
        <>
          {sliderData && sliderData?.after && sliderData?.after?.image ? (
            <div className={S.slider__container}>
              <CachedImage
                alt={sliderData?.after?.alt || ""}
                url={sliderData?.after?.image}
                imageDimensions={{
                  width: containerSize.width,
                  height: containerSize.height,
                }}
              />
            </div>
          ) : (
            <></>
          )}

          {sliderData && sliderData?.before && sliderData?.before?.image ? (
            <div
              className={`${S.slider__container} ${S.img_comp_overlay}`}
              style={{ width: fromLeft <= 0 ? 0 : fromLeft }}
            >
              <CachedImage
                alt={sliderData?.before?.alt || ""}
                url={sliderData?.before?.image}
                imageDimensions={{
                  width: containerSize.width,
                  height: containerSize.height,
                }}
              />
            </div>
          ) : (
            <></>
          )}

          <div
            className={S.slider__stick}
            style={{
              left: fromLeft,
              width: sliderWidth,
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className={S.slider__handle}>
              <SliderHandle backgroundColor="#FFF" color="#5dd37c" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
ImageComparisonSlider.displayName = "ImageComparisonSlider";
export default ImageComparisonSlider;
