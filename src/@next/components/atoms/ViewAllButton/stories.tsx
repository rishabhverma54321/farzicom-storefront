import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { ViewAllButton } from ".";
import { IViewAllButtonProps } from "./ViewAllButton";

const DEFAULT_PROPS: IViewAllButtonProps = {};

storiesOf("@components/atoms/ViewAllButton", module)
  .addParameters({ component: ViewAllButton })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ViewAllButton {...DEFAULT_PROPS} />);
