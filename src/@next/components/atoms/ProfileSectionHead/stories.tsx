import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ProfileSectionHead } from ".";
import { IProfileSectionHeadProps } from "./ProfileSectionHead";

const DEFAULT_PROPS: IProfileSectionHeadProps = {
  bgColor: "#F4F8F9",
  infoArray: [],
  ProfileImg: [],
  userProfileInfo: [],
};

storiesOf("@components/atoms/ProfileSectionHead", module)
  .addParameters({ component: ProfileSectionHead })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ProfileSectionHead {...DEFAULT_PROPS} />);
