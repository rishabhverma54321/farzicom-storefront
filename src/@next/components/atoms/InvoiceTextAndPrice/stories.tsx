import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { InvoiceTextAndPrice } from ".";
import { IInvoiceTextAndPriceProps } from "./InvoiceTextAndPrice";

const DEFAULT_PROPS: IInvoiceTextAndPriceProps = {
  text: "MRP",
  money: 799,
};

storiesOf("@components/atoms/InvoiceTextAndPrice", module)
  .addParameters({ component: InvoiceTextAndPrice })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <InvoiceTextAndPrice {...DEFAULT_PROPS} />);
