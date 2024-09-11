import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { MyCustomLink } from ".";
import { IMyCustomLinkProps } from "./MyCustomLink";

const DEFAULT_PROPS: IMyCustomLinkProps = {};

storiesOf("@components/next-react/MyCustomLink", module)
.addParameters({ component: MyCustomLink })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<MyCustomLink {...DEFAULT_PROPS} />);