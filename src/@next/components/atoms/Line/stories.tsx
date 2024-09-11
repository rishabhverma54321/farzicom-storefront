import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { Line } from ".";
import { ILineProps } from "./Line";

const DEFAULT_PROPS: ILineProps = {
  width: "100px",
};

storiesOf("@components/atoms/Line", module)
  .addParameters({ component: Line })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <Line {...DEFAULT_PROPS} />);
