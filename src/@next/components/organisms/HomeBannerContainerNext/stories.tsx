import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { HomeBannerContainerNext } from ".";
import { IHomeBannerContainerNextProps } from "./HomeBannerContainerNext";

const DEFAULT_PROPS: IHomeBannerContainerNextProps = {
  containerClass: "",
  data: [{ image: "" }],
};

storiesOf("@components/organisms/HomeBannerContainerNext", module)
  .addParameters({ component: HomeBannerContainerNext })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <HomeBannerContainerNext {...DEFAULT_PROPS} />);
