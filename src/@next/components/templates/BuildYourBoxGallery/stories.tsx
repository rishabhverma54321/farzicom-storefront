import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { BuildYourBoxGallery } from ".";
import { IBuildYourBoxGalleryProps } from "./BuildYourBoxGallery";

const DEFAULT_PROPS: IBuildYourBoxGalleryProps = {};

storiesOf("@components/templates/BuildYourBoxGallery", module)
.addParameters({ component: BuildYourBoxGallery })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<BuildYourBoxGallery {...DEFAULT_PROPS} />);