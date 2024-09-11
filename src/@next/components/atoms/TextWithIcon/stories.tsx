import { storiesOf } from "@storybook/react";
import { CONTACT_INFO } from "Themes/config";
import React from "react";
import { IntlProvider } from "react-intl";

import { TextWithIcon } from ".";
import { ITextWithIconProps } from "./TextWithIcon";

const DEFAULT_PROPS: ITextWithIconProps = {
  item: CONTACT_INFO[0],
  isLink: false,
};

storiesOf("@components/atoms/TextWithIcon", module)
  .addParameters({ component: TextWithIcon })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <TextWithIcon {...DEFAULT_PROPS} />);
