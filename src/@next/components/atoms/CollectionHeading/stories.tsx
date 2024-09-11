import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CollectionHeading } from ".";
import { ICollectionHeadingProps } from "./CollectionHeading";

const DEFAULT_PROPS: ICollectionHeadingProps = { Heading: "Heading" };

storiesOf("@components/atoms/CollectionHeading", module)
  .addParameters({ component: CollectionHeading })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CollectionHeading {...DEFAULT_PROPS} />);
