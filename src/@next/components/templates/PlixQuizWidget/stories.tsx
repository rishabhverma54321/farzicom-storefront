import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { PlixQuizWidget } from ".";
import { IPlixQuizWidgetProps } from "./PlixQuizWidget";

const DEFAULT_PROPS: IPlixQuizWidgetProps = {};

storiesOf("@components/templates/PlixQuizWidget", module)
.addParameters({ component: PlixQuizWidget })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<PlixQuizWidget {...DEFAULT_PROPS} />);