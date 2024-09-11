import { storiesOf } from "@storybook/react";
import { pages } from "gqlTypes/customGlobalTypes";
import React from "react";
import { IntlProvider } from "react-intl";
// import { pages } from "@temp/themes/lotus/views/Article/Page";

// import { MemoryRouter } from "react-router";
import { PolicyPages } from ".";
import { IPolicyPagesProps } from "./PolicyPages";

const DEFAULT_PROPS: IPolicyPagesProps = {
  type: pages.CSR_Policy,
};

storiesOf("@components/molecules/PolicyPages", module)
  .addParameters({ component: PolicyPages })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <PolicyPages {...DEFAULT_PROPS} />);
