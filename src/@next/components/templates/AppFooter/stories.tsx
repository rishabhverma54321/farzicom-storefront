import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { AppFooter } from ".";
import { IAppFooterProps } from "./AppFooter";

const DEFAULT_PROPS: IAppFooterProps = {};

storiesOf("@components/templates/AppFooter", module)
  .addParameters({ component: AppFooter })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <AppFooter {...DEFAULT_PROPS} />);
