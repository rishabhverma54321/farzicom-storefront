import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { TypeContainer } from ".";
import { ITypeContainerProps } from "./TypeContainer";

const DEFAULT_PROPS: ITypeContainerProps = {
  typeCategory: [""],
  categoryTitile: "",
};

storiesOf("@components/atoms/TypeContainer", module)
  .addParameters({ component: TypeContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <TypeContainer {...DEFAULT_PROPS} />);
