import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { AnnouncementBar } from ".";
import { IAnnouncementBarProps } from "./AnnouncementBar";

const DEFAULT_PROPS: IAnnouncementBarProps = {};

storiesOf("@components/templates/AnnouncementBar", module)
.addParameters({ component: AnnouncementBar })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<AnnouncementBar {...DEFAULT_PROPS} />);