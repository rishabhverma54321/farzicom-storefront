//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

import * as React from "react";

import { Overlay, OverlayContextInterface } from "../..";

export interface IModal {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const Modal: React.FC<IModal> = ({ overlay, testingContext }) => {
  return (
    <Overlay
      testingContext={testingContext}
      className={overlay?.context?.className || ""}
      context={overlay}
    >
      {overlay.context.content}
    </Overlay>
  );
};

export default Modal;
