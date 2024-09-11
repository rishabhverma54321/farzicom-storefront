import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { SubBanners } from ".";
import { ISubBannersProps } from "./SubBanners";

const DEFAULT_PROPS: ISubBannersProps = {};

storiesOf("@components/organisms/SubBanners", module)
  .addParameters({ component: SubBanners })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <SubBanners {...DEFAULT_PROPS} />);
