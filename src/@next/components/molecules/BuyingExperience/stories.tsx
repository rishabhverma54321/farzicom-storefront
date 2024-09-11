import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { BuyingExperience } from ".";
import { IBuyingExperienceProps } from "./BuyingExperience";

const DEFAULT_PROPS: IBuyingExperienceProps = {
  rating: 4,
  clickHandler: rating => null,
};

storiesOf("@components/molecules/BuyingExperience", module)
  .addParameters({ component: BuyingExperience })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <BuyingExperience {...DEFAULT_PROPS} />);
