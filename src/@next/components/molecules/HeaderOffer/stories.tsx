import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { HeaderOffer } from ".";
import { IHeaderOfferProps } from "./HeaderOffer";

const DEFAULT_PROPS: IHeaderOfferProps = { message: "Header Offer Message" };

storiesOf("@components/molecules/HeaderOffer", module)
  .addParameters({ component: HeaderOffer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <HeaderOffer {...DEFAULT_PROPS} />);
