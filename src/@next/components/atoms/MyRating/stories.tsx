import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { MyRating } from ".";
import { IMyRatingProps } from "./MyRating";

const DEFAULT_PROPS: IMyRatingProps = {
  rating: 4,
  isReadOnly: false,
};

storiesOf("@components/atoms/MyRating", module)
  .addParameters({ component: MyRating })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <MyRating {...DEFAULT_PROPS} />);
