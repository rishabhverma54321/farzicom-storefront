import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { MoneyNext } from ".";
import { IMoneyNextProps } from "./MoneyNext";

const DEFAULT_PROPS: IMoneyNextProps = {};

storiesOf("@components/farzicom-ui-kit/MoneyNext", module)
.addParameters({ component: MoneyNext })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<MoneyNext {...DEFAULT_PROPS} />);