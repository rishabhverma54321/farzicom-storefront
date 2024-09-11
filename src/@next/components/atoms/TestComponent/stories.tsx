import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { TestComponent } from ".";
import { ITestComponentProps } from "./TestComponent";

const DEFAULT_PROPS: ITestComponentProps = {
  bgColor: "#F4F8F9",
  svgSrc: "https://image.flaticon.com/icons/png/512/747/747545.png",
  innerTitle: "Personal Information",
  rightContainerContent: [
    "https://image.flaticon.com/icons/png/512/43/43478.png",
    "https://img-premium.flaticon.com/png/512/1445/premium/1445402.png?token=exp=1631539376~hmac=8b66955a11e4789d56bc267c582ce8c1",
  ],
  titleColor: "black",
  fontSizeTitle: 1,
  fontSizeSvg: 1,
};

storiesOf("@components/atoms/TestComponent", module)
  .addParameters({ component: TestComponent })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <TestComponent {...DEFAULT_PROPS} />);
