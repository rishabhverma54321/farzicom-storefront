import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { TitleAndPara } from ".";
import { ITitleAndParaProps } from "./TitleAndPara";
import csr from "../../../../static data/csr.json";

const DEFAULT_PROPS: ITitleAndParaProps = {
  item: csr[0],
};

storiesOf("@components/atoms/TitleAndPara", module)
  .addParameters({ component: TitleAndPara })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <TitleAndPara {...DEFAULT_PROPS} />);
