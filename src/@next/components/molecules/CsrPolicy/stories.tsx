import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { CsrPolicy } from ".";
import { ICsrPolicyProps } from "./CsrPolicy";

const DEFAULT_PROPS: ICsrPolicyProps = {};

storiesOf("@components/molecules/CsrPolicy", module)
  .addParameters({ component: CsrPolicy })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CsrPolicy {...DEFAULT_PROPS} />);
