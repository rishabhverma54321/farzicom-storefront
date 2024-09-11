import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { PlantATree } from ".";
import { IPlantATreeProps } from "./PlantATree";

const DEFAULT_PROPS: IPlantATreeProps = {};

storiesOf("@components/templates/PlantATree", module)
.addParameters({ component: PlantATree })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<PlantATree {...DEFAULT_PROPS} />);