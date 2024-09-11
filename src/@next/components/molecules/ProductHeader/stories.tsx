import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ProductHeader } from ".";
import { IProductHeaderProps } from "./ProductHeader";

const DEFAULT_PROPS: IProductHeaderProps = {
  headerClass: "",
  heading: "Header",
};

storiesOf("@components/molecules/ProductHeader", module)
  .addParameters({ component: ProductHeader })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ProductHeader {...DEFAULT_PROPS} />);
