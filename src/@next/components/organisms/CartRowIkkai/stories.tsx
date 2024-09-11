import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router";

import { CartRowIkkai } from ".";
import { DEFAULT_PROPS } from "./fixtures";

const STORY_PROPS = {
  onQuantityChange: action("onQuantityChange has been called"),
  onRemove: action("onRemove has been called"),
  ...DEFAULT_PROPS,
};

storiesOf("@components/organisms/CartRow", module)
  .addParameters({ component: CartRowIkkai })
  .add("default", () => (
    <IntlProvider locale="en">
      <MemoryRouter>
        <CartRowIkkai {...STORY_PROPS} />
      </MemoryRouter>
    </IntlProvider>
  ));
