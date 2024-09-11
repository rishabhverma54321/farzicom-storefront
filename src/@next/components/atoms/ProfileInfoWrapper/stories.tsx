import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ProfileInfoWrapper } from ".";
import { IProfileInfoWrapperProps } from "./ProfileInfoWrapper";

const DEFAULT_PROPS: IProfileInfoWrapperProps = {
  profileInfoComponents: [],
};

storiesOf("@components/atoms/ProfileInfoWrapper", module)
  .addParameters({ component: ProfileInfoWrapper })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ProfileInfoWrapper {...DEFAULT_PROPS} />);
