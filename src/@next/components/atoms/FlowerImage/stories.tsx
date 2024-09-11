import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { FlowerImage } from ".";
import { IFlowerImageProps } from "./FlowerImage";

const DEFAULT_PROPS: IFlowerImageProps = {
  isLeft: true,
};

storiesOf("@components/atoms/FlowerImage", module)
  .addParameters({ component: FlowerImage })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <FlowerImage {...DEFAULT_PROPS} />);
