import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { CompanyProfileContainer } from ".";
import { ICompanyProfileContainerProps } from "./CompanyProfileContainer";

const DEFAULT_PROPS: ICompanyProfileContainerProps = {};

storiesOf("@components/atoms/CompanyProfileContainer", module)
  .addParameters({ component: CompanyProfileContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CompanyProfileContainer {...DEFAULT_PROPS} />);
