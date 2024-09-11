import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { Review } from ".";
import { IReviewProps } from "./Review";

const DEFAULT_PROPS: IReviewProps = {
  productReview: {
    __typename: "ProductReviewType",
    review: "review",
    rating: 4,
    created: null,
    user: null,
    userName: "default",
  },
};

storiesOf("@components/molecules/Review", module)
  .addParameters({ component: Review })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <Review {...DEFAULT_PROPS} />);
