import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ProfileWholeContainer } from ".";
import { IProfileWholeContainerProps } from "./ProfileWholeContainer";

const DEFAULT_PROPS: IProfileWholeContainerProps = {};

storiesOf("@components/atoms/ProfileWholeContainer", module)
  .addParameters({ component: ProfileWholeContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ProfileWholeContainer {...DEFAULT_PROPS} />);
