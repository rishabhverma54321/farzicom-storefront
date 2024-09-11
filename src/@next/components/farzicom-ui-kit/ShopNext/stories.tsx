import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { ShopNext } from ".";
import { IShopNextProps } from "./ShopNext";

const DEFAULT_PROPS: IShopNextProps = {};

storiesOf("@components/farzicom-ui-kit/ShopNext", module)
.addParameters({ component: ShopNext })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<ShopNext {...DEFAULT_PROPS} />);