import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { ConsultationForm } from ".";
import { IConsultationFormProps } from "./ConsultationForm";

const DEFAULT_PROPS: IConsultationFormProps = {};

storiesOf("@components/templates/ConsultationForm", module)
.addParameters({ component: ConsultationForm })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<ConsultationForm {...DEFAULT_PROPS} />);