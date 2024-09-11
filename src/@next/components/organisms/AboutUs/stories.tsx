import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { AboutUs } from ".";
import { IAboutUsProps } from "./AboutUs";

const DEFAULT_PROPS: IAboutUsProps = {};

storiesOf("@components/organisms/AboutUs", module)
  .addParameters({ component: AboutUs })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <AboutUs {...DEFAULT_PROPS} />);
