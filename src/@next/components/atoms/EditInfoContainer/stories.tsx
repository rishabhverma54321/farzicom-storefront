import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { EditInfoContainer } from ".";
import { IEditInfoContainerProps } from "./EditInfoContainer";

const DEFAULT_PROPS: IEditInfoContainerProps = {
  titleContent: "",
  link: "",
  popupTitle: "",
};

storiesOf("@components/atoms/EditInfoContainer", module)
  .addParameters({ component: EditInfoContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <EditInfoContainer {...DEFAULT_PROPS} />);
