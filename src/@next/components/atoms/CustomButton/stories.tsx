import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { CustomButton } from ".";
import { ICustomButtonProps } from "./CustomButton";

const DEFAULT_PROPS: ICustomButtonProps = { text: "" };

storiesOf("@components/atoms/CustomButton", module)
  .addParameters({ component: CustomButton })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CustomButton {...DEFAULT_PROPS} />);
