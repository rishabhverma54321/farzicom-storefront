import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { YarnSidebar } from ".";
import { IYarnSidebarProps } from "./YarnSidebar";

const DEFAULT_PROPS: IYarnSidebarProps = {};

storiesOf("@components/containers/YarnSidebar", module)
  .addParameters({ component: YarnSidebar })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <YarnSidebar {...DEFAULT_PROPS} />);
