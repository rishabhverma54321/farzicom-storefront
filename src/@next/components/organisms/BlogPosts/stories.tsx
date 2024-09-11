import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { BlogPosts } from ".";
import { IBlogPostsProps } from "./BlogPosts";

const DEFAULT_PROPS: IBlogPostsProps = {};

storiesOf("@components/organisms/BlogPosts", module)
  .addParameters({ component: BlogPosts })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <BlogPosts {...DEFAULT_PROPS} />);
