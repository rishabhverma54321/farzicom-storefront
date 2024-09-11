import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { PlixHairQuiz } from ".";
import { IPlixHairQuizProps } from "./PlixHairQuiz";

const DEFAULT_PROPS: IPlixHairQuizProps = {};

storiesOf("@components/templates/PlixHairQuiz", module)
.addParameters({ component: PlixHairQuiz })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<PlixHairQuiz {...DEFAULT_PROPS} />);