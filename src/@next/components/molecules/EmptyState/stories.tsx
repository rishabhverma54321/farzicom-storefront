import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { EmptyState } from ".";
import { IEmptyStateProps } from "./EmptyState";

const DEFAULT_PROPS: IEmptyStateProps = {
  text: "Your Wishlist is empty",
};

storiesOf("@components/molecules/EmptyState", module)
  .addParameters({ component: EmptyState })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <EmptyState {...DEFAULT_PROPS} />);
