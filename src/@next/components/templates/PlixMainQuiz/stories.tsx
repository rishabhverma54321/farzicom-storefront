import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { PlixMainQuiz } from ".";
import { IPlixMainQuizProps } from "./PlixMainQuiz";

const DEFAULT_PROPS: IPlixMainQuizProps = {};

storiesOf("@components/templates/PlixMainQuiz", module)
.addParameters({ component: PlixMainQuiz })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<PlixMainQuiz {...DEFAULT_PROPS} />);