import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { PlixSkinQuiz } from ".";
import { IPlixSkinQuizProps } from "./PlixSkinQuiz";

const DEFAULT_PROPS: IPlixSkinQuizProps = {};

storiesOf("@components/templates/PlixSkinQuiz", module)
.addParameters({ component: PlixSkinQuiz })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<PlixSkinQuiz {...DEFAULT_PROPS} />);