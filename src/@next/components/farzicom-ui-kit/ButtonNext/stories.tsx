import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { ButtonNext } from ".";
import { IButtonNextProps } from "./ButtonNext";

const DEFAULT_PROPS: IButtonNextProps = {};

storiesOf("@components/farzicom-ui-kit/ButtonNext", module)
.addParameters({ component: ButtonNext })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<ButtonNext {...DEFAULT_PROPS} />);