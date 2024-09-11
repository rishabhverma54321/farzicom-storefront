import { useAuth, useAuthState } from "@saleor/sdk";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { UserSectionMobile } from ".";
import { IUserSectionMobileProps } from "./UserSectionMobile";

const { user } = useAuthState();
const handleSignOut = () => {};
const DEFAULT_PROPS: IUserSectionMobileProps = {
  user: user!,
  handleSignOut,
};

storiesOf("@components/molecules/UserSectionMobile", module)
  .addParameters({ component: UserSectionMobile })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <UserSectionMobile {...DEFAULT_PROPS} />);
