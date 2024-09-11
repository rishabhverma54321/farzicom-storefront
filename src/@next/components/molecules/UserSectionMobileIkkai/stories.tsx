import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";
import { useAuth, useAuthState } from "@saleor/sdk";

// import { MemoryRouter } from "react-router";
import { UserSectionMobileIkkai } from ".";
import { IUserSectionMobileIkkaiProps } from "./UserSectionMobileIkkai";
const { user } = useAuthState();
const handleSignOut = () => {};
const DEFAULT_PROPS: IUserSectionMobileIkkaiProps = {
  user: user!,
  handleSignOut,
  hideOverlay: () => {},
};

storiesOf("@components/molecules/UserSectionMobileIkkai", module)
  .addParameters({ component: UserSectionMobileIkkai })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <UserSectionMobileIkkai {...DEFAULT_PROPS} />);
