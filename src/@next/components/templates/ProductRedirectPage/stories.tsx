import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { ProductRedirectPage } from ".";
import { IProductRedirectPageProps } from "./ProductRedirectPage";

const DEFAULT_PROPS: IProductRedirectPageProps = {};

storiesOf("@components/templates/ProductRedirectPage", module)
.addParameters({ component: ProductRedirectPage })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<ProductRedirectPage {...DEFAULT_PROPS} />);