import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { RatingNext } from ".";
import { IRatingNextProps } from "./RatingNext";

const DEFAULT_PROPS: IRatingNextProps = {};

storiesOf("@components/farzicom-ui-kit/RatingNext", module)
.addParameters({ component: RatingNext })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<RatingNext {...DEFAULT_PROPS} />);