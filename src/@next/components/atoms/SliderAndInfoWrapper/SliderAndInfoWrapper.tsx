import React, { ReactNode } from "react";
import RangeSlider from "../RangeSlider/RangeSlider";
import TestComponent from "../TestComponent/TestComponent";

export interface ISliderAndInfoWrapperProps {
  sliderBgColor: string;
  sliderRangeSetter: number;
  infoIcon: ReactNode;
  infoInnerTitle: string;
  rightContainerContent: Array<ReactNode>;
  infoBgColor: string;
  fontSizeSvg: number;
  fontSizeTitle: number;
  titleColor: string;
}

export const SliderAndInfoWrapper: React.FC<ISliderAndInfoWrapperProps> = ({
  sliderBgColor,
  fontSizeSvg,
  fontSizeTitle,
  infoIcon,
  rightContainerContent,
  sliderRangeSetter,
  infoInnerTitle,
  infoBgColor,
  titleColor,
}) => {
  return (
    <>
      <RangeSlider rangeSetter={sliderRangeSetter} bgColor={sliderBgColor} />
      <TestComponent
        svgSrc={infoIcon}
        innerTitle={infoInnerTitle}
        rightContainerContent={rightContainerContent}
        bgColor={infoBgColor}
        fontSizeSvg={fontSizeSvg}
        fontSizeTitle={fontSizeTitle}
        titleColor={titleColor}
        className="profile-status-info"
      />
    </>
  );
};
SliderAndInfoWrapper.displayName = "SliderAndInfoWrapper";
export default SliderAndInfoWrapper;
