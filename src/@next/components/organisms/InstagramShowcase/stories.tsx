import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { InstagramShowcase } from ".";
import { IInstagramShowcaseProps } from "./InstagramShowcase";

const DEFAULT_PROPS: IInstagramShowcaseProps = {};

storiesOf("@components/organisms/InstagramShowcase", module)
  .addParameters({ component: InstagramShowcase })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <InstagramShowcase {...DEFAULT_PROPS} />);
