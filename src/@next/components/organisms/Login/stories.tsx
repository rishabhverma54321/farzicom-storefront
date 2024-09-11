import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { Login } from ".";
import { ILoginProps } from "./Login";

const DEFAULT_PROPS: ILoginProps = {};

storiesOf("@components/organisms/Login", module)
  .addParameters({ component: Login })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <Login {...DEFAULT_PROPS} />);
