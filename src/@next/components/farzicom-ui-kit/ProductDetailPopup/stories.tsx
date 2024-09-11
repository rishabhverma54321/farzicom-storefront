import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { ProductDetailPopup } from ".";
import { IProductDetailPopupProps } from "./ProductDetailPopup";

const DEFAULT_PROPS: IProductDetailPopupProps = {};

storiesOf("@components/farzicom-ui-kit/ProductDetailPopup", module)
.addParameters({ component: ProductDetailPopup })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<ProductDetailPopup {...DEFAULT_PROPS} />);