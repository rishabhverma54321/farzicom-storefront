import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { InstagramPost } from ".";
import { IInstagramPostProps } from "./InstagramPost";

const DEFAULT_PROPS: IInstagramPostProps = {
  postId: "CQDOTHXhv7h",
};

storiesOf("@components/atoms/InstagramPost", module)
  .addParameters({ component: InstagramPost })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <InstagramPost {...DEFAULT_PROPS} />);
