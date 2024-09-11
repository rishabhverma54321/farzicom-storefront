import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ProfileUserInfo } from ".";
import { IProfileUserInfoProps } from "./ProfileUserInfo";

const DEFAULT_PROPS: IProfileUserInfoProps = {
  userProfileInfo: [],
};

storiesOf("@components/atoms/ProfileUserInfo", module)
  .addParameters({ component: ProfileUserInfo })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ProfileUserInfo {...DEFAULT_PROPS} />);
