import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ClientCollectionHeading } from ".";
import { IClientCollectionHeadingProps } from "./ClientCollectionHeading";

const DEFAULT_PROPS: IClientCollectionHeadingProps = {
  client: "lotus",
  heading: "default heading",
};

storiesOf("@components/atoms/ClientCollectionHeading", module)
  .addParameters({ component: ClientCollectionHeading })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ClientCollectionHeading {...DEFAULT_PROPS} />);
