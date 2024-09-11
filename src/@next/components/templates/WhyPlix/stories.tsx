import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { WhyPlix } from ".";
import { IWhyPlixProps } from "./WhyPlix";

const DEFAULT_PROPS: IWhyPlixProps = {};

storiesOf("@components/templates/WhyPlix", module)
.addParameters({ component: WhyPlix })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<WhyPlix {...DEFAULT_PROPS} />);