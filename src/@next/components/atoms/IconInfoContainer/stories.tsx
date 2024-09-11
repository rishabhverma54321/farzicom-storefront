import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { IconInfoContainer } from ".";
import { IIconInfoContainerProps } from "./IconInfoContainer";

const DEFAULT_PROPS: IIconInfoContainerProps = {
  iconSVG: "",
  content: ""
};

storiesOf("@components/atoms/IconInfoContainer", module)
  .addParameters({ component: IconInfoContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <IconInfoContainer {...DEFAULT_PROPS} />);
