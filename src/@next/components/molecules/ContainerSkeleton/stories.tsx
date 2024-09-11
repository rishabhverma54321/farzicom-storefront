import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { ContainerSkeleton } from ".";
import { IContainerSkeletonProps } from "./ContainerSkeleton";

const DEFAULT_PROPS: IContainerSkeletonProps = {
  cardCount: 1,
  render: {
    image: false,
    title: false,
    description: false,
    button: false,
  },
};

storiesOf("@components/molecules/ContainerSkeleton", module)
  .addParameters({ component: ContainerSkeleton })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <ContainerSkeleton {...DEFAULT_PROPS} />);
