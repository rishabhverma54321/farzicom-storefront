import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { RichTextContentIkkai } from ".";
import { IProps } from "./types";

const DEFAULT_PROPS: IProps = {
  descriptionJson: "",
};

storiesOf("@components/atoms/RichTextContentIkkai", module)
  .addParameters({ component: RichTextContentIkkai })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <RichTextContentIkkai {...DEFAULT_PROPS} />);
