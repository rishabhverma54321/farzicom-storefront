import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { CashbackStripNew } from ".";
import { ICashbackStripNewProps } from "./CashbackStripNew";

//@ts-ignore
const DEFAULT_PROPS: ICashbackStripNewProps = {};

storiesOf("@components/atoms/CashbackStrip", module)
  .addParameters({ component: CashbackStripNew })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CashbackStripNew {...DEFAULT_PROPS} />);
