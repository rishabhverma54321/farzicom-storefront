import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { ContinueShoppingNext } from ".";
import { IContinueShoppingNextProps } from "./ContinueShoppingNext";

const DEFAULT_PROPS: IContinueShoppingNextProps = {};

storiesOf("@components/farzicom-ui-kit/ContinueShoppingNext", module)
.addParameters({ component: ContinueShoppingNext })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<ContinueShoppingNext {...DEFAULT_PROPS} />);