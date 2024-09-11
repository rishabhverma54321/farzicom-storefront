import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { SalesPage } from ".";
import { ISalesPageProps } from "./SalesPage";

const DEFAULT_PROPS: ISalesPageProps = {};

storiesOf("@components/templates/SalesPage", module)
.addParameters({ component: SalesPage })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<SalesPage {...DEFAULT_PROPS} />);