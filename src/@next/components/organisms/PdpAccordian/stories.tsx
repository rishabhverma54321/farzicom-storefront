import { storiesOf } from "@storybook/react";
import { ProductDetails_product_metadata } from "@temp/themes/lotus/views/Product/gqlTypes/ProductDetails";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { PdpAccordian } from ".";
import { IPdpAccordianProps } from "./PdpAccordian";

const item: ProductDetails_product_metadata = {
  __typename: "MetadataItem",
  key: "key",
  value: "value",
};
const DEFAULT_PROPS: IPdpAccordianProps = { item };

storiesOf("@components/organisms/PdpAccordian", module)
  .addParameters({ component: PdpAccordian })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <PdpAccordian {...DEFAULT_PROPS} />);
