import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { QuizComponents } from ".";
import { IQuizComponentsProps } from "./QuizComponents";

const DEFAULT_PROPS: IQuizComponentsProps = {};

storiesOf("@components/molecules/QuizComponents", module)
.addParameters({ component: QuizComponents })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<QuizComponents {...DEFAULT_PROPS} />);