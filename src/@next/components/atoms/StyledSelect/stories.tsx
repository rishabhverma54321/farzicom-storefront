import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { StyledSelect } from ".";
import { IStyledSelectProps } from "./StyledSelect";

const DEFAULT_PROPS: IStyledSelectProps = {
  name: "default",
  options: [{ key: "Select an option", value: "" }],
};

storiesOf("@components/atoms/StyledSelect", module)
  .addParameters({ component: StyledSelect })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <StyledSelect {...DEFAULT_PROPS} />);
