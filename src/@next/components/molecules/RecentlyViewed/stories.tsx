import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { RecentlyViewed } from ".";
import { IRecentlyViewedProps } from "./RecentlyViewed";

const DEFAULT_PROPS: IRecentlyViewedProps = {};

storiesOf("@components/molecules/RecentlyViewed", module)
  .addParameters({ component: RecentlyViewed })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <RecentlyViewed {...DEFAULT_PROPS} />);
