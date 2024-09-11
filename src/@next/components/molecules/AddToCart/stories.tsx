import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { AddToCart } from ".";
import { IAddToCartProps } from "./AddToCart";

const DEFAULT_PROPS: IAddToCartProps = {
  product: [],
  refetch: [],
};

storiesOf("@components/molecules/AddToCart", module)
  .addParameters({ component: AddToCart })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <AddToCart {...DEFAULT_PROPS} />);
