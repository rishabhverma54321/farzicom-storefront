import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { Bxgy } from ".";
import { IBxgyProps } from "./Bxgy";

const DEFAULT_PROPS: IBxgyProps = {};

storiesOf("@components/templates/Bxgy", module)
.addParameters({ component: Bxgy })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<Bxgy {...DEFAULT_PROPS} />);