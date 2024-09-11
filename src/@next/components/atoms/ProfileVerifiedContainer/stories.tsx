import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ProfileVerifiedContainer } from ".";
import { IProfileVerifiedContainerProps } from "./ProfileVerifiedContainer";

const DEFAULT_PROPS: IProfileVerifiedContainerProps = {};

storiesOf("@components/atoms/ProfileVerifiedContainer", module)
  .addParameters({ component: ProfileVerifiedContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ProfileVerifiedContainer {...DEFAULT_PROPS} />);
