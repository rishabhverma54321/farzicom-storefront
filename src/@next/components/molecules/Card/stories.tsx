import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { Card } from ".";
import { ICardProps } from "./Card";

const DEFAULT_PROPS: ICardProps = {
  cardClass: "",
  content: {
    title: "Card Title",
  },
};

storiesOf("@components/molecules/Card", module)
  .addParameters({ component: Card })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <Card {...DEFAULT_PROPS} />);
