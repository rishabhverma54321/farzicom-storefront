import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { PincodeCheck } from ".";
import { IPincodeCheckProps } from "./PincodeCheck";

const DEFAULT_PROPS: IPincodeCheckProps = {};

storiesOf("@components/atoms/PincodeCheck", module)
  .addParameters({ component: PincodeCheck })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <PincodeCheck {...DEFAULT_PROPS} />);
