import React from "react";
import * as ReactDOM from "react-dom";
import { Transition } from "react-transition-group";

import * as S from "./styles";
import { IProps } from "./types";

let modalRoot;
// FIXME: Next.js SSR Handling
if (typeof document !== "undefined") {
  modalRoot = document.getElementById("modal-root");
}

export const Overlay: React.FC<IProps> = ({
  children,
  duration = 600,
  hide,
  position = "center",
  show,
  transparent = false,
  target = modalRoot,
  testingContext,
  testingContextId,
  fixedposition
}: IProps) => {
  const animationProps = {
    open: show,
    position,
  };
  return (
    target &&
    ReactDOM.createPortal(
      <Transition in={show} timeout={duration} unmountOnExit>
        {state => (
          <S.Overlay
            {...animationProps}
            state={state}
            onClick={hide}
            transparent={transparent}
            data-test={testingContext}
            data-test-id={testingContextId}
            unsetposition={fixedposition}
          >
            <S.Lightbox
              {...animationProps}
              state={state}
              unsetposition={fixedposition}
              onClick={e => e.stopPropagation()}
            >
              {children}
            </S.Lightbox>
          </S.Overlay>
        )}
      </Transition>,
      target
    )
  );
};
