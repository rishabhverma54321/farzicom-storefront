import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { Banners } from ".";
import { IBannersProps } from "./Banners";

const DEFAULT_PROPS: IBannersProps = {
  banners: [],
};

storiesOf("@components/molecules/Banners", module)
  .addParameters({ component: Banners })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <Banners {...DEFAULT_PROPS} />);
