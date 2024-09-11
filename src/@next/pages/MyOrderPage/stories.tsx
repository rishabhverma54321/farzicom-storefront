import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";
import * as H from "history";
import { MyOrderPage } from ".";
import { IMyOrderProps } from "./MyOrderPage";

const history = H.createBrowserHistory();

const DEFAULT_PROPS: IMyOrderProps = {
  history,
};

storiesOf("@components/organisms/MyOrder", module)
  .addParameters({ component: MyOrderPage })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <MyOrderPage {...DEFAULT_PROPS} />);
