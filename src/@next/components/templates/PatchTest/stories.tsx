import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { PatchTest } from ".";
import { IPatchTestProps } from "./PatchTest";

const DEFAULT_PROPS: IPatchTestProps = {};

storiesOf("@components/templates/PatchTest", module)
.addParameters({ component: PatchTest })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<PatchTest {...DEFAULT_PROPS} />);