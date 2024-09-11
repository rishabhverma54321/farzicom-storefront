import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { FaqContainer } from ".";
import { IFaqContainerProps } from "./FaqContainer";

const DEFAULT_PROPS: IFaqContainerProps = {};

storiesOf("@components/molecules/FaqContainer", module)
  .addParameters({ component: FaqContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <FaqContainer {...DEFAULT_PROPS} />);
