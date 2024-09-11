import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { CardsContainer } from ".";
import { ICardsContainerProps } from "./CardsContainer";

const DEFAULT_PROPS: ICardsContainerProps = {
  cardClass: "",
  containerClass: "",
  data: [{ image: "" }],
};

storiesOf("@components/organisms/CardsContainer", module)
  .addParameters({ component: CardsContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CardsContainer {...DEFAULT_PROPS} />);
