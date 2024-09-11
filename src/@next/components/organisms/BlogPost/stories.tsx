import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { BlogPost } from ".";
import { IBlogPostProps } from "./BlogPost";

const DEFAULT_PROPS: IBlogPostProps = {};

storiesOf("@components/organisms/BlogPost", module)
  .addParameters({ component: BlogPost })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <BlogPost {...DEFAULT_PROPS} />);
