import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { PersonalProfileContainer } from ".";
import { IPersonalProfileContainerProps } from "./PersonalProfileContainer";

const DEFAULT_PROPS: IPersonalProfileContainerProps = {};

storiesOf("@components/atoms/PersonalProfileContainer", module)
  .addParameters({ component: PersonalProfileContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <PersonalProfileContainer {...DEFAULT_PROPS} />);
