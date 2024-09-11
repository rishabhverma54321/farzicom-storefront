import { useAuth, useAuthState } from "@saleor/sdk";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { UserSection } from ".";
import { IUserProps } from "./User";

const { user } = useAuthState();
const handleSignOut = () => {};
const DEFAULT_PROPS: IUserProps = {
  user: user!,
  handleSignOut,
};

storiesOf("@components/molecules/User", module)
  .addParameters({ component: UserSection })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <UserSection {...DEFAULT_PROPS} />);
