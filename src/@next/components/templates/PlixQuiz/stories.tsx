import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { PlixQuiz } from ".";
import { IPlixQuizProps } from "./PlixQuiz";

const DEFAULT_PROPS: IPlixQuizProps = {};

storiesOf("@components/templates/PlixQuiz", module)
.addParameters({ component: PlixQuiz })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<PlixQuiz {...DEFAULT_PROPS} />);