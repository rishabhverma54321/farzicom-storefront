//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";

import { OverlayContextInterface2 } from "./context";

interface OverlayProps {
  context: OverlayContextInterface2;
  className?: string;
  /**
   * Unique name used as selector for writing e2e tests in Cypress	   * Unique name used as selector for writing e2e tests in Cypress
   */
  testingContext: string;
}

const Overlay: React.FC<OverlayProps> = ({
  children,
  className,
  context: { type, theme, hide },
  testingContext,
}) => (
  <div
    className={classNames("overlayFarzicom", {
      [`overlayFarzicom--${type}`]: !!type,
      [className]: !!className,
    })}
    data-test={testingContext}
    onClick={hide}
  >
    <div
      className={`overlayFarzicom__${theme}`}
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default Overlay;
