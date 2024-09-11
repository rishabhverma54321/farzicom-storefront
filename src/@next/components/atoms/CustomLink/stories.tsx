import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { CustomLink } from ".";
import { ICustomLinkProps } from "./CustomLink";

const DEFAULT_PROPS: ICustomLinkProps = {
  to: "/",
};

storiesOf("@components/atoms/CustomLink", module)
  .addParameters({ component: CustomLink })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <CustomLink {...DEFAULT_PROPS} />);
