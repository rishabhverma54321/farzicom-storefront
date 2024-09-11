import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { StoreLocatorForm } from ".";
import { IStoreLocatorFormProps } from "./StoreLocatorForm";

const DEFAULT_PROPS: IStoreLocatorFormProps = {};

storiesOf("@components/molecules/StoreLocatorForm", module)
  .addParameters({ component: StoreLocatorForm })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <StoreLocatorForm {...DEFAULT_PROPS} />);
