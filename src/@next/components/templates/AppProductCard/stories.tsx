import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { AppProductCard } from ".";
import { IAppProductCardProps } from "./AppProductCard";

const DEFAULT_PROPS: IAppProductCardProps = {};

storiesOf("@components/templates/AppProductCard", module)
  .addParameters({ component: AppProductCard })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <AppProductCard {...DEFAULT_PROPS} />);
