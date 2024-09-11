import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { AccountSectionNext } from ".";
import { IAccountSectionNextProps } from "./AccountSectionNext";

const DEFAULT_PROPS: IAccountSectionNextProps = {};

storiesOf("@components/farzicom-ui-kit/AccountSectionNext", module)
.addParameters({ component: AccountSectionNext })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<AccountSectionNext {...DEFAULT_PROPS} />);