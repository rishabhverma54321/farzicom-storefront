import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { AddWishlist } from ".";
import { IAddWishlistProps } from "./AddWishlist";

const DEFAULT_PROPS: IAddWishlistProps = {
  id: "",
};

storiesOf("@components/organisms/AddWishlist", module)
  .addParameters({ component: AddWishlist })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <AddWishlist {...DEFAULT_PROPS} />);
