import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { Membership } from ".";
import { IMembershipProps } from "./Membership";

const DEFAULT_PROPS: IMembershipProps = {};

storiesOf("@components/templates/Membership", module)
.addParameters({ component: Membership })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<Membership {...DEFAULT_PROPS} />);