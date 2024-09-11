import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { OrderStatus } from ".";
import { IOrderStatusProps } from "./OrderStatus";

const DEFAULT_PROPS: IOrderStatusProps = {};

storiesOf("@components/atoms/OrderStatus", module)
  .addParameters({ component: OrderStatus })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <OrderStatus {...DEFAULT_PROPS} />);
