import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { SavingsStrip } from ".";
import { ISavingsStripProps } from "./SavingsStrip";

const DEFAULT_PROPS: ISavingsStripProps = {
  totalDiscount: 100,
};

storiesOf("@components/atoms/SavingsStrip", module)
  .addParameters({ component: SavingsStrip })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <SavingsStrip {...DEFAULT_PROPS} />);
