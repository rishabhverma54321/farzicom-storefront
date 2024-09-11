import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { YoutubeVideoContainer } from ".";
import { IYoutubeVideoContainerProps } from "./YoutubeVideoContainer";

export const mainImgSrc =
  "https://www.lotus-organics.com/public/storage/influencersReview/1592569712-1590743455-3.jpg";
export const url = "https://youtu.be/QUXAqNye6SY";

const DEFAULT_PROPS: IYoutubeVideoContainerProps = {
  url,
  mainImgSrc,
};

storiesOf("@components/molecules/YoutubeVideoContainer", module)
  .addParameters({ component: YoutubeVideoContainer })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <YoutubeVideoContainer {...DEFAULT_PROPS} />);
