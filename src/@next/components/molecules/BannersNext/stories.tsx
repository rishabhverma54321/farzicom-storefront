import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";
import { BannersNext } from ".";
import { IBannersNextProps } from "./BannersNext";

const DEFAULT_PROPS: IBannersNextProps = {
  content: {
    topText: "BannersNext TitleA",
    middleText: "BannersNext TitleB",
    bottomText: "BannersNext TitleC",
  },
  priority: true,
};

storiesOf("@components/molecules/BannersNext", module)
  .addParameters({ component: BannersNext })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <BannersNext {...DEFAULT_PROPS} />);
