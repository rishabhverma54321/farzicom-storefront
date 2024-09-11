import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { NextParser } from ".";
import { INextParserProps } from "./NextParser";

const DEFAULT_PROPS: INextParserProps = {};

storiesOf("@components/molecules/NextParser", module)
.addParameters({ component: NextParser })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<NextParser {...DEFAULT_PROPS} />);