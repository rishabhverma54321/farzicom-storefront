import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { TimeItem } from ".";
import { ITimeItemProps } from "./TimeItem";

const DEFAULT_PROPS: ITimeItemProps = {};

storiesOf("@components/atoms/TimeItem", module)
.addParameters({ component: TimeItem })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<TimeItem {...DEFAULT_PROPS} />);