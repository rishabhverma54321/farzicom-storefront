import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { YarnCheckbox } from ".";
import { IYarnCheckboxProps } from "./YarnCheckbox";

const DEFAULT_PROPS: IYarnCheckboxProps = {};

storiesOf("@components/atoms/YarnCheckbox", module)
  .addParameters({ component: YarnCheckbox })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <YarnCheckbox {...DEFAULT_PROPS} />);
