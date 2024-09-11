import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { CleanLabelCertified } from ".";
import { ICleanLabelCertifiedProps } from "./CleanLabelCertified";

const DEFAULT_PROPS: ICleanLabelCertifiedProps = {};

storiesOf("@components/templates/CleanLabelCertified", module)
.addParameters({ component: CleanLabelCertified })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<CleanLabelCertified {...DEFAULT_PROPS} />);