import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ReviewContainer } from ".";
import { IReviewContainerProps } from "./ReviewContainer";

const DEFAULT_PROPS: IReviewContainerProps = {
  productId: "UHJvZHVjdDo0NQ==",
  productName: "Blissful Perfecting Mask",
};

storiesOf("@components/organisms/ReviewContainer", module)
  .addParameters({ component: ReviewContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ReviewContainer {...DEFAULT_PROPS} />);
