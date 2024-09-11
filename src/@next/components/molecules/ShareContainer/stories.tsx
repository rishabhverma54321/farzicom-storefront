import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ShareContainer } from ".";
import { IShareContainerProps } from "./ShareContainer";

const DEFAULT_PROPS: IShareContainerProps = {};

storiesOf("@components/molecules/ShareContainer", module)
  .addParameters({ component: ShareContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ShareContainer {...DEFAULT_PROPS} />);
