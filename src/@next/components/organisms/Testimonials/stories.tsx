import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { Testimonials } from ".";
import { ITestimonialsProps } from "./Testimonials";

const DEFAULT_PROPS: ITestimonialsProps = {};

storiesOf("@components/organisms/Testimonials", module)
  .addParameters({ component: Testimonials })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <Testimonials {...DEFAULT_PROPS} />);
