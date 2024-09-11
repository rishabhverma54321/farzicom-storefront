import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { ProductCard } from ".";
import { IProductCardProps } from "./ProductCard";

const DEFAULT_PROPS: IProductCardProps = {};

storiesOf("@components/farzicom-ui-kit/ProductCard", module)
.addParameters({ component: ProductCard })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<ProductCard {...DEFAULT_PROPS} />);