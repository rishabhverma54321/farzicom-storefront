import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { CustomizeButton } from ".";
import { ICustomizeButtonProps } from "./CustomizeButton";

const DEFAULT_PROPS: ICustomizeButtonProps = {
  buttonClass: "",
  link: "/",
  text: "Button",
};

storiesOf("@components/atoms/CustomizeButton", module)
  .addParameters({ component: CustomizeButton })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CustomizeButton {...DEFAULT_PROPS} />);
