import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ContactUsFormIkkai } from ".";
import { IContactUsFormIkkaiProps } from "./ContactUsFormIkkai";

const DEFAULT_PROPS: IContactUsFormIkkaiProps = {};

storiesOf("@components/molecules/ContactUsFormIkkai", module)
  .addParameters({ component: ContactUsFormIkkai })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ContactUsFormIkkai {...DEFAULT_PROPS} />);
