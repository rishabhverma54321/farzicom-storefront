import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { OrderDispatchCard } from ".";
import { IOrderDispatchCardProps } from "./OrderDispatchCard";

const DEFAULT_PROPS: IOrderDispatchCardProps = {
  productTitle: "",
  totalQuantity: 0,
  rate: "",
};

storiesOf("@components/atoms/OrderDispatchCard", module)
  .addParameters({ component: OrderDispatchCard })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <OrderDispatchCard {...DEFAULT_PROPS} />);
