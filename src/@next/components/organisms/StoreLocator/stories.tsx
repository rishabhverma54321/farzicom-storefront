import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { StoreLocator } from ".";
import { IStoreLocatorProps } from "./StoreLocator";

const DEFAULT_PROPS: IStoreLocatorProps = {};

storiesOf("@components/organisms/StoreLocator", module)
  .addParameters({ component: StoreLocator })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <StoreLocator {...DEFAULT_PROPS} />);
