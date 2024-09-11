import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { WishlistCard } from ".";
import { IWishlistCardProps } from "./WishlistCard";

const DEFAULT_PROPS: IWishlistCardProps = {};

storiesOf("@components/molecules/WishlistCard", module)
  .addParameters({ component: WishlistCard })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <WishlistCard {...DEFAULT_PROPS} />);
