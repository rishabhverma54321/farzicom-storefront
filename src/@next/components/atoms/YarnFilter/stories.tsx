import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { YarnFilter } from ".";
import { IYarnFilterProps } from "./YarnFilter";

const DEFAULT_PROPS: IYarnFilterProps = {};

storiesOf("@components/atoms/YarnFilter", module)
  .addParameters({ component: YarnFilter })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <YarnFilter {...DEFAULT_PROPS} />);
