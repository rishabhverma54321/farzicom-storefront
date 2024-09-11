import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { EditProfileContainer } from ".";
import { IEditProfileContainerProps } from "./EditProfileContainer";

const DEFAULT_PROPS: IEditProfileContainerProps = {};

storiesOf("@components/atoms/EditProfileContainer", module)
  .addParameters({ component: EditProfileContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <EditProfileContainer {...DEFAULT_PROPS} />);
