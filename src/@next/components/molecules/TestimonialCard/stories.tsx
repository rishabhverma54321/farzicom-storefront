import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { TestimonialCard } from ".";
import { ITestimonialCardProps } from "./TestimonialCard";

const DEFAULT_PROPS: ITestimonialCardProps = {
  author: "John Walker",
  rating: 4.5,
  text: "One of the best brands!",
  profile: "https://via.placeholder.com",
  highlight: "Love",
};

storiesOf("@components/molecules/TestimonialCard", module)
  .addParameters({ component: TestimonialCard })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <TestimonialCard {...DEFAULT_PROPS} />);
