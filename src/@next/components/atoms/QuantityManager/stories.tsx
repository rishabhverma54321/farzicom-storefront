import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { QuantityManager } from ".";
import { IQuantityManagerProps } from "./QuantityManager";

const DEFAULT_PROPS: IQuantityManagerProps = {
  currentQuantity: 2,
  add: () => undefined,
  substract: () => undefined,
};

storiesOf("@components/atoms/QuantityManager", module)
  .addParameters({ component: QuantityManager })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <QuantityManager {...DEFAULT_PROPS} />);
