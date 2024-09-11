import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { SliderAndInfoWrapper } from ".";
import { ISliderAndInfoWrapperProps } from "./SliderAndInfoWrapper";

const DEFAULT_PROPS: ISliderAndInfoWrapperProps = {
  fontSizeSvg: 1,
  fontSizeTitle: 1,
  infoBgColor: "",
  infoIcon: "",
  infoInnerTitle: "",
  rightContainerContent: [],
  sliderBgColor: "",
  sliderRangeSetter: 1,
  titleColor: "",
};

storiesOf("@components/atoms/SliderAndInfoWrapper", module)
  .addParameters({ component: SliderAndInfoWrapper })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <SliderAndInfoWrapper {...DEFAULT_PROPS} />);
