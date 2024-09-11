import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { PlixQuizWeightLoss } from ".";
import { IPlixQuizWeightLossProps } from "./PlixQuizWeightLoss";

const DEFAULT_PROPS: IPlixQuizWeightLossProps = {};

storiesOf("@components/templates/PlixQuizWeightLoss", module)
.addParameters({ component: PlixQuizWeightLoss })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<PlixQuizWeightLoss {...DEFAULT_PROPS} />);