import { storiesOf } from "@storybook/react";
import React from "react";

import { CartIkkai } from ".";

storiesOf("@components/templates/Cart", module)
  .addParameters({ component: CartIkkai })
  .add("default", () => <CartIkkai />);
