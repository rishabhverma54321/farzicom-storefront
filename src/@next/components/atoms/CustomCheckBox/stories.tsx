import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CustomCheckBox } from ".";
import { ICustomCheckBoxProps } from "./CustomCheckBox";

const DEFAULT_PROPS: ICustomCheckBoxProps = {
  checkboxLabel: "",
  checkboxName: "",
};

storiesOf("@components/atoms/CustomCheckBox", module)
  .addParameters({ component: CustomCheckBox })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CustomCheckBox {...DEFAULT_PROPS} />);
