import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { AddToCartButtonNext } from ".";
import { IAddToCartButtonNextProps } from "./AddToCartButtonNext";

const DEFAULT_PROPS: IAddToCartButtonNextProps = {};

storiesOf("@components/farzicom-ui-kit/AddToCartButtonNext", module)
.addParameters({ component: AddToCartButtonNext })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<AddToCartButtonNext {...DEFAULT_PROPS} />);