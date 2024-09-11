import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { PrivacyPolicy } from ".";
import { IPrivacyPolicyProps } from "./PrivacyPolicy";

const DEFAULT_PROPS: IPrivacyPolicyProps = {};

storiesOf("@components/molecules/PrivacyPolicy", module)
.addParameters({ component: PrivacyPolicy })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<PrivacyPolicy {...DEFAULT_PROPS} />);