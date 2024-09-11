//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";

import { OverlayContextInterface } from "./context";

interface OverlayProps {
  context: OverlayContextInterface;
  className?: string;
  /**
   * Unique name used as selector for writing e2e tests in Cypress	   * Unique name used as selector for writing e2e tests in Cypress
   */
  testingContext: string;
}

const Overlay: React.FC<OverlayProps> = ({
  children,
  className,
  context: { type, theme, hide, context },
  testingContext,
}) => (
  <div
    className={classNames("overlayFarzicom", {
      [`overlayFarzicom--${type}`]: !!type,
      [className]: !!className,
    })}
    data-test={testingContext}
    onClick={() => !context?.disableHide && hide()}
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
