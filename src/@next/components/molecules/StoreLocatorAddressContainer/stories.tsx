import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";
import storeLocator from "../../../../static data/storeLocator.json";
// import { MemoryRouter } from "react-router";
import { StoreLocatorAddressContainer } from ".";
import { IStoreLocatorAddressContainerProps } from "./StoreLocatorAddressContainer";

const DEFAULT_PROPS: IStoreLocatorAddressContainerProps = {
  addressList: storeLocator,
};

storiesOf("@components/molecules/StoreLocatorAddressContainer", module)
  .addParameters({ component: StoreLocatorAddressContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <StoreLocatorAddressContainer {...DEFAULT_PROPS} />);
