import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ProfileSliderInfoWrapper } from ".";
import { IProfileSliderInfoWrapperProps } from "./ProfileSliderInfoWrapper";

const DEFAULT_PROPS: IProfileSliderInfoWrapperProps = {};

storiesOf("@components/atoms/ProfileSliderInfoWrapper", module)
  .addParameters({ component: ProfileSliderInfoWrapper })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ProfileSliderInfoWrapper {...DEFAULT_PROPS} />);
