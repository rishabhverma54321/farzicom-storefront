import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { ScreenLoader } from ".";
import { IScreenLoaderProps } from "./ScreenLoader";

const DEFAULT_PROPS: IScreenLoaderProps = {};

storiesOf("@components/atoms/ScreenLoader", module)
  .addParameters({ component: ScreenLoader })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ScreenLoader {...DEFAULT_PROPS} />);
