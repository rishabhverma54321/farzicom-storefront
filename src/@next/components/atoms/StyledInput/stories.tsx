import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { StyledInput } from ".";

storiesOf("@components/atoms/StyledInput", module)
  .addParameters({ component: StyledInput })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <StyledInput />);
