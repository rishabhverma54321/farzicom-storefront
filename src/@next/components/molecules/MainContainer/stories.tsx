import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { MainContainer } from ".";
import { IMainContainerProps } from "./MainContainer";

const DEFAULT_PROPS: IMainContainerProps = {
  text: "Heading",
  children: <div />,
  colorName: "#FDF0EE",
  padding: "",
};

storiesOf("@components/molecules/MainContainer", module)
  .addParameters({ component: MainContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <MainContainer {...DEFAULT_PROPS} />);
