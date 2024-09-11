import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { YarnNavbar } from ".";
import { IYarnNavbarProps } from "./YarnNavbar";

const DEFAULT_PROPS: IYarnNavbarProps = {};

storiesOf("@components/atoms/YarnNavbar", module)
  .addParameters({ component: YarnNavbar })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <YarnNavbar {...DEFAULT_PROPS} />);
