import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { SelectPaymentMode } from ".";
import { ISelectPaymentModeProps } from "./SelectPaymentMode";

const DEFAULT_PROPS: ISelectPaymentModeProps = {
  handleOnSelect: () => {},
  initialValue: "PayOnline",
  setRadioState: () => {},
};

storiesOf("@components/molecules/SelectPaymentMode", module)
  .addParameters({ component: SelectPaymentMode })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <SelectPaymentMode {...DEFAULT_PROPS} />);
