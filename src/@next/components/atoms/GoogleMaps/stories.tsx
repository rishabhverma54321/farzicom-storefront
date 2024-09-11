import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { GoogleMaps } from ".";
import { IGoogleMapsProps } from "./GoogleMaps";

const DEFAULT_PROPS: IGoogleMapsProps = {};

storiesOf("@components/atoms/GoogleMaps", module)
  .addParameters({ component: GoogleMaps })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <GoogleMaps {...DEFAULT_PROPS} />);
