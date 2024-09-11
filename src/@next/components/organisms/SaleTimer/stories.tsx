import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { SaleTimer } from ".";
import { ISaleTimerProps } from "./SaleTimer";

const DEFAULT_PROPS: ISaleTimerProps = {};

storiesOf("@components/organisms/SaleTimer", module)
.addParameters({ component: SaleTimer })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<SaleTimer {...DEFAULT_PROPS} />);