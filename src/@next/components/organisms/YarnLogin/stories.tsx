import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { YarnLogin } from ".";
import { IYarnLoginProps } from "./YarnLogin";

const DEFAULT_PROPS: IYarnLoginProps = {};

storiesOf("@components/organisms/YarnLogin", module)
  .addParameters({ component: YarnLogin })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <YarnLogin {...DEFAULT_PROPS} />);
