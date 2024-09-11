import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { Connect } from ".";
import { IConnectProps } from "./Connect";

const DEFAULT_PROPS: IConnectProps = {};

storiesOf("@components/atoms/Connect", module)
  .addParameters({ component: Connect })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <Connect {...DEFAULT_PROPS} />);
