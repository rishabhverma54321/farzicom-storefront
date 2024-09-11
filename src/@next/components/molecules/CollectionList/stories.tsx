import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { CollectionList } from ".";
import { ICollectionListProps } from "./CollectionList";

const DEFAULT_PROPS: ICollectionListProps = {};

storiesOf("@components/molecules/CollectionList", module)
.addParameters({ component: CollectionList })
.addDecorator(story => (
<IntlProvider locale="en">story()</IntlProvider>
))
.add("default", () =>
<CollectionList {...DEFAULT_PROPS} />);