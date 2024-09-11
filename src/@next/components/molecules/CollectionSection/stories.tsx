import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { CollectionSection } from ".";
import { ICollectionSectionProps } from "./CollectionSection";

const DEFAULT_PROPS: ICollectionSectionProps = {
  name: "New Arrival",
  products: [],
};

storiesOf("@components/molecules/CollectionSection", module)
  .addParameters({ component: CollectionSection })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CollectionSection {...DEFAULT_PROPS} />);
