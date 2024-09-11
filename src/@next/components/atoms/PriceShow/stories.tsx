import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { PriceShow } from ".";
import { IPriceShowProps } from "./PriceShow";

const DEFAULT_PROPS: IPriceShowProps = {
  price: 799,
  discount: "(10% Off)",
  alignMent: "center",
};

storiesOf("@components/atoms/PriceShow", module)
  .addParameters({ component: PriceShow })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <PriceShow {...DEFAULT_PROPS} />);
