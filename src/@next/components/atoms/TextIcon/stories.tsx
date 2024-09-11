import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { TextIcon } from ".";
import { ITextIconProps } from "./TextIcon";

const DEFAULT_PROPS: ITextIconProps = {
  text: "",
  ClassName: "",
  icon: "",
  textColor: "",
};

storiesOf("@components/atoms/TextIcon", module)
  .addParameters({ component: TextIcon })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <TextIcon {...DEFAULT_PROPS} />);
