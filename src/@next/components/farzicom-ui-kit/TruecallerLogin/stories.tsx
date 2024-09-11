import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { TruecallerLogin } from ".";
import { ITruecallerLoginProps } from "./TruecallerLogin";

const DEFAULT_PROPS: ITruecallerLoginProps = {};

storiesOf("@components/farzicom-ui-kit/TruecallerLogin", module)
.addParameters({ component: TruecallerLogin })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<TruecallerLogin {...DEFAULT_PROPS} />);