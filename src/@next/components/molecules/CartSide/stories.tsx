import { TaxedMoney } from "@components/containers/TaxedMoney";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { CartSide } from ".";
import { ICartSideProps } from "./CartSide";

const dummyPrice = {
  amount: 500,
  currency: "INR",
};
const dummyTaxed = {
  net: dummyPrice,
  gross: dummyPrice,
};

const DEFAULT_PROPS: ICartSideProps = {
  mrp: <TaxedMoney data-test="subtotalPrice" taxedMoney={dummyTaxed} />,
  itemDiscount: (
    <TaxedMoney data-test="subtotalPrice" taxedMoney={dummyTaxed} />
  ),
  netPrice: <TaxedMoney data-test="subtotalPrice" taxedMoney={dummyTaxed} />,
  couponDiscount: (
    <TaxedMoney data-test="subtotalPrice" taxedMoney={dummyTaxed} />
  ),
  offerDiscount: (
    <TaxedMoney data-test="subtotalPrice" taxedMoney={dummyTaxed} />
  ),
  subtotalPrice: (
    <TaxedMoney data-test="subtotalPrice" taxedMoney={dummyTaxed} />
  ),
  shippingPrice: (
    <TaxedMoney data-test="subtotalPrice" taxedMoney={dummyTaxed} />
  ),
  totalPrice: <TaxedMoney data-test="subtotalPrice" taxedMoney={dummyTaxed} />,
  prepaidDiscount: (
    <TaxedMoney data-test="subtotalPrice" taxedMoney={dummyTaxed} />
  ),
};

storiesOf("@components/molecules/CartSide", module)
  .addParameters({ component: CartSide })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CartSide {...DEFAULT_PROPS} />);
