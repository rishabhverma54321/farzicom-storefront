import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { Select } from ".";
import { ISelectProps } from "./Select";

const DEFAULT_PROPS: ISelectProps = {};

storiesOf("@components/farzicom-ui-kit/Select", module)
.addParameters({ component: Select })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<Select {...DEFAULT_PROPS} />);