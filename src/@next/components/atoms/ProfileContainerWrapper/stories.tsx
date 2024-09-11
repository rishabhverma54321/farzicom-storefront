import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ProfileContainerWrapper } from ".";
import { IProfileContainerWrapperProps } from "./ProfileContainerWrapper";

const DEFAULT_PROPS: IProfileContainerWrapperProps = {};

storiesOf("@components/atoms/ProfileContainerWrapper", module)
  .addParameters({ component: ProfileContainerWrapper })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ProfileContainerWrapper {...DEFAULT_PROPS} />);
