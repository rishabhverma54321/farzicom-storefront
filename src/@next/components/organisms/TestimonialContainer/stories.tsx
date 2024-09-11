import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { TestimonialContainer } from ".";
import { ITestimonialContainerProps } from "./TestimonialContainer";

const DEFAULT_PROPS: ITestimonialContainerProps = {};

storiesOf("@components/organisms/TestimonialContainer", module)
  .addParameters({ component: TestimonialContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <TestimonialContainer {...DEFAULT_PROPS} />);
