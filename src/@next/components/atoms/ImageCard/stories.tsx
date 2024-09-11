import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { ImageCard } from ".";
import { IImageCardProps } from "./ImageCard";

const DEFAULT_PROPS: IImageCardProps = {
  src: "Src",
  title: "Title",
  description: "Description",
};

storiesOf("@components/atoms/ImageCard", module)
  .addParameters({ component: ImageCard })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ImageCard {...DEFAULT_PROPS} />);
