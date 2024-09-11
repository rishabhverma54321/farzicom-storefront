import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { CustomVisibilitySensor } from ".";
import { ICustomVisibilitySensorProps } from "./CustomVisibilitySensor";

const DEFAULT_PROPS: ICustomVisibilitySensorProps = {};

storiesOf("@components/farzicom-ui-kit/CustomVisibilitySensor", module)
.addParameters({ component: CustomVisibilitySensor })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<CustomVisibilitySensor {...DEFAULT_PROPS} />);