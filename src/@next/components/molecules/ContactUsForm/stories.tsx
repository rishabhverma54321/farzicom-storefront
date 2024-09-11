import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ContactUsForm } from ".";
import { IContactUsFormProps } from "./ContactUsForm";

const DEFAULT_PROPS: IContactUsFormProps = {};

storiesOf("@components/molecules/ContactUsForm", module)
  .addParameters({ component: ContactUsForm })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ContactUsForm {...DEFAULT_PROPS} />);
