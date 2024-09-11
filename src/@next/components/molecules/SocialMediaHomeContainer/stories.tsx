import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { SocialMediaHomeContainer } from ".";
import { ISocialMediaHomeContainerProps } from "./SocialMediaHomeContainer";

const DEFAULT_PROPS: ISocialMediaHomeContainerProps = {};

storiesOf("@components/molecules/SocialMediaHomeContainer", module)
  .addParameters({ component: SocialMediaHomeContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <SocialMediaHomeContainer {...DEFAULT_PROPS} />);
