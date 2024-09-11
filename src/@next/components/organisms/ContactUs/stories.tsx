import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ContactUs } from ".";
import { IContactUsProps } from "./ContactUs";

const DEFAULT_PROPS: IContactUsProps = {};

storiesOf("@components/organisms/ContactUs", module)
  .addParameters({ component: ContactUs })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ContactUs {...DEFAULT_PROPS} />);
