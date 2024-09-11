import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { CollectionHeadingIkkai } from ".";
import { ICollectionHeadingIkkaiProps } from "./CollectionHeadingIkkai";

const DEFAULT_PROPS: ICollectionHeadingIkkaiProps = {
  Heading: "Default Heading",
};

storiesOf("@components/atoms/CollectionHeadingIkkai", module)
  .addParameters({ component: CollectionHeadingIkkai })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CollectionHeadingIkkai {...DEFAULT_PROPS} />);
