import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { YarnAddress } from ".";
import { IYarnAddressProps } from "./YarnAddress";

const DEFAULT_PROPS: IYarnAddressProps = {
  addressL1: "",
  addressL2: "",
  addressL3: "",
  bgColor: "",
  companyName: "",
  id: "",
  name: "",
  pincode: "",
};

storiesOf("@components/atoms/YarnAddress", module)
  .addParameters({ component: YarnAddress })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <YarnAddress {...DEFAULT_PROPS} />);
