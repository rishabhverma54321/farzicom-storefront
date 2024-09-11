import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { Cashbacks } from ".";
import { ICashbacksProps } from "./Cashbacks";

const DEFAULT_PROPS: ICashbacksProps = {};

storiesOf("@components/organisms/Cashbacks", module)
  .addParameters({ component: Cashbacks })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <Cashbacks {...DEFAULT_PROPS} />);
