import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { EditContainerWrapper } from ".";
import { IEditContainerWrapperProps } from "./EditContainerWrapper";

//@ts-ignore
const DEFAULT_PROPS: IEditContainerWrapperProps = {};

storiesOf("@components/atoms/EditContainerWrapper", module)
  .addParameters({ component: EditContainerWrapper })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <EditContainerWrapper {...DEFAULT_PROPS} />);
