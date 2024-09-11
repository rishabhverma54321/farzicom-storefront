import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { StoreLocatorAddress } from ".";
import { IStoreLocatorAddressProps } from "./StoreLocatorAddress";

const singleAddress = {
  storeName: "Acropolis Mall, Kolkata",
  address:
    "Shop No. GK-002, Situated at 1858/1, Rajdanga Main Road, Kolkata, 70017, P.S",
  area: "Kolkata, West Bengal",
};

const DEFAULT_PROPS: IStoreLocatorAddressProps = {
  singleAddress,
};

storiesOf("@components/atoms/StoreLocatorAddress", module)
  .addParameters({ component: StoreLocatorAddress })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <StoreLocatorAddress {...DEFAULT_PROPS} />);
