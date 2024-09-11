import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { MobileLoginForm } from ".";
import { IMobileLoginFormProps } from "./MobileLoginForm";

const DEFAULT_PROPS: IMobileLoginFormProps = {};

storiesOf("@components/molecules/MobileLoginForm", module)
  .addParameters({ component: MobileLoginForm })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <MobileLoginForm {...DEFAULT_PROPS} />);
