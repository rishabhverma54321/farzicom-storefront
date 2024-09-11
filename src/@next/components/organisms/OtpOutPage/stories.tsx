import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { BugReport } from ".";
import { IContactUsProps } from "./OtpOutPage";

const DEFAULT_PROPS: IContactUsProps = {};

storiesOf("@components/organisms/BugReport", module)
  .addParameters({ component: BugReport })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <BugReport {...DEFAULT_PROPS} />);
