import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { PersonalProfileEdit } from ".";
import { IPersonalProfileEditProps } from "./PersonalProfileEdit";

const DEFAULT_PROPS: IPersonalProfileEditProps = {};

storiesOf("@components/atoms/PersonalProfileEdit", module)
  .addParameters({ component: PersonalProfileEdit })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <PersonalProfileEdit {...DEFAULT_PROPS} />);
