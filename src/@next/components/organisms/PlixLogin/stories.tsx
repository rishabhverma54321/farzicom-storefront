import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { PlixLogin } from ".";
import { IPlixLoginProps } from "./PlixLogin";

const DEFAULT_PROPS: IPlixLoginProps = {};

storiesOf("@components/organisms/PlixLogin", module)
.addParameters({ component: PlixLogin })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<PlixLogin {...DEFAULT_PROPS} />);