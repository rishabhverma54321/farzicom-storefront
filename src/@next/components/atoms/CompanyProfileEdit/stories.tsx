import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { CompanyProfileEdit } from ".";
import { ICompanyProfileEditProps } from "./CompanyProfileEdit";

const DEFAULT_PROPS: ICompanyProfileEditProps = {};

storiesOf("@components/atoms/CompanyProfileEdit", module)
  .addParameters({ component: CompanyProfileEdit })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CompanyProfileEdit {...DEFAULT_PROPS} />);
