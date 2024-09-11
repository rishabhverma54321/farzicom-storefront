import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { ImageComparisonSlider } from ".";
import { IImageComparisonSliderProps } from "./ImageComparisonSlider";

const DEFAULT_PROPS: IImageComparisonSliderProps = {};

storiesOf("@components/farzicom-ui-kit/ImageComparisonSlider", module)
.addParameters({ component: ImageComparisonSlider })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<ImageComparisonSlider {...DEFAULT_PROPS} />);