import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { Input } from ".";
import { IInputProps } from "./Input";

const DEFAULT_PROPS: IInputProps = {};

storiesOf("@components/farzicom-ui-kit/Input", module)
.addParameters({ component: Input })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<Input {...DEFAULT_PROPS} />);