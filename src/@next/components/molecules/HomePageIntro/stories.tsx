import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { HomePageIntro } from ".";
import { IHomePageIntroProps } from "./HomePageIntro";

const DEFAULT_PROPS: IHomePageIntroProps = {};

storiesOf("@components/molecules/HomePageIntro", module)
  .addParameters({ component: HomePageIntro })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <HomePageIntro {...DEFAULT_PROPS} />);
