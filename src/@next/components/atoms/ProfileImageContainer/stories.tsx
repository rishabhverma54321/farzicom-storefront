import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ProfileImageContainer } from ".";
import { IProfileImageContainerProps } from "./ProfileImageContainer";

const DEFAULT_PROPS: IProfileImageContainerProps = {
  profileImg: [],
};

storiesOf("@components/atoms/ProfileImageContainer", module)
  .addParameters({ component: ProfileImageContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ProfileImageContainer {...DEFAULT_PROPS} />);
