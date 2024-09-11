import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { RangeSlider } from ".";
import { IRangeSliderProps } from "./RangeSlider";

const DEFAULT_PROPS: IRangeSliderProps = {
  rangeSetter: 60,
  bgColor: "#33A532",
};

storiesOf("@components/atoms/RangeSlider", module)
  .addParameters({ component: RangeSlider })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <RangeSlider {...DEFAULT_PROPS} />);
