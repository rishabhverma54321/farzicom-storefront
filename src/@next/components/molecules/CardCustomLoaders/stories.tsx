import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CardCustomLoaders } from ".";
import { ICardCustomLoadersProps } from "./CardCustomLoaders";

const DEFAULT_PROPS: ICardCustomLoadersProps = {
  render: {
    image: false,
    title: false,
    description: false,
    button: false,
  },
};

storiesOf("@components/molecules/CardCustomLoaders", module)
  .addParameters({ component: CardCustomLoaders })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CardCustomLoaders {...DEFAULT_PROPS} />);
