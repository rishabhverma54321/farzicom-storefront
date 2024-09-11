import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { CircularProgressBar } from ".";
import { ICircularProgressBarProps } from "./CircularProgressBar";

const DEFAULT_PROPS: ICircularProgressBarProps = {
  total: 10,
  left: 5,
};

storiesOf("@components/atoms/CircularProgressBar", module)
  .addParameters({ component: CircularProgressBar })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CircularProgressBar {...DEFAULT_PROPS} />);
