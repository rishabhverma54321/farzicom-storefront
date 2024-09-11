import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { OurStory } from ".";
import { IOurStoryProps } from "./OurStory";

const DEFAULT_PROPS: IOurStoryProps = { text: "Our Story" };

storiesOf("@components/organisms/OurStory", module)
  .addParameters({ component: OurStory })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <OurStory {...DEFAULT_PROPS} />);
