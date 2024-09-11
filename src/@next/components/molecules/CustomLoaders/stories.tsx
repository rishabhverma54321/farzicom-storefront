import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { CustomLoaders } from ".";
import { ICustomLoadersProps } from "./CustomLoaders";

const DEFAULT_PROPS: ICustomLoadersProps = {};

storiesOf("@components/molecules/CustomLoaders", module)
  .addParameters({ component: CustomLoaders })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CustomLoaders {...DEFAULT_PROPS} />);
