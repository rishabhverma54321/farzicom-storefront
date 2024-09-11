import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { TextIconWrapper } from ".";
import { ITextIconWrapperProps } from "./TextIconWrapper";

const DEFAULT_PROPS: ITextIconWrapperProps = {};

storiesOf("@components/atoms/TextIconWrapper", module)
  .addParameters({ component: TextIconWrapper })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <TextIconWrapper {...DEFAULT_PROPS} />);
