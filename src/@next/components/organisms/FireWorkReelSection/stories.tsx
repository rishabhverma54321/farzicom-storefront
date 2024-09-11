import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { FireWorkReelSection } from ".";
import { IFireWorkReelSectionProps } from "./FireWorkReelSection";

const DEFAULT_PROPS: IFireWorkReelSectionProps = {};

storiesOf("@components/organisms/FireWorkReelSection", module)
.addParameters({ component: FireWorkReelSection })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<FireWorkReelSection {...DEFAULT_PROPS} />);