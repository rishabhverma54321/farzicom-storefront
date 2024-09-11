import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { AppHeader } from ".";
import { IAppHeaderProps } from "./AppHeader";

const DEFAULT_PROPS: IAppHeaderProps = {};

storiesOf("@components/templates/AppHeader", module)
  .addParameters({ component: AppHeader })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <AppHeader {...DEFAULT_PROPS} />);
