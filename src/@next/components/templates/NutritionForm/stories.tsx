import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { NutritionForm } from ".";
import { INutritionFormProps } from "./NutritionForm";

const DEFAULT_PROPS: INutritionFormProps = {};

storiesOf("@components/templates/NutritionForm", module)
.addParameters({ component: NutritionForm })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<NutritionForm {...DEFAULT_PROPS} />);