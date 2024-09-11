import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { Faq } from ".";
import { IFaqProps } from "./Faq";

const DEFAULT_PROPS: IFaqProps = {
  question: "Question",
  answer: "Answer",
};

storiesOf("@components/atoms/Faq", module)
  .addParameters({ component: Faq })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <Faq {...DEFAULT_PROPS} />);
